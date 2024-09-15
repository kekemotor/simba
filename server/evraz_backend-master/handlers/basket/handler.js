const { pool } = require('../../dependencies');
const nodemailer = require('nodemailer')
const jwt = require("jsonwebtoken");

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min))+min
}
const transporter =  nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kostaykazunin@gmail.com',
        pass: 'suzeiputsxgounwu'
    }
})

async function addInBasket(object){
    const funcName = 'addInBasket';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {
        const token = object['userToken']
        let userToken = jwt.decode(token)
        const getUser = await client.query(`SELECT * FROM users WHERE 'userEmail' = $1`, [userToken['userEmail'][0]])
        if (getUser.rows.length ===0){
            data.message = 'не нашёл пользователя с таким токеном'
        }

        await client.query(`INSERT INTO basket_for_users ("userEmail", "quantity","idItems" ,"place")
                                  VALUES ($1, $2, $3, $4,)`,
            [

                getUser.rows[0]['userEmail'],
                object.quantity,
                object.idItems,
                object.place
            ]);
        const checkAddInfo = await client.query(`SELECT * FROM basket_for_users WHERE "userToken" = $1`, [userToken['userEmail'][0]])
        if (checkAddInfo.rows.length === 0 ){
            data.message = 'данные не были добавлены в табличку, попробуйте позже'
        }
        data.statusCode = 200
        data.message = 'иформация успешно добавлена в табличку'
    }catch (err){
        console.log(err.message, err.stack);

        data.statusCode = 203

    }

    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;
}
// async function backInfoInBasket(object){
//     const funcName = 'backInfoInBasket';
//     const client = await pool.connect();
//     const data = {
//         message:    'error',    statusCode: 400, allInfo: ''
//     };
//     try {
//         const backUsers = await client.query(`SELECT * FROM basket_for_users where "userToken" = $1 `, [object.userToken])
//
//
//         if (backUsers ===0){
//             data.message = 'не нашёл такой токен'
//
//         }
//         data.allInfo = backUsers.rows
//         data.message = 'all good'
//         data.statusCode = 200
//     }catch (err){
//         console.log(err.message, err.stack);
//     }
//
//     finally {
//         client.release();
//         console.log(`${ funcName }: client release()`);
//     }
//     return data;
//
//
//  }
async function deleteTable(object){
    const funcName = 'deleteTable';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {
        const Token = object["userToken"]
        let decodeToken =jwt.decode(Token)
        let Email =decodeToken['userEmail'][0]
        await client.query(`DELETE FROM basket_for_users where "userEmail" = $1`,[Email])
        const checkDelete = await client.query(`SELECT * FROM basket_for_users where "userEmail" = $1`,[Email])


        if (checkDelete >0){
            data.message = 'не удалилось(((('
        }
        data.statusCode =200
        data.message = 'всё отлично'
    }catch (err){
        console.log(err.message, err.stack);
        data.statusCode = 203

    }

    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;


}
async function deleteObjectIntTable(object){
    const funcName = 'deleteObjectIntTable';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {
        const Token = object["userToken"]
        let decodeToken =jwt.decode(Token)
        let Email =decodeToken['userEmail'][0]
        await client.query(`DELETE FROM basket_for_users where "userEmail" = $1 and "idItems" = $2`,[Email, object['idItems']])
        const checkDelete = await client.query(`SELECT * FROM basket_for_users where "userEmail" = $1 and "idItems" = $2`,[Email, object['idItems']])


        if (checkDelete >0){
            data.message = 'не удалилось(((('
        }
        data.statusCode =200
        data.message = 'всё отлично'
    }catch (err){
        console.log(err.message, err.stack);
        data.statusCode = 203

    }

    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;


}


module.exports = {
    addInBasket:addInBasket,
    deleteTable:deleteTable,
    deleteObjectIntTable:deleteObjectIntTable

};