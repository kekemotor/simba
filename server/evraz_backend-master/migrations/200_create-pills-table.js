exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('items_sell', {
        pills_id:             {
            type:       'bigserial',
            primaryKey: true,
            comment: 'Айди таблеток'
        },
        categories_id:{
            type: 'bigint',
            comment: "Айди категории товаров"
        },
        pills_name:          {
            type:    'varchar(250)',
            unique:  true,
            comment: 'название лекарств',
        },
        product_quantity:          {
            type:    'bigint',
            comment: 'количество имеющихся товаров',
        },
        description:          {
            type:    'varchar(250)',
            comment: 'Описание товара',
        },
        item_price:          {
            type:    'numeric(30,2)',
            comment: 'Цена за лекарство',
        },

    }, {
        ifNotExists: true,
        comment:     'Таблица, где хранится информация о лекарствах',
    });
};

exports.down = pgm => {
};