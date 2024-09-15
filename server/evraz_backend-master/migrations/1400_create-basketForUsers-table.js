exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('basket_for_users', {
        codeId:             {
            type:       'bigserial',
            primaryKey: true,
        },
        name:{
            type: 'varchar(255)',
            comment: 'название товара'

        } ,
        quantity:{
            type: 'BIGINT',
            comment: 'количество купленных товаров'
        },
        category:{
            type:'varchar(255)',
            comment: 'категория'
        },
        place:{
            type: 'varchar(255)',
            comment: 'место выдачи заказа'
        },
        userEmail:{
            type: 'varchar(255)',
            comment: 'место выдачи заказа'
        }



    }, {
        ifNotExists: true,
        comment:     'Таблица с информацией о заказе(корзина)',
    });
};

exports.down = pgm => {
};