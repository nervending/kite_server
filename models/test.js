const DBS = require('../dbs')
const CollectionEx = require('../common/db/mongo_ex').CollectionEx
async function testMongoActions() {
    let collection = new CollectionEx(DBS.main_mongo.getDB('test'), 'test')
    await collection.deleteMany({})
    await showAll(collection, 'after delete all')
    await collection.insertOne({
        name: 'xiaoming',
        pwd: 'good'
    })
    await showAll(collection, 'after insert one')
    await collection.insertMany([{
        name: 'zhangsan',
        pwd: 'good'
    }, {
        name: 'lisi',
        pwd: 'good'
    }])
    await showAll(collection, 'after insert many')
    let xiaoming = await collection.findOne({
        name: 'xiaoming'
    })
    console.log(`find one of xiaoming:${JSON.stringify(xiaoming)}`)
    await collection.updateOne({
        name: 'xiaoming'
    }, {
        $set: {
            pwd: 'not so good'
        }
    })
    xiaoming = await collection.findOne({
        name: 'xiaoming'
    })
    console.log(`find one of xiaoming after update:${JSON.stringify(xiaoming)}`)
    await collection.updateMany({}, {
        $set: {
            pwd: 'very good'
        }
    })
    await showAll(collection, 'after update many')
    await collection.deleteOne({
        name: 'xiaoming'
    })
    await showAll(collection, 'after delet one')
    await collection.deleteMany({})
    await showAll(collection, 'after delet many')
}

async function showAll(collection, msg) {
    console.log('**********************    ' + msg + ' start')
    let items = await collection.findMany({})
    for (let item of items) {
        console.log(JSON.stringify(item))
    }
    console.log('**********************    ' + msg + ' end')
}

module.exports = testMongoActions