exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('categories', {
        categoryId:             {
            type:       'bigserial',
            primaryKey: true,
            comment: "айди категории товаров"
        },
        categoryName:          {
            type:    'varchar(500)',
            comment: 'Название категории',
        },
    }, {
        ifNotExists: true,
        comment:     'Таблица, где хранится информация о категориях товаров',
    });
};

exports.down = pgm => {
};