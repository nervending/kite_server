const Koa = require('koa');

const Config = require('./configs');
const BodyParser = require('koa-bodyparser');
const Router = require('./router')
const CtxEx = require('./common/koa/ctx_ex')
const DBS = require('./dbs')

async function startApp() {
    const app = new Koa();
    app.use(BodyParser());
    app.use(CtxEx);
    Router.setupRouter(app);

    await DBS.setupDB();

    app.listen(Config.port);
    console.log(`server start of:${Config.port}`);
}

startApp()