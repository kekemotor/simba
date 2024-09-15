const { RFS} = require('../../handlers/registrationForSurgery/handler');

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
};

