exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumns('scheduled', {
        status: {
            type: 'varchar(250)',
            comment: 'статус человека о подтверждение',
        },
    }, {
        ifNotExists: true,
    });
};

exports.down = pgm => {
};