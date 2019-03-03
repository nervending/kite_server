const kHttpErrorCodeMsgMap = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    409: 'Conflict',
}

async function setupCtxFunc(ctx, next) {
    ctx.rest = (jsonData = undefined) => {
        ctx.set('Content-Type', 'application/json')
        let responseJson = {
            code: 200,
            msg: 'ok',
            data: jsonData
        }
        ctx.body = JSON.stringify(responseJson)
    };
    ctx.onError = (code, msg = undefined, jsonData = undefined) => {
        ctx.set('Content-Type', 'application/json')
        if (!msg) {
            msg = kHttpErrorCodeMsgMap[code] || 'Unknown Error'
        }
        let responseJson = {
            code,
            msg,
            data: jsonData
        }
        ctx.body = JSON.stringify(responseJson)
    }

    await next()
}

module.exports = setupCtxFunc