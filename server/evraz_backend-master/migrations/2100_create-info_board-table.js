exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('info_board', {
        codeId:             {
            type:       'bigserial',
            primaryKey: true,
        },
        firstName:          {
            type:    'varchar(250)',
            comment: 'название поста',
        },

        information:            {
            type: 'varchar(1000)',
            comment: 'информация в блоке'
        },

        img:            {
            type: 'varchar(255)',
            comment: 'картинка'
        },
        servicesDate:             {
            type:    'timestamp with time zone',
            default: pgm.func('now()'),
            comment: "дата записи"
        },

    }, {
        ifNotExists: true,
        comment:     'Таблица- информационный лист',
    });
};

exports.down = pgm => {
};