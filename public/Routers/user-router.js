//Include bcrypt and body-parser module
const express = require('express')
const app = express()
const { append } = require('express/lib/response')
const router = express.Router()

router.delete('/logout', async(req, res, next) => {
    res.send("logout route")
})

module.exports = router