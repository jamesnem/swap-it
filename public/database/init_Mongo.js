const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

//Connect with mongoDB
const uri = "mongodb+srv://practicals:i3JedOwQO0NHDWDS@cluster0.1qyzs.mongodb.net/swap-it?retryWrites=true&w=majority";

//Connect mongoose with mongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));

//Alert console of activity
mongoose.connection.on('connected', () => {
    console.log('connected to mongodb')
})

mongoose.connection.on('error', (err) => {
    console.log(err.message)
})

mongoose.connection.on('disconnected', () => {
    console.log('disconnected from mongodb')
})

process.on('SIGNOUT', async() => {
    await mongoose.connection.close();
    process.exit(0)
})