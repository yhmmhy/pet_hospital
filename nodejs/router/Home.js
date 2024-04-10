const express = require('express')
const router = express.Router()
const home_handler = require('../router_handler/Home')
router.get('/Statistics', home_handler.Statistics)
module.exports = router