const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors')
app.use(express.static('public'))
app.use(bodyParser.json({limit: '5000mb'}));
app.use(bodyParser.urlencoded({limit: '5000mb', extended: true}));
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})
const UserRouter = require('./router/User')
app.use('/User', UserRouter)
const LoginRouter = require('./router/Login')
app.use('/Login', LoginRouter)
const HomeRouter = require('./router/Home')
app.use('/Home', HomeRouter)
const ChargeRouter = require('./router/charge')
app.use('/charge', ChargeRouter)
const testquestionRouter = require('./router/testquestion')
app.use('/testquestion', testquestionRouter)
const testpaperRouter = require('./router/testpaper')
app.use('/testpaper', testpaperRouter)
app.listen(3007, () => {
    console.log('api server running at http://127.0.0.1:3007')
})