const {pool} = require("../../dependencies");
const nodemailer = require("nodemailer");
const transporter =  nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kostaykazunin@gmail.com',
        pass: 'suzeiputsxgounwu'
    }
})
async function messegeAllUsers(object){
    const funcName = 'messegeAllUsers';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400, usersWithoutTime: [], usersHhoNeedConfirmation: [],usersHhoDontNeedConfirmation: []
    };
    try {
        const MegaMassForUWT = []
        const MegaMassForUHNC = []
        const MegaMassForUHDNC = []
        let takeUsers = await client.query(`SELECT * FROM scheduled`)
        const now = new Date()
        takeUsers = takeUsers.rows
        for (let i = 0; i < takeUsers.length; i++) {
            const MassUWT = [{
                    userEmail: '',
                    status:'',
                    time:'',
                    servicesName:''

                }]
            const MassUHNC = [{
                userEmail: '',
                status:'',
                time:'',
                servicesName:''

            }]
            const MassUHDNC = [{
                userEmail: '',
                status:'',
                time:'',
                servicesName:''

            }]


            const Time = takeUsers[i]['time']
            // функция для тех, кого надо удалять
            if (Time.getHours() - now.getHours() <= 12 ||
                Time.getHours() - now.getHours() <= -12&&
                TIme.getDate() - now.getDate() === 0 &&
                TIme.getMonth() - now.getMonth() === 0 &&
                TIme.getFullYear() - now.getFullYear() === 0&&
                takeUsers[i]['status'] === 'False'
                
            ){
                await client.query(`DELETE * FROM scheduled where "userEmail" = $1 and "servicesName" = $2`,[
                    takeUsers[i]['userEmail'],
                    takeUsers[i]['servicesName']
                ])




                const mailOptions = {
                    from: 'kostaykazunin@gmail.com',
                    to: takeUsers[i]['status'],
                    subject: 'Clinic_simba',
                    text: 'дата записи => ' + takeUsers[i]['time'] + ' ,ваша запись была удалена всвязи с отсутствием подтверждения на неё',
                }
                await transporter.sendMail(mailOptions,  async err => {
                    console.log(err)})


                MassUWT['userEmail'] = takeUsers[i]['userEmail']
                MassUWT['status'] = takeUsers[i]['status']
                MassUWT['time'] = takeUsers[i]['time']
                MassUWT['servicesName'] = takeUsers[i]['servicesName']
                MegaMassForUWT.push(MassUWT)




            }
            //функция для тех, кто ещё не устарел
            if (Time.getHours() - now.getHours() >= 12||
                Time.getHours() - now.getHours() >= -12||
                TIme.getDate() - now.getDate() >= 0 ||
                TIme.getMonth() - now.getMonth() >= 0 ||
                TIme.getFullYear() - now.getFullYear() >= 0||
                takeUsers[i]['status'] === 'True'

            ){

                if( takeUsers[i]['status'] === 'false' ){
                    MassUHNC['userEmail'] = takeUsers[i]['userEmail']
                    MassUHNC['status'] = takeUsers[i]['status']
                    MassUHNC['time'] = takeUsers[i]['time']
                    MassUHNC['servicesName'] = takeUsers[i]['servicesName']

                    const mailOptions = {
                        from: 'kostaykazunin@gmail.com',
                        to: takeUsers[i]['status'],
                        subject: 'Clinic_simba',
                        text: 'дата записи => ' + takeUsers[i]['time'] + 'также за 12 часов до вашего везита вам не обходимо сделать подтверждение, в противном случае ваша запись будет удаленна',
                    }
                    await transporter.sendMail(mailOptions,  async err => {
                        console.log(err)})
                    MegaMassForUHNC.push(MassUHNC)
                }



                if( takeUsers[i]['status'] === 'True' ){
                                MassUHDNC['userEmail'] = takeUsers[i]['userEmail']
                                MassUHDNC['status'] = takeUsers[i]['status']
                                MassUHDNC['time'] = takeUsers[i]['time']
                                MassUHDNC['servicesName'] = takeUsers[i]['servicesName']
                    MegaMassForUHDNC.push(MassUHDNC)
                    const mailOptions = {
                        from: 'kostaykazunin@gmail.com',
                        to: takeUsers[i]['status'],
                        subject: 'Clinic_simba',
                        text: 'дата записи => ' + takeUsers[i]['time'] + ',мы ожидаем вашего прихода',
                    }
                    await transporter.sendMail(mailOptions,  async err => {
                        console.log(err)})
                }


            }





        }
        data.usersHhoDontNeedConfirmation = MegaMassForUHDNC
        data.usersHhoNeedConfirmation =     MegaMassForUHNC
        data.usersWithoutTime =             MegaMassForUWT
        


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
    messegeAllUsers:messegeAllUsers
}