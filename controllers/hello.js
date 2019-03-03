const Models = require('../models')
const Test = Models.test

module.exports = {
    'GET test': async (ctx, next) => {
        await Test()
        ctx.rest()
    },

    'GET hello': async (ctx, next) => {
        console.log(`******** request query *************`)
        console.log(ctx.request.query)
        console.log(`******** request body *************`)
        console.log(ctx.request.body)
        ctx.rest({
            query: ctx.request.query,
            body: ctx.request.body
        })
    },

    'POST hello': async (ctx, next) => {
        ctx.body = 'Hello World';
        console.log(`******** request query *************`)
        console.log(ctx.request.query)
        console.log(`******** request body *************`)
        console.log(ctx.request.body)
        ctx.rest({
            query: ctx.request.query,
            body: ctx.request.body
        })
    },

    'GET error': async (ctx, next) => {
        ctx.onError(400)
    }
}