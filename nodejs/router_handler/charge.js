const db = require('../db/index')
exports.ProjectAdd = (req, res) => {
    const sql = 'insert into charge(name,type,description,img,price) values(?,?,?,?,?)'
    db.query(sql, [req.body.name, req.body.type, req.body.description, req.body.img, req.body.price], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('添加失败')
        res.cc('添加成功', 0)

    })

}
exports.ProcjectListGet = (req, res) => {
    const sql = 'select * from charge'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err);
        res.send({
            status: 0,
            message: '获取项目列表成功',
            data: results
        })
    })
}

exports.ProjectModify = (req, res) => {
    const sql = 'update `charge` set `name` = ?, `type` = ?, `description` = ?, `img` = ? ,`price` = ? where `key`= ?'
    db.query(sql, [req.body.name, req.body.type, req.body.description, req.body.img, req.body.price,req.body.key], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('编辑失败')
        res.cc('编辑成功', 0)
    })
}
exports.ProjectDelete = (req, res) => {
    const sql = 'delete from charge where `key`= ?';
    const sql2 = 'alter table charge drop `key`';
    const sql3 = 'alter table charge add `key` int not null primary key auto_increment first';
    const sql4 = 'select * from charge';
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