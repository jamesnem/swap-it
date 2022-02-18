const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://julia:ff47hYkCHZ12yqlq@cluster0.0wxmh.mongodb.net/chat-records?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let dbConnection;

module.exports = {
  connect: (callback) => {
    client.connect((err, db) => {
      if (err || !db)
        return callback (err);

        dbConnection = db.db("chat-records");
        // const collection = client.db("chat-records").collection("records");
        console.log("Connected to MongoDB Atlas, recording chat");
        callback ();
    });
  },
  getDB : () => {
    return dbConnection;
  }
}

