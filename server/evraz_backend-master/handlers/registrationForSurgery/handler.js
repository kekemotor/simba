const bcrypt = require('bcryptjs')
const { pool } = require('../../dependencies');
const nodemailer = require('nodemailer')
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const passwordForSurgery = md5("Ghsjasd12353476")
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





async function RFS(object) {
    const funcName = 'RFS';
    const client = await pool.connect();
    const data = {
        message: 'error', statusCode: 400,
    };
    try {
        const password = object['passwordForSurgery']
        const surgeryEmail = object['surgeryEmail']
        let random_code = getRandom(10000, 99999).toString()
        if (String(md5(password)) == String(passwordForSurgery)) {
            data.statusCode = 200
            data.message = 'all good'
            await client.query(`INSERT INTO code_verification_for_surgery_table ("userCodeVerification", "surgeryEmail")
                                VALUES ($1, $2)`,
                [
                    random_code,
                    object.surgeryEmail,
                ]);
            // отправка
            const mailOptions = {
                from: 'kostaykazunin@gmail.com',
                to: surgeryEmail,
                subject: 'Clinic_simba',
                text: 'your individual code verification => ' + random_code,
            }

            await transporter.sendMail(mailOptions, async err => {
                console.log(err)
            })
        }
    } catch (err) {
        console.log(err.message, err.stack);
    }
}
async function CheckRFS(object){
    const funcName = 'RFS';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {
        console.log(object)
    const CheckSurgery = await client.query(`SELECT * FROM code_verification_for_surgery_table where "surgeryEmail" = $1`, [object.surgeryEmail])
    const surgeryCode = object["surgeryCode"]
        const surgeryCodeVer = CheckSurgery.rows[0]["userCodeVerification"]
        console.log(surgeryCodeVer, surgeryCode)
        if (Number(surgeryCode) === Number(surgeryCodeVer)){
            data.message = 'всё хорошо, пользователь ввёл правильный код'
            data.statusCode = 200
        }else{
            data.message = 'всё, плохо, кодд является неправельным'
        }
        
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
    RFS: RFS,
    CheckRFS: CheckRFS

};
//