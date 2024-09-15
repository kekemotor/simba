const {pool} = require("../../dependencies");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const {decode} = require("jsonwebtoken");

async function changeUserPassword(object){
    const funcName = 'changeUserPassword';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {
        const old_password = (md5(object['Old_password']));
        const new_password = (md5(object['New_password']));
        const Token = object["userToken"]
        let decodeToken =jwt.decode(Token)
        let Email =decodeToken['userEmail'][0]
        const checkUser = await client.query(`SELECT * FROM users WHERE "userEmail" = $1 and "userHashPassword" = $2`,
            [
                Email,
                old_password
            ]);
        if (checkUser.rows.length>0){
            await client.query('UPDATE users SET "userHashPassword" = $1 where "userEmail" = $2', [new_password, jwes['userEmail'][0]])
            data.statusCode = 200
        }
        else{
            data.message = 'такого пароля нет у нас в бд, сорян'
        }

    }catch (err){
        console.log(err);
        data.statusCode = 203


    }

    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;


}


module.exports = {
    changeUserPassword:changeUserPassword
}