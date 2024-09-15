exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('scheduled', {
        usersId:             {
            type:       'bigint',
            comment: "айди пользователя"
        },
        servicesId:             {
            type:       'bigint',
            comment: "услуга"
        },
        servicesDate:             {
            type:    'timestamp with time zone',
            default: pgm.func('now()'),
            comment: "дата записи"
        },
    }, {
        ifNotExists: true,
        comment:     'Таблица, где хранится информация о учёте записей',
    });
};

exports.down = pgm => {
};