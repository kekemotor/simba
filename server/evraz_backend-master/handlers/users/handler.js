const bcrypt = require('bcryptjs')
const { pool } = require('../../dependencies');
const nodemailer = require('nodemailer')
const md5 = require('md5');
//jwt.verify(as,JWT_ACCESS_SECRET)
const jwt = require('jsonwebtoken')

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

//РЕГИСТРАЦИЯ

async function createUser(object){
    const funcName = 'createUser';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {

        const checkUser = await client.query(`SELECT *
            FROM users
            WHERE "userEmail" = $1 `, [object.userEmail]);
        if (checkUser.rows.length>0){
            data.message = 'Пользователь с таким email уже зарегистрирован'
            return data
        }

            let random_code = getRandom(10000, 99999).toString()
            await client.query(`INSERT INTO code_verification ("userEmail", "userCodeVerification")
                                VALUES ($1, $2)`,
                [
                    object.userEmail,
                    random_code

                ]);

            data.statusCode = 200
            data.message = 'всё отлично'

            // отправка
        const mailOptions = {
            from: 'kostaykazunin@gmail.com',
            to: object.userEmail,
            subject: 'Clinic_simba',
            text: 'your individual code verification => ' + random_code,
        }

        await transporter.sendMail(mailOptions,  async err => {
            console.log(err)})


    }catch (err){
        console.log(err.message, err.stack);
    }

    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;


}



async function createUser_2(object){
    const funcName = 'createUser_2';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400, accessToken: 'none',userEmail: 'none', refreshToken: 'none'
    };
    try {

        const codeVerification = object['userCodeVerification']
        const codeVer = await client.query(`SELECT * FROM code_verification where "userCodeVerification" = $1`, [codeVerification])

        if(Number(codeVerification) !== Number(codeVer.rows[0]['userCodeVerification'])){
            data.message = 'неправильный код варификации'
            console.log('all badasddddddddddddddddddddddddddddddddddddddddddd')
            await client.query(`DELETE FROM code_verification where "userEmail" = $1`,[object.userEmail])
        }
        else {
            await client.query(`DELETE FROM code_verification where "userEmail" = $1`,[object.userEmail])
            console.log('huy')
            const hash_password = (md5(object['userPassword']));
            const userEmail = codeVer.rows[0]["userEmail"]

            const payload = {
                userEmail: userEmail
            }
            const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
            const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
            console.log(jwt.decode(accessToken))
            await client.query(`INSERT INTO users ("userEmail", "userHashPassword","userToken")
                                VALUES ($1, $2, $3)`,
                [
                    userEmail,
                    hash_password,
                    refreshToken
                ]);
            data.userEmail = userEmail
            data.statusCode = 200
            data.message = 'пользователь был добавлен в бд'
            data.accessToken = accessToken
            data.refreshToken = refreshToken
        }


        // checkId.rows[0]["userId"]



    }catch (err){
        console.log(err.message, err.stack);
    }

    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;


}

// НЕНУЖНАЯ ФУНКЦИЯ, НО ПУСКАЙ ПОБУДЕТ

async function ReceivingUsers(){
    const funcName = 'ReceivingUsers';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {
        const showUsers = await pool.query('SELECT * FROM users')
        data.message = showUsers.rows
    }catch (err){
        console.log(err.message, err.stack);
    }

    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;


}

// ФУНКЦИЯ ДЛЯ ОТСЛЕЖЕВАНИЯ КОДА ПОЛЬЗОВАТЕЛЯ(ДЛЯ СОРТИРОВКИ ЗАКАЗОВ)



module.exports = {
    createUser: createUser,
    ReceivingUsers: ReceivingUsers,
    createUser_2: createUser_2,

};

// for buyPills
//     "userEmail": "saskibingo2288@gmail.com",
//     "pillsCategory": "pil",
//     "pillsName": "sigma"



//for create
//      "userEmail": "go2288@gmail.com",
//     "individual_code": 444222,
//     "userPhone": 89095679898,
//     "User_password": 1234567890


