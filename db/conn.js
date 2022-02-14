const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://haroonmu:6FeuLYdYPylUB2Al@cluster0.eeoib.mongodb.net/seller?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let dbConnection;
module.exports = {
    connectToDatabase : function(calback){
        client.connect(function(err,db){
            if (err || !db){
            return calback(err);
            }
            dbConnection = db.db("seller");
            console.log("Connect to mongo atlas");
            return calback();
        });
    },
    getDb: function(){
        return dbConnection;
    }
}
 