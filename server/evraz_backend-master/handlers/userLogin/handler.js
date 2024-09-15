const {pool} = require("../../dependencies");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
async function userLogin(object){
    const funcName = 'userLogin';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400, refreshToken: 'null', accessToken: 'null'
    };
    try {

        const hash_password = (md5(object['User_password']));
        console.log(hash_password)
        const user_check =  await client.query(`SELECT *
        FROM users
        where "userEmail" = $1 and "userHashPassword" = $2`, [object['userEmail'],hash_password]
        );
        console.log(user_check)
        if (user_check.rows.length >0){
            data.statusCode = 200
            data.message = 'all good'
            const payload = {
                userEmail: [object.userEmail]
        }
            const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
            const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
            await client.query('UPDATE users SET "userToken" = $1 where "userEmail" = $2', [refreshToken, object.userEmail])
            data.refreshToken = refreshToken
            data.accessToken = accessToken
        }
        else {
            data.message = 'неверный пароль или почта'
        }
    }catch (err){
        console.log(err);
    }

    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;


}
module.exports = {
    userLogin: userLogin

}
//