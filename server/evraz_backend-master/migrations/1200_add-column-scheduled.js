/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumns('scheduled', {
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