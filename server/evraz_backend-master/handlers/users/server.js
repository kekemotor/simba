require('dotenv').config()
const nodemailer = require('nodemailer')
const md5 = require('md5');
const transporter =  nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kostaykazunin@gmail.com',
        pass: 'suzeiputsxgounwu'
    }
})