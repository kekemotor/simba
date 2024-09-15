// const {pool} = require("../../../../clinick_simbaa/evraz_backend-master/dependencies");
//
//
//
//
// async function backAllInfoAway(object){
//     const funcName = 'backAllInfoAway';
//     const client = await pool.connect();
//     const data = {
//         message:    'error',    statusCode: 400,
//     };
//     try {
//         const AllInfo = await client.query(`SELECT * FROM sell_pills`)
//         if (AllInfo.rows.length==0){
//             data.message= 'not found'
//         }
//         data.statusCode = 200
//         data.message = AllInfo
//
//
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
// }
// module.exports = {
//     backAllInfoAway:backAllInfoAway
// }