const db = require('../db/index')
exports.VD_Admin_TestPaperGet = (req, res) => {
    const sql = 'select * from exam order by id asc'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取任务数据成功！',
            data: results
        })
    })
}

exports.VD_Admin_TestPaperAdd = (req, res) => {
    const sql = 'select * from exam where name=?'
    db.query(sql, [req.body.name], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc('题目名称被占用，请更换后重试！')

        const sql = 'insert into exam set ?'
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('新增试题失败！')
            res.cc('新增试题成功', 0)
        })
    })
}

exports.VD_Admin_TestPaperEdit = (req, res) => {
    const sql = 'select * from exam where name=?'
    // console.log(req.body)
    db.query(sql, [req.body.name], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc('题目名称被占用，请更换后重试！')

        const sql = 'update exam set ? where `key`=?'
        db.query(sql, [req.body, req.body.key], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新任务失败！')
            res.cc('更新任务成功！', 0)
        })
    })
}

exports.VD_Admin_TestPaperDelete = (req, res) => {
    const sql = 'delete from exam where `key`=?'
    // console.log(req.params.key)
    db.query(sql, req.params.key, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除任务失败！')
        res.send({
            status: 0,
            message: '删除任务成功！',
        })
    })
}

