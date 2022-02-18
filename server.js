let express = require("express");
let app = express();

//var app = require('express')();
let http = require('http').createServer(app);
// let io = require('socket.io')(http);
let dbo = require('./db/conn');

var port = process.env.PORT || 8090;

app.use(express.static(__dirname + '/public'));
console.log("hello!")
console.log("hello! again")

const { instrument } = require ("@socket.io/admin-ui");
const { isBuffer } = require("util");
const res = require("express/lib/response");
const io = require("socket.io")(3000,{
    cors:{origin: ["http://localhost:8080", "https://admin.socket.io"],
    },
})

io.on("connection", socket => {
    console.log(socket.id)
    socket.on ("send-message", ( message, room) => {
        if (room === "") {  
            console.log ("room === " + typeof room)
        socket.broadcast.emit("receive-message", message)
        console.log(message)
        }
        else {
            socket.to(room).emit("receive-message", message)
        }
        
       // Record user with IP address 
        let userID =  (room === "" || typeof room === "undefined" ) ? socket.id : room;
        console.log( ">>>" + Date.now() + " Name: "+ socket.id + " UID = " + userID + " room = "+ room + " says: "+ message)
        
        const recordsArray = [];
        recordsArray.push ({
            "recordTime": Date.now(), 
            "recordName": socket.id, 
            "recordRoom": room, 
            "recordMessage": message, 
          });
        console.log ("records<<>>  ", recordsArray);
        // app.get("/records", recordsArray);

    })
    socket.on ("join-room", (room, cb) => {
        socket.join(room)
        cb(`Joined ${room}`)
    })
})

instrument(io, {auth: false})

// // Create record
// function createRecord(){ 
//         d => {
//           const record = {
//             "recordTime": Date.now(), 
//             "recordName": socket.id, 
//             "recordRoom": room, 
//             "recordMessage": message, 
//           };
        
//           var settings = {
//             "url": "/record",
//             "method": "POST",
//             "timeout": 0,
//             "headers": {
//               "Content-Type": "application/json"
//             },
//             "data": JSON.stringify(record),
//           };
  
//         console.log(settings);
//         console.log(response);
//         console.log (record);
//     }
//     // debugger;
  
//     console.log('Cheers!!!');
   
  
//   };
// Create record



http.listen(port,()=>{
  console.log("Listening on port ", port);
});

//Connect to DB, if error - terminate, nothing else to do.
dbo.connect ((err) => {
    if (err) {
        console.log (err + "Chat-records database is currently unavailable!");
      console.error(err);
      process.exit();
    }
  });

  // get all records, route server side, localhost:8090/records
app.get("/records", function(request,response){
    dbo.getDB()
    .collection("records")
    .find({})
    .toArray((err,res) => {
        if (err) {
            throw err;
        }
        response.send(res);
    })
});

    // record conversations
app.post("/records", function(request,response){
    //future validation against sql injection ???
    if(!request.body)
        response.sendStatus(500);
    
    dbo.getDB()
        .collection("records")
        .insertOne(request.body)
    response.sendStatus(204);
});

//this is only needed for Cloud foundry 
require("cf-deployment-tracker-client").track();
