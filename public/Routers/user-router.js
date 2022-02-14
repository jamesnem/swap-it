//Include bcrypt and body-parser module
const express = require('express')
const app = express()
const { append } = require('express/lib/response')
const router = express.Router()

router.delete('/logout', async(req, res, next) => {
    res.send("logout route")
})

//Not calling properly
/*
router.get('/', async(req, res) => {
    res.sendFile('/public/index.html', { root: '.' })
  })

router.get('/register', async(req, res) => {
    res.sendFile(__dirname + '/public/register.html')
  })

router.post('api/register', async(req, res) => {
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
*/

module.exports = router