let express = require("express");
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

const UserRoute = require('./public/Routers/users')

app.use('/authorise', UserRoute)

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

//Create error message that catches invalid routes
app.use((res, req, next) => {
  const error = new Error("Route Not Found");
  error.status = 404;
  next(error);
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    err: {
      status: err.status || 500,
      message: err.message,
    },
  })
})

//socket test
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  setInterval(() => {
    socket.emit('number', parseInt(Math.random() * 10));
  }, 1000);

});

http.listen(port, () => {
  console.log("Listening on port ", port);
});


//this is only needed for Cloud foundry 
require("cf-deployment-tracker-client").track();
