exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('item_pills_bd', {
        codeId:             {
            type:       'bigserial',
            primaryKey: true,
        },
        description:        {

            type: 'varchar(500)',
            comment: 'описание'
        },
        img:{
            type: 'varchar(255)',
            comment: 'картинка'
        },
        name:{
            type: 'varchar(255)',
            comment: 'название'

        } ,
        quantity:{
            type: 'BIGINT',
            comment: 'количество товаров'
        },
        category:{
            type:'varchar(255)',
            comment: 'категория'
        }



    }, {
        ifNotExists: true,
        comment:     'Таблица, где находится вся инфа для вёрстки страницы с таблетками',
    });
};

exports.down = pgm => {
};