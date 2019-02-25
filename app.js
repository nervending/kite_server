const Koa = require('koa');
const app = new Koa();
const Config = require('./configs')

// response
app.use(async (ctx, next) => {
    await next();
    ctx.body = 'Hello World';
});

app.listen(Config.port);
console.log(`server start of:${Config.port}`)