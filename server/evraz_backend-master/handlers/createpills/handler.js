const { pool } = require('../../dependencies');
const nodemailer = require('nodemailer')


async function addInDB(object){
    const funcName = 'addInDB';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {
        await client.query(`INSERT INTO item_pills_bd ("description", "img", "name", "quantity", "category","price")
                                  VALUES ($1, $2,$3,$4,$5,$6)`,
            [
                object.description,
                object.img,
                object.name,
                object.quantity,
                object.category,
                object.price
            ]);

        data.statusCode =200
    }catch (err){
        console.log(err.message, err.stack);
    }
    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;
}

async function deletpills(object){
    const funcName = 'deletpills';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {
        await client.query(`DELETE FROM item_pills_bd where "name" = $1 and "category" = $2`,[object.name, object.category])
    }catch (err){
        console.log(err.message, err.stack);
    }
    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;
}


async function updatePills(object){
    const funcName = 'updatePills';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {

            await client.query('UPDATE item_pills_bd SET "description" = $1 where "codeId" = $2', [object.description ,object.codeId  ])
            await client.query('UPDATE item_pills_bd SET "img" = $1 where "codeId" = $2', [object.img ,object.codeId  ])
            await client.query('UPDATE item_pills_bd SET "name" = $1 where "codeId" = $2', [object.name ,object.codeId  ])
            await client.query('UPDATE item_pills_bd SET "quantity" = $1 where "codeId" = $2', [object.quantity ,object.codeId  ])
            await client.query('UPDATE item_pills_bd SET "category" = $1 where "codeId" = $2', [object.category ,object.codeId  ])
            await client.query('UPDATE item_pills_bd SET "price" = $1 where "codeId" = $2', [object.price ,object.codeId  ])






    }catch (err){
        console.log(err.message, err.stack);
    }
    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;
}





async function changeCount(object){
    const funcName = 'changeCount';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400, quantity: 0, name: 'infinite'
    };
    try {
        const addInfo = object['addCount']
        const getInfo = await client.query(`SELECT "quantity" FROM item_pills_bd where  "name" = $1`, [object.name])
        const get = Number(getInfo.rows[0]["quantity"])
        const newCount = get - addInfo
        await client.query('UPDATE item_pills_bd SET "quantity" = $1 where "name" = $2', [newCount, object.name])
        data.message = 'all_good'
        data.name = object.name
        data.quantity = newCount
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

async function backCount(object){
    const funcName = 'backCount';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400, quantity: 0, name: 'infinite'
    };
    try {
        const backInfo = object['backCount']
        const getInfo = await client.query(`SELECT "quantity" FROM item_pills_bd where  "name" = $1`, [object.name])
        const get = Number(getInfo.rows[0]["quantity"])
        const newCount = get + backInfo
        await  client.query('UPDATE item_pills_bd SET "quantity" = $1 where "name" = $2', [newCount, object.name])
        data.message = 'all_good'
        data.name = object.name
        data.quantity = newCount
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


async function backInfoAway(object){
    const funcName = 'backInfoAway';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400, items_category: []
    };
    try {
        const allInfo = await client.query(`SELECT * FROM item_pills_bd where "category" = $1`, [object.category])

        if (allInfo.rows.length == 0){
            data.message = "нет объектов в этой категории"
        }
        data.items_category = allInfo.rows
        data.statusCode = 200
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




module.exports = {
    addInDB: addInDB,
    updatePills:updatePills,
    deletpills: deletpills,
    changeCount: changeCount,
    backInfoAway: backInfoAway,
    backCount: backCount

};
