const {addInfo,deleteInfo,updateInfo,selectBoardInfo} = require('../../handlers/infoBoard/handler');
const jwt = require("jsonwebtoken");
module.exports = function (fastify, opts, next) {

    fastify.route({
        url:    '/addInfo',
        method: 'POST',
        async handler(request, reply) {
            const data = await addInfo(request.body);
            reply.status(data.statusCode)
            reply.send(data)
        },
    });


    fastify.route({
        url:    '/deleteInfo',
        method: 'POST',
        async handler(request, reply) {
            const data = await deleteInfo(request.body);
            reply.status(data.statusCode)
            reply.send(data)
        },
    });


    fastify.route({
        url:    '/updateInfo',
        method: 'POST',
        async handler(request, reply) {
            const data = await updateInfo(request.body);
            reply.status(data.statusCode)
            reply.send(data)
        },
    });


    fastify.route({
        url:    '/selectBoardInfo',
        method: 'POST',
        async handler(request, reply) {
            const data = await selectBoardInfo(request.body);
            reply.status(data.statusCode)
            reply.send(data)
        },
    });
    next();
};