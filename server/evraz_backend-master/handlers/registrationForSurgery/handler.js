const bcrypt = require('bcryptjs')
const { pool } = require('../../dependencies');
const nodemailer = require('nodemailer')
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const passwordForSurgery = md5("Ghsjasd12353476")
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min))+min
}



async function RFS(object) {
    const funcName = 'RFS';
    const client = await pool.connect();
    const data = {
        message: 'error', statusCode: 400,
    };
    try {
        const password = object['passwordForSurgery']
        const surgeryEmail = object['surgeryEmail']
        console.log(String(md5(password)),String(passwordForSurgery))
        if (String(md5(password)) == String(passwordForSurgery) && String(surgeryEmail) === 'Admin')     {
            console.log("ASD")
            data.statusCode = 200
            data.message = 'all good'
        }   
    } catch (err) {
        console.log(err.message, err.stack);
    }finally{
        return data
    }
}

module.exports = {
    RFS:RFS
}