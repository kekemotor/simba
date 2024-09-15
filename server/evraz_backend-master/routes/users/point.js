const { createUser,createUser_2} = require('../../handlers/users/handler');
const { ReceivingUsers } = require('../../handlers/users/handler');
const jwt = require('jsonwebtoken');
module.exports = function (fastify, opts, next) {
    // fastify.addHook('preHandler', async (request, reply) => {
    //     try {
    //         const data = jwt.verify(request.headers.access, process.env.JWT_ACCESS_SECRET)
    //         request.info = data.userEmail
    //     }
    //     catch (e) {
    //         reply.code(403);
    //         reply.send({ 'message': 'Access denied', 'statusCode': 403 });
    //         return;
    //     }
    // });

    fastify.route({
        url:    '/create',
        method: 'POST',
        async handler(request, reply) {
            const data = await createUser(request.body);
            reply.status(data.statusCode)
            reply.send(data)
        },
    });




    fastify.route({
        url:    '/catch',
        method: 'POST',

        async handler(request, reply) {
            const data = await ReceivingUsers(request.body);
            reply.status(data.statusCode)
            reply.send(data)

        },
    });

    fastify.route({
        url:    '/addUser',
        method: 'POST',

        async handler(request, reply) {
            const data = await createUser_2(request.body);
            reply.status(data.statusCode)
            reply.send(data)

        },
    });
    
    next();
};


