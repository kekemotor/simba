exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumns('sell_pills', {
        prise: {
            type: 'bigint',
            comment: 'цена',
        },
        createDate:         {
            type:    'timestamp with time zone',
            default: pgm.func('now()'),
        },
    }, {
        ifNotExists: true,
    });
};

exports.down = pgm => {
};
//