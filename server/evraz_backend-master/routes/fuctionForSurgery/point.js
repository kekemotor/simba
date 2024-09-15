const {sellPills,giveBackInfoAboutOrder} = require('../../handlers/functionForSurgery/handler');

module.exports = function (fastify, opts, next) {

    fastify.route({
        url:    '/sellPills',
        method: 'POST',
        async handler(request, reply) {
            const data = await sellPills(request.body);
            reply.status(data.statusCode)
            reply.send(data)
        },
    });


    fastify.route({
        url:    '/giveBackInfoAboutOrder',
        method: 'POST',
        async handler(request, reply) {
            const data = await giveBackInfoAboutOrder(request.body);
            reply.status(data.statusCode)
            reply.send(data)
        },
    });
    next();
};
//asd