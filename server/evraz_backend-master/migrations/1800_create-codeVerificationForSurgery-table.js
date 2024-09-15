exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('code_verification_for_surgery_table', {
        codeId:             {
            type:       'bigserial',
            primaryKey: true,
        },
        userCodeVerification:          {
            type:    'BIGINT',
            comment: 'код варификации',
        },

        surgeryEmail:            {
            type: 'varchar(250)',
            comment: 'имеил админа'
        },

    }, {
        ifNotExists: true,
        comment:     'Таблица, где хранится информация о входе администраторов симбы',
    });
};

exports.down = pgm => {
};