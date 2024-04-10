const express = require('express')
const router = express.Router()
const user_handler = require('../router_handler/testquestion')
router.get('/VD_Admin_TestQuestionsGet', user_handler.VD_Admin_TestQuestionsGet)
router.post('/VD_Admin_TestQuestionsAdd', user_handler.VD_Admin_TestQuestionsAdd)
router.post('/VD_Admin_TestQuestionsEdit', user_handler.VD_Admin_TestQuestionsEdit)
router.get('/VD_Admin_TestQuestionsDelete/:key', user_handler.VD_Admin_TestQuestionsDelete)
module.exports = router