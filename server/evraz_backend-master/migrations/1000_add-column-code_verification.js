/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumns('code_verification', {
        userEmail: {
            type:    'varchar(250)',
            comment: 'Email пользователя)',
        },
    }, {
        ifNotExists: true,
    });
};

exports.down = pgm => {
};