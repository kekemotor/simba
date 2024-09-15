const { RFS,CheckRFS} = require('../../handlers/registrationForSurgery/handler');

module.exports = function (fastify, opts, next) {

    fastify.route({
        url:    '/RFS',
        method: 'POST',
        async handler(request, reply) {
            const data = await RFS(request.body);
            reply.status(data.statusCode)
            reply.send(data)
        },
    });
    next();


    fastify.route({
        url:    '/CheckRFS',
        method: 'POST',
        async handler(request, reply) {
            const data = await CheckRFS(request.body);
            reply.status(data.statusCode)
            reply.send(data)
        },
    });
    next();
};

