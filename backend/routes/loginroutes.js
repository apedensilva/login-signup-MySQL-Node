const express = require('express')
const {login} = require('../controllers/loginctrl')

const loginrouter = express.Router();

loginrouter.post('/login',login)

module.exports = loginrouter;