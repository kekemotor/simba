// asd
const {  userLogin } = require('../../handlers/userLogin/handler');
const jwt = require("jsonwebtoken");


module.exports = function (fastify, opts, next) {

    fastify.route({
        url: '/Login',
        method: 'POST',
        async handler(request, reply) {
            const data = await userLogin(request.body);
            reply.status(data.statusCode)
            reply.send(data)
        },
    });

        next();
}