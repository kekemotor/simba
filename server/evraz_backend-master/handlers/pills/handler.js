const bcrypt = require('bcryptjs')
const { pool } = require('../../dependencies');
const nodemailer = require('nodemailer')
const md5 = require('md5');
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



async function buyPills(object){
    const funcName = 'buyPills';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {
        let random_code = getRandom(10000,99999).toString()
        const Token = object["userToken"]
        let decodeToken =jwt.decode(Token)
        let Email =decodeToken['userEmail'][0]
        const check_user = await client.query(`SELECT *
        FROM users where "userEmail" = $1`,[Email])

        if (check_user.rows.length == 0){
            data.message = 'Такого пользователя нет'
        }
        console.log(check_user.rows)
        console.log(check_user.rows.length)
        console.log(object.pillsName)

        // await client.query(`INSERT INTO sell_pills ("userEmail", "randomNumber", "pillsName", "pillsCategory")
        // VALUES ($1, $2, $3,$4)`
        //
        //
        //     [
        //         object.userEmail,
        //         random_code,
        //         object.pillsName,
        //         object.pillsCategory
        //     ]);
        await client.query(`INSERT INTO sell_pills ("userEmail", "randomNumber", "pillsName", "pillsCategory", "prise")
                                                  VALUES ($1, $2, $3, $4,$5)`,
            [
                object.userEmail,
                random_code,
                object.pillsName,
                object.pillsCategory,
                object.price

            ]);
        data.message = random_code
        data.statusCode = 200

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



async function DeleteSendUsers(object){
    const funcName = 'DeleteSendUsers';
    const client = await pool.connect();
    const now = new Date()
    const data = {
        message:    'error',    statusCode: 400,
    };
    //delete
    try {
        const users = await client.query(`SELECT * FROM sell_pills`)

        for (let i = 0; i < users.rows.length; i++) {
        let Time = users.rows[i]['createDate']

        if (
            now.getDate() - Time.getDate()  >= 3


        ){
            await client.query(`DELETE FROM sell_pills where "userEmail" = $1 and "pillsName" = $2`,[
                users[i]['userEmail'],
                users[i]['servicesName']
            ])




            const mailOptions = {
                from: 'kostaykazunin@gmail.com',
                to: users.rows[i]['userEmail'],
                subject: 'Clinic_simba',
                text: 'Время ожидания товара истекло. Вы можете заказать повторно',
            }
            await transporter.sendMail(mailOptions,  async err => {
                console.log(err)})






        }

        //send time if needn`t delete
        if (
            now.getDate() - Time.getDate()  <= 2

        ){


            console.log(users,i)
            const mailOptions = {
                from: 'kostaykazunin@gmail.com',
                to: users.rows[i]['userEmail'],
                subject: 'Clinic_simba',
                text: 'Заберите товар. Прошло '+now.getDate() - Time.getDate() +' дня с момента бронирования. В случае истечения времени с вашего заказа будет снята бронь. Всего доброго ',
            }
            await transporter.sendMail(mailOptions,  async err => {
                console.log(err)})






        }}






    }catch (err){
        console.log(err.message, err.stack);
    }

    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;


}


module.exports = {

    buyPills: buyPills,
    sellPills: sellPills,
    DeleteSendUsers:DeleteSendUsers

};
