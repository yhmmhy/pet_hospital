const express = require('express')
const router = express.Router()
const user_handler = require('../router_handler/User')
router.get('/UserListGet', user_handler.UserListGet)
router.post('/PwdModify',user_handler.PwdModify)
router.post('/UserModify',user_handler.UserModify)
router.post('/UserDelete',user_handler.UserDelete)
module.exports = router