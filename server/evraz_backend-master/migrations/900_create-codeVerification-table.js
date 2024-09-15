exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('code_verification', {
        codeId:             {
            type:       'bigserial',
            primaryKey: true,
        },
        userCodeVerification:          {
            type:    'BIGINT',
            comment: 'код варификации',
        },

        phoneNumber:            {
            type: 'BIGINT',
            comment: 'номер телефона'
        },

    }, {
        ifNotExists: true,
        comment:     'Таблица, где хранится информация о кодах варификации',
    });
};

exports.down = pgm => {
};