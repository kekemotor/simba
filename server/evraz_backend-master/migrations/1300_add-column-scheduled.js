/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumns('scheduled', {
        time: {
            type:    'timestamp with time zone',
            comment: 'запись пользователя',
        },
    }, {
        ifNotExists: true,
    });
};

exports.down = pgm => {
};