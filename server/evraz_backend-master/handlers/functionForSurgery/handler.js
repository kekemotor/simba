const {pool} = require("../../dependencies");

async function sellPills(object){
    const funcName = 'sellPills';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {
        const code = object['sellCode']
        const checkCode = await  client.query(`SELECT * FROM sell_pills where "randomNumber" = $1`, [code])
        if (checkCode.rows.length == 0){
            data.message = 'вашего кода нет в нашей базе данных'
        }

        const email = checkCode.rows[0]['userEmail']

        data.message= `всё отлично, email пользователя:${email}`
        data.statusCode = 200


    }catch (err){
        console.log(err.message, err.stack);
    }

    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;


}




async function giveBackInfoAboutOrder(object){
    const funcName = 'giveBackInfoAboutOrder';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400, backInfo: []
    };
    try {
        const info = await client.query(`SELECT * FROM sell_pills`)
        data.backInfo = info.rows
        data.statusCode = 200
    }catch (err){
        console.log(err.message, err.stack);
    }

    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;


}
//asd




module.exports = {
    sellPills:sellPills,
    giveBackInfoAboutOrder:giveBackInfoAboutOrder
}