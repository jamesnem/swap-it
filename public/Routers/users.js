const express = require('express')
const router = express.Router()

router.post('/login', (req, res, next) => {
    res.send("login route")
})

router.post('/register', (req, res, next) => {
    res.send("register route")
})

router.delete('/logout', (req, res, next) => {
    res.send("logout route")
})


module.exports = router