const db = require('../db/index')
exports.Register = (req, res) => {
    const sql = 'insert into user(name,role,pwd,phone,mail) values(?,?,?,?,?)'
    db.query(sql, [req.body.name, req.body.role, req.body.pwd, req.body.phone, req.body.mail], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('注册失败')
        res.cc('注册成功', 0)

    })

}
exports.Login = (req, res) => {
    const sql = 'select `pwd`,`role` from user where `name` = ?'
    db.query(sql, [req.body.name], (err, results) => {
        const data1 = JSON.parse(JSON.stringify(results))
        if (err) return res.cc(err)
        if (data1[0].pwd != req.body.pwd || data1[0].role != req.body.role) return res.cc('登录失败')
        res.send({
            status:0,
            message:'登录成功',
            token:'h2087eyr9hunqopw8hjrf0qew8hj0r9'
        })


    })

}