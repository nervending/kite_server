module.exports = {
    'GET hello': async (ctx, next) => {
        ctx.body = 'GET Hello/Hello World';
    }
}