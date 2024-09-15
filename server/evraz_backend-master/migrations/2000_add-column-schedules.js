exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumns('scheduled', {
        servicesName: {
            type: 'varchar(500)',
            comment: 'имя услуги',
        },
    }, {
        ifNotExists: true,
    });
};

exports.down = pgm => {
};
//