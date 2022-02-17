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


app.use('/api/items', itemRouter);
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
require("cf-deployment-tracker-client").track();