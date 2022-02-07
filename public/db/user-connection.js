/*const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://swap-it:qVPSNh1NWtBwhUgh@cluster0.1qyzs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let dbConnection;

module.exports = {
    connectToDatabase: function (callback) {
        client.connect(function (err, db ) {
            if (err || !db) {
                return callback(err);
            }

            dbConnection = db.db("swap-it");
            console.log("Connected to mongo atlas");

            return callback();
        });
    },

    getDb: function () {
        return dbConnection;
    }
}*/