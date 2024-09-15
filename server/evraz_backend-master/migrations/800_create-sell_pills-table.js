/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('sell_pills', {
        itemId:             {
            type:       'bigserial',
            primaryKey: true,
        },
        userEmail:          {
            type:    'varchar(250)',
            comment: 'Почта пользовател',
        },

        randomNumber:            {
            type: 'BIGINT',
            comment: 'Код покупки'
        },

        pillsName:            {
            type: 'varchar(250)',
            comment: 'айди таблеток'
        },
        pillsCategory:            {
            type: 'varchar(250)',
            comment: 'айди таблеток'
        },
        createDate:         {
            type:    'timestamp with time zone',
            default: pgm.func('now()'),
        },
    }, {
        ifNotExists: true,
        comment:     'Таблица, где хранится информация о купленных товарах',
    });
};

exports.down = pgm => {
};
