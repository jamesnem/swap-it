let express = require("express");
let dbo = require("./db/conn");
let app = express();

//var app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

const itemRouter = require('./routes/items');

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(express.json());

//API get for seller
app.get("/items", function (request, response) {
  dbo.getDb().collection("items").find({}).toArray(function (err,res) {
  if (err)
 throw err
 response.send(res);
});
});

// API post for seller
app.post("/items", function (request, response) {
  
  //add some validation logic
  const item = request.body;
  console.log(JSON.stringify(item));
  if(item){
    dbo.getDb().collection("items").insertOne(item);
  }else{
    response.sendStatus(500);
  }
  response.sendStatus(204);
});

app.use('/api/items', itemRouter);

// // API delete for seller
// app.delete('/:id', function (req, res) {
//   dbo.getDb().collection("items").deleteOne({ itemID: id }), (err, result) =>
//   {
//     if (err) throw err;
//     res.send({ result: 204 });
//   }
// });

//socket test
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  setInterval(()=>{
    socket.emit('number', parseInt(Math.random()*10));
  }, 1000);

});

//database connection
dbo.connectToDatabase(function(err){
  if (err){
    console.error(err);
    process.exit();
  
  }
  http.listen(port, () => {
    console.log("Listening on port ", port);
  });
  });

// http.listen(port,()=>{
//   console.log("Listening on port ", port);
// });

//this is only needed for Cloud foundry 
require("cf-deployment-tracker-client").track();