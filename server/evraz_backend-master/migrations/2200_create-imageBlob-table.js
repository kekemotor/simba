exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('imageBlob', {
        codeId:             {
            type:       'bigserial',
            primaryKey: true,
        },
        img:            {
            type: 'BYTEA',
            comment: 'картинка'
        },


    }, {
        ifNotExists: true,
        comment:     'Таблица- информационный лист',
    });
};

exports.down = pgm => {
};