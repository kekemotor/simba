exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('services', {
        servicesId:             {
            type:       'bigserial',
            primaryKey: true,
        },
        servicesName:          {
            type:    'varchar(500)',
            unique:  true,
            comment: 'название возможных процедур',
        },
    }, {
        ifNotExists: true,
        comment:     'Таблица, где хранится информация о возможных процедурах',
    });
};

exports.down = pgm => {
};