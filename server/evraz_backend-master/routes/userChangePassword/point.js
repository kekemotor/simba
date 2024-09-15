const {changeUserPassword} = require("../../handlers/userChangePassword/handler");
const jwt = require("jsonwebtoken");

module.exports = function (fastify, opts, next) {

    fastify.addHook('preHandler', async (request, reply) => {
        try {
            const data = jwt.verify(request.headers.refresh, process.env.JWT_REFRESH_SECRET)
            request.info = data.userEmail
        }
        catch (e) {
            reply.code(403);
            reply.send({ 'message': 'Access denied', 'statusCode': 403 });
            return;
        }
    });


    fastify.route({
        url: '/update',
        method: 'POST',
        async handler(request, reply) {
            const data = await changeUserPassword(request.body);
            reply.status(data.statusCode)
            reply.send(data)
        },
    });

    next();
}