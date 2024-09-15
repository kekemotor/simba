exports.shorthands = undefined;
exports.up = pgm => {
    pgm.addColumns('users', {
        userToken: {
            type:    'varchar(250)',
            comment: 'Token пользователя)',
        },
    }, {
        ifNotExists: true,
    });
};

exports.down = pgm => {
};