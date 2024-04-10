const express = require('express')
const router = express.Router()
const charge_handler = require('../router_handler/charge')
router.get('/ProjectListGet', charge_handler.ProcjectListGet)
router.post('/ProjectAdd',charge_handler.ProjectAdd)
router.post('/ProjectModify',charge_handler.ProjectModify)
router.post('/ProjectDelete',charge_handler.ProjectDelete)
module.exports = router