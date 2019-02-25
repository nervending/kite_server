let env_name = process.env.NODE_ENV || 'development';
let config = undefined
try {
    config = require(`./${env_name}`);
} catch (error) {
    console.log(`\tFBI WARNING\nconfig file of '${env_name}' not found, exit process`)
    process.exit(-1)
}

config.port = process.env.PORT || config.port
module.exports = config