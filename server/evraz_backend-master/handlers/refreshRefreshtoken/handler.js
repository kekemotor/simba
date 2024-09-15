const jwt = require('jsonwebtoken')
const {pool} = require("../../dependencies");
async function refreshRefresh(object){
    const funcName = 'refreshRefresh';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400, newAccessToken: '', newRefreshToken: ''
    };
    try {
        const token = object['refreshToken']
        let refresh = jwt.decode(token)
        refresh = refresh['userEmail'][0]


        payload = {
            userEmail: refresh
        }
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        data.newAccessToken = accessToken
        data.newRefreshToken = refreshToken
        data.message = 'tokenWasRefresh'
        data.statusCode = 201

    }catch (err){
        console.log(err.message, err.stack);
        data.statusCode = 403


    }
    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;
}
module.exports = {
    refreshRefresh:refreshRefresh
}