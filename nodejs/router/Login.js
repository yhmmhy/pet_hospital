const express = require('express')
const router = express.Router()
const login_handler = require('../router_handler/Login')
router.post('/Register', login_handler.Register)
router.post('/Login', login_handler.Login)
module.exports = router