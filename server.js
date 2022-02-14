let express = require("express");
const app = express();
const bodyParse = require("body-parser")
const bcrypt = require('bcrypt')
let http = require('http').createServer(app);
let io = require('socket.io')(http);
const userStructure = require('./public/models/user_model')
require('./public/database/init_Mongo')

app.use(express.static(__dirname + '/public'));
var port = process.env.PORT || 8080;

app.use(bodyParse.urlencoded({extended: false}));

app.get('/', async(req, res) => {
  res.sendFile('/public/index.html', { root: '.' })
})

app.get('/register', async(req, res) => {
  res.sendFile(__dirname + '/public/register.html')
})

app.post('/register', async(req, res) => {
  try{
    const hashedPassword = await bcrypt.hash(req.body.userPassword, 10)
    let addUser = new userStructure({
      name: req.body.userName,
      email: req.body.userEmail,
      password: hashedPassword
    })
    addUser.save();
    res.redirect('/')
  }
  catch{
    res.redirect('/register')
  }
})

app.use(express.json())

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

http.listen(port,()=>{
  console.log("Listening on port ", port);
});