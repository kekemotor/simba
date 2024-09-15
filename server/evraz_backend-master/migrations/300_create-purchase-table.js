exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('purchase', {
        pills_id:             {
            type:       'bigint',
            comment: "Айди таблеток"
        },
        users_id:             {
            type:       'bigint',

        },
    }, {
        ifNotExists: true,
        comment:     'Таблица, где учитывается покупка пользователя с его айди',
    });
};

exports.down = pgm => {
};
