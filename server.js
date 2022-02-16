let express = require("express");
const app = express();
const bodyParse = require("body-parser");
const bcrypt = require('bcrypt');
let http = require('http').createServer(app);
let io = require('socket.io')(http);
const jwt = require('jsonwebtoken');
const userStructure = require('./public/models/user_model');
require('./public/database/init_Mongo');

app.use(express.static(__dirname + '/public'));
var port = process.env.PORT || 8080;
app.use(express.json());
app.use(bodyParse.urlencoded({ extended: false }));

app.get('/login', async (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/register', async (req, res) => {
  res.sendFile(__dirname + '/public/register.html')
})

app.get('/preferences', async (req, res) => {
  res.sendFile(__dirname + '/public/preferences.html')
})

app.get('/seller', async (req, res) => {
  res.sendFile(__dirname + '/public/seller.html')
})

app.post('/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.userPassword, 10)
  try {
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

const secretCombination = 'asdwerrtyertkjdfg';
//Allow users to log in to account with previously used 
app.post('/login', async (req, res) => {
  const email = req.body.logEmail;
  const password = req.body.logPassword;

  //Secret for jsonwebtoken

  const logUser = await userStructure.findOne({ email }).lean()
  if (!logUser) {
    console.log("Email has not been registered")
    res.redirect('/')
    return res.json({ status: 'error', error: 'Invalid username/password' })
  }

  if (await bcrypt.compare(password, logUser.password)) {
    console.log("Login successful")
    res.redirect('/seller')
    return res.json({ status: 'granted'})
  }

  else {
    console.log("Password credentials incorrect")
    res.redirect('/')
    return res.json({ status: 'error', error: 'Invalid username/password' })
  }

  /*Further security using jsonwebtoken
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          email: user.email
        },
        JWT_SECRET
      )
      //return res.json({ status: 'ok', data: token })
    }
    //res.json({ status: 'error', error: 'Invalid credentials' })*/
})

app.post('/seller', async(req, res) => {

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

http.listen(port, () => {
  console.log("Listening on port ", port);
});