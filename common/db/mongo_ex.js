var MongoClient = require('mongodb').MongoClient;

class CollectionEx {
    constructor(db, collection_name) {
        this.collection = db.collection(collection_name)
    }

    async insertOne(doc, options) {
        return await this.collection.insertOne(doc, options).insertedId;
    }

    async insertMany(docs, options) {
        return await this.collection.insertMany(docs, options).insertedIds;
    }

    async findOne(filter) {
        return await this.collection.findOne(filter);
    }

    async findMany(filter) {
        let cursor = this.collection.find(filter)
        return await cursor.toArray()
    }

    async deleteOne(filter, options) {
        let result = await this.collection.deleteOne(filter, options);
        return result.deletedCount;
    }

    async deleteMany(filter) {
        let result = await this.collection.deleteMany(filter);
        return result.deletedCount;
    }

    async updateOne(filter, update) {
        let result = await this.collection.updateOne(filter, update);
        return result.modifiedCount;
    }

    async updateMany(filter, update) {
        let result = await this.collection.updateMany(filter, update);
        return {
            matched_count: result.matchedCount,
            modified_count: result.modifiedCount
        };
    }
}


class ClientEx {
    constructor() {
        this.client = null;
        this.db_map = {};
    }

    async connect(uri, options) {
        this.client = await MongoClient.connect(uri, options);
    }

    getDB(db_name) {
        if (!this.isConnected()) {
            throw new Error('mongo is not connected');
        }
        let db = this.db_map[db_name];
        if (!db) {
            db = this.client.db(db_name);
            this.db_map[db_name] = db;
        }
        return db;
    }

    isConnected() {
        return (this.client && this.client.isConnected())
    }

    async close() {
        if (!this.isConnected()) {
            return;
        }
        this.db_map = {}
        this.client.close();
        this.client = null;
    }
}

module.exports = {
    CollectionEx,
    ClientEx
}