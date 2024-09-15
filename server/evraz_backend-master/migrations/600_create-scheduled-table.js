exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('pets', {
        petId:             {
            type:       'bigint',
            primaryKey: true,
            comment: "айди питомца"
        },

        pet_name:          {
            type:    'varchar(250)',
            unique:  true,
            comment: 'порода питомца',
        },

        visitDate:             {
            type:    'timestamp with time zone',
            default: pgm.func('now()'),
            comment: "дата визита для обследования"
        },
    }, {
        ifNotExists: true,
        comment:     'Таблица, где хранится информация о визите питомца',
    });
};

exports.down = pgm => {
};




