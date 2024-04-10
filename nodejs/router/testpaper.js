const express = require('express')
const router = express.Router()
const user_handler = require('../router_handler/testpaper')
router.get('/VD_Admin_TestPaperGet', user_handler.VD_Admin_TestPaperGet)
router.post('/VD_Admin_TestPaperAdd', user_handler.VD_Admin_TestPaperAdd)
router.post('/VD_Admin_TestPaperEdit', user_handler.VD_Admin_TestPaperEdit)
router.get('/VD_Admin_TestPaperDelete/:key', user_handler.VD_Admin_TestPaperDelete)
module.exports = router