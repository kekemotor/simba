const {pool} = require("../../dependencies");

async function addInfo(object){
    const funcName = 'addInfo';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {
        await client.query(`INSERT INTO info_board  ("firstName", "information", "img")
                                VALUES ($1, $2,$3)`,
            [
                object.firstName,
                object.information,
                object.img
            ]);
        await client.query(`INSERT INTO "imageBlob"  ("img")
                                VALUES ($1)`,
            [

                object.img
            ]);
        const  blob =  await client.query(`SELECT * FROM "imageBlob"`)
        data.message = blob.rows
        data.statusCode =200
        data.message = 'all good'

    }catch (err){
        console.log(err.message, err.stack);
    }

    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;


}











async function deleteInfo(object){
    const funcName = 'deleteInfo';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {

        await client.query(`DELETE FROM info_board where "firstName" = $1`,[object.firstName])
        data.statusCode =200
        data.message = 'all good'

    }catch (err){
        console.log(err.message, err.stack);
    }

    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;


}










async function updateInfo(object){
    const funcName = 'updateInfo';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {
        const countChanger = object["countChanger"]
        const changeName = object["changeName"]
        //изменение загаловка
            await client.query('UPDATE info_board SET "firstName" = $1 where "firstName" = $2', [object.firstName, changeName ])
            await client.query('UPDATE info_board SET "information" = $1 where "firstName" = $2', [object.information, changeName])
            await client.query('UPDATE info_board SET "img" = $1 where "firstName" = $2', [object.img, changeName])
            data.statusCode =200
            data.message = 'all good'



    }catch (err){
        console.log(err.message, err.stack);
    }

    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;


}
async function selectBoardInfo(object){
    const funcName = 'selectBoardInfo';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400, board: ''
    };
    try {
        const selectBoardInfo = await client.query(`SELECT * FROM info_board`);
        data.statusCode =200
        data.message = 'all good'
        data.board = selectBoardInfo.rows;
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
    addInfo:addInfo,
    deleteInfo:deleteInfo,
    updateInfo:updateInfo,
    selectBoardInfo:selectBoardInfo
}