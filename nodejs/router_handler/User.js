const db = require('../db/index')
exports.UserListGet = (req, res) => {
    const sql = 'select `key`,`name`,`role`,`phone`,`mail` from user'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err);
        res.send({
            status: 0,
            message: '获取用户列表成功',
            data: results
        })
    })
}

exports.PwdModify = (req, res) => {
    const sql = 'update `user` set `pwd` = ? where `key`= ?'
    db.query(sql, [req.body.pwd, req.body.key], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('修改失败')
        res.cc('修改成功', 0)
    })
}
exports.UserModify = (req, res) => {
    const sql = 'update `user` set `name` = ?, `mail` = ?, `phone` = ?, `role` = ? where `key`= ?'
    db.query(sql, [req.body.name, req.body.mail, req.body.phone, req.body.role, req.body.key], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('编辑失败')
        res.cc('编辑成功', 0)
    })
}
exports.UserDelete = (req, res) => {
    const sql = 'delete from user where `key`= ?';
    const sql2 = 'alter table user drop `key`';
    const sql3 = 'alter table user add `key` int not null primary key auto_increment first';
    const sql4 = 'select `key`,`name`,`role`,`phone`,`mail` from user';
    db.query(sql, [req.body.key], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('删除失败')
        db.query(sql2, (err, results) => {
            if (err) return res.cc(err);
            db.query(sql3, (err, results) => {
                if (err) return res.cc(err);
                db.query(sql4, (err, results) => {
                    if (err) return res.cc(err);
                    res.send({
                        status:0,
                        message:'删除成功',
                        data:results
                    })
                })
            })
        })
        
    })
}