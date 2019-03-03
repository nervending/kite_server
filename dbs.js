const MongoEx = require('./common/db/mongo_ex')
const Config = require('./configs')
const MainMongoConfig = Config.mongo

module.exports = {
    setupDB: async () => {
        let main_mongo = new MongoEx.ClientEx()
        await main_mongo.connect(MainMongoConfig.uri, MainMongoConfig.options)
        module.exports.main_mongo = main_mongo;
    }
}