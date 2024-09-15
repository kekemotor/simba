exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumns('basket_for_users', {
        idItems: {
            type:    'BIGINT',
            comment: 'айди товара',
        },
    }, {
        ifNotExists: true,
    });
};

exports.down = pgm => {
};