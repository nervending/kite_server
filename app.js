const Koa = require('koa');

const Config = require('./configs');
const BodyParser = require('koa-bodyparser');
const Router = require('./router')
const CtxEx = require('./common/koa/ctx_ex')

function startApp() {
    const app = new Koa();
    app.use(BodyParser());
    app.use(CtxEx);
    Router.setupRouter(app);

    app.listen(Config.port);
    console.log(`server start of:${Config.port}`);
}

startApp()