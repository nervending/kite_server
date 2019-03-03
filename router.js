const Fs = require('fs');

const kSupportMethods = ['GET', "POST", "DELETE", "PUT"]

function parseFileToRouter(router, file_path, base_url_path) {
    let module_export = require(file_path);
    for (let key in module_export) {
        for (let method of kSupportMethods) {
            if (key.startsWith(method)) {
                let path = base_url_path + key.substring(method.length + 1)
                router[method.toLowerCase()](path, module_export[key])
                console.log(`${method} ${path}`)
            }
        }
    }
}

function parseDirToRouter(router, dir, base_url_path = '/') {
    if (!base_url_path.endsWith('/')) {
        base_url_path += '/';
    }
    Fs.readdirSync(dir).filter((f) => {
        if (f.endsWith('.js')) {
            return true;
        }
        var stat = Fs.lstatSync(dir + '/' + f);
        return stat.isDirectory();
    }).forEach((f) => {
        if (f.endsWith('.js')) {
            parseFileToRouter(router, dir + '/' + f, base_url_path);
        } else {
            parseDirToRouter(router, dir + "/" + f, base_url_path + f + "/");
        }
    });
}

function setupRouter(koa_app, controllers_dir = './controllers') {
    let router = require('koa-router')()
    parseDirToRouter(router, controllers_dir)
    koa_app.use(router.routes()).use(router.allowedMethods())
}

module.exports = {
    setupRouter
};