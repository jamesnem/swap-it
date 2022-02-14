let express = require("express");
const app = express();
const bodyParse = require("body-parser");
const bcrypt = require('bcrypt');
let http = require('http').createServer(app);
let io = require('socket.io')(http);
const jwt = require('jsonwebtoken');
const userStructure = require('./public/models/user_model');
require('./public/database/init_Mongo');
const secretCombination = 'asdwerrtyertkjdfg';

app.use(express.static(__dirname + '/public'));
var port = process.env.PORT || 8080;
app.use(express.json());
app.use(bodyParse.urlencoded({extended: false}));

app.get('/login', async(req, res) => {
  res.sendFile('/public/index.html', { root: '.' })
})

app.get('/register', async(req, res) => {
  res.sendFile(__dirname + '/public/register.html')
})

app.get('/preferences', async(req, res) => {
  res.sendFile(__dirname + '/public/preferences.html')
})

app.post('/login', async(req, res) => {
  res.json({status: 'ok', data: 'fdsfsdfs'})
  const logEmail = req.body.logEmail;
  const logPassword = req.body.logPassword;

  const logUser = await userStructure.findOne({logEmail, }).lean()

  if (!logUser){
    return res.json({status: 'error', error:'Incorrect email or password'})
  }

  if (await bcrypt.compare(logPassword, logUser.logPassword)) {

    const token = jwt.sign(
      {
        email: logUser.logEmail
      }, 
      secretCombination
    )
    return res.json({status: 'granted', data: token})
  }

  res.json({status: 'error', error:'Incorrect email or password'})
  res.redirect('/')
})

app.post('/register', async(req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.userPassword, 10)
  try{
    let addUser = new userStructure({
      name: req.body.userName,
      email: req.body.userEmail,
      password: hashedPassword
    })
    addUser.save();
    res.redirect('/preferences')
  }
  catch (error) {
    res.redirect('/register')
  }
})

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