let express = require("express");
let app = express();
let http = require('http').createServer(app);

require('./public/database/init_Mongo'); 
const jwt = require('jsonwebtoken');
const userStructure = require('./public/models/user_model');
const bodyParse = require("body-parser");
const bcrypt = require('bcryptjs');

//Create jsonwebtoken secret to be shared between server and client
const jwtSecret = "asdqwewerertrtytyu123%$#dgdfg"

const routes = require('./public/Routers/user-router')

app.use('/api', routes);
app.use(express.static(__dirname + '/public/View'));
app.use(express.json());
app.use(bodyParse.urlencoded({ extended: false }));

var port = process.env.PORT || 8080;

//***********************************************************************************************************************************
//API's have been moved to server.js for the sake of functionality, as an error was repeatedly occuring when placed in user-router.js
//***********************************************************************************************************************************

//Retrieve post HTML data from appropriate routes
app.get('/login', async (req, res) => {
  res.sendFile(__dirname + '/public/View/index.html')
})

app.get('/register', async (req, res) => {
  res.sendFile(__dirname + '/public/View/register.html')
})

app.get('/preferences', async (req, res) => {
  res.sendFile(__dirname + '/public/View/preferences.html')
})

app.get('/seller', async (req, res) => {
  res.sendFile(__dirname + '/public/View/seller.html')
})

//Hash users password and store it to the database
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

//Allow users to log in to an existing account
app.post('/login', async (req, res) => {
  const email = req.body.logEmail;
  const password = req.body.logPassword;

  //Return an error if user entered wrong email
  const logUser = await userStructure.findOne({ email }).lean()
  if (!logUser) {
    console.log("Email has not been registered")
    res.redirect('/')
    return res.json({ status: 'error', error: 'Invalid username/password' })
  }

  //Redirect user to seller page if both credentials are equal
  if (await bcrypt.compare(password, logUser.password)) {
    console.log("Login successful")
    res.redirect('/seller')
    return res.json({ status: 'granted'})
  }

  //Return an error if user entered wrongpassword
  else {
    console.log("Password credentials incorrect")
    res.redirect('/')
    return res.json({ status: 'error', error: 'Invalid username/password' })
  }

  /*Need further time to work on jsonwebtoken to send to index.html to provide further security
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          email: user.email
        },
        jwtSecret
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