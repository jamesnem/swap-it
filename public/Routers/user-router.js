//Include bcrypt and body-parser module
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const { append } = require('express/lib/response')
const router = express.Router()
const bodyParse = require("body-parser")
const mongoose = require('mongoose');
const createError = require('http-errors')

router.use(bodyParse.urlencoded({extended: false}));


router.delete('/logout', async(req, res, next) => {
    res.send("logout route")
})




module.exports = router