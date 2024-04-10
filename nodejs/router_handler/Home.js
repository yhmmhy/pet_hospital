const db = require('../db/index')
exports.Statistics = (req, res) => {
    const sql = 'select `role`,count(*) as sum from `user` group by `role`'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err);
        res.send({
            status: 0,
            message: '获取后台数据成功',
            data: {
                'adminnum':1,//管理员数量
                'stunum': 1,//实习生数量
                "usernum": 2,//用户总数量
                "casenum": 12,//病例数量
                "quesnum": 123,//题库题目数量
                "papernum": 10,//试卷数量

            }
        })
    })
}