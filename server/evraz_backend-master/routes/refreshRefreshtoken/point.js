const {refreshRefresh} = require('../../handlers/refreshRefreshtoken/handler');
const jwt = require("jsonwebtoken");
module.exports = function (fastify, opts, next) {

    fastify.route({
        url:    '/refreshToken',
        method: 'POST',
        async handler(request, reply) {
            const data = await refreshRefresh(request.body);
            reply.status(data.statusCode)
            reply.send(data)
        },
    });
    next();
};
