const { buyPills, sellPills} = require('../../handlers/basket/handler');
const jwt = require("jsonwebtoken");
module.exports = function (fastify, opts, next) {

    fastify.addHook('preHandler', async (request, reply) => {
        try {
            const data = jwt.verify(request.headers.refresh, process.env.JWT_ACCESS_SECRET)
            request.info = data.userEmail
        }
        catch (e) {
            reply.code(403);
            reply.send({ 'message': 'Access denied', 'statusCode': 403 });
            return;
        }
    });




    fastify.route({
        url:    '/buyPills',
        method: 'POST',
        async handler(request, reply) {
            const data = await buyPills(request.body);
            reply.status(data.statusCode)
            reply.send(data)
        },
    });


    fastify.route({
        url:    '/sellPills',
        method: 'POST',

        async handler(request, reply) {
            const data = await sellPills(request.body);
            reply.status(data.statusCode)
            reply.send(data)

        },
    })

    next();
};