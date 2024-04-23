import React, { useState, useEffect } from 'react'
import Question from './Question'
import { Form, Modal, Button } from 'antd/lib';
import axios from 'axios';

let data = [
    {
        key: '1',
        id: '1',
        title: '狗狗狗狗狗狗',
        A: '狗狗狗狗',
        B: '狗狗狗狗',
        C: '狗狗狗狗',
        D: '狗狗狗狗',
        type: '接诊',
        rightchoice: 'A',
        score: 20
    },
    {
        key: '2',
        id: '2',
        title: '猫猫猫猫猫',
        A: '狗狗狗',
        B: '狗狗狗',
        C: '狗狗狗',
        D: '狗狗狗',
        type: '接诊',
        rightchoice: 'B',
        score: 80
    },
    {
        key: '3',
        id: '3',
        title: '猫猫猫猫猫',
        A: '狗狗狗',
        B: '狗狗狗',
        C: '狗狗狗',
        D: '狗狗狗',
        type: '接诊',
        rightchoice: 'B',
        score: 80
    },
    {
        key: '4',
        id: '4',
        title: '猫猫猫猫猫',
        A: '狗狗狗',
        B: '狗狗狗',
        C: '狗狗狗',
        D: '狗狗狗',
        type: '接诊',
        rightchoice: 'B',
        score: 80
    }
]
export default function TestContent(props) {
    // console.log(props.data)
    // console.log(props.pooldata)
    // const [form] = Form.useForm();
    const [form, setForm] = useState(Form.useForm()[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalscore, settotalscore] = useState(0)
    const [userAnswers, setUserAnswers] = useState({});
    const [isEnd, setisEnd] = useState(false)
    const [startVisible, setStartVisible] = useState(true);
    const [endVisible, setEndVisible] = useState(false);
    const [endFormVisible, setendFormVisible] = useState(false);
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://47.102.142.153:5000/user/test/${props.selectkey}/${props.selectkey}`)
            console.log(response)
            data = response.data.exam;

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const [iscomplete, setiscomplete] = useState(false);
    useEffect(() => {
        console.log(props.selectkey);
        fetchData();
        form.resetFields();
        // // 更新状态中的 Form 实例
        // setForm(newForm);
        setIsModalOpen(false)
        settotalscore(0)
        setUserAnswers({})
        setisEnd(false)
        setStartVisible(true)
        setEndVisible(false)
        setendFormVisible(false)
        setiscomplete(false)
    }, [props.selectkey]);
   
    const showModal = () => {
        var iscompleteflag = true
        form.validateFields().then(values => {
            for (let i = 0; i < data.length; i++) {
                if (values[data[i].key] === undefined) {
                    iscompleteflag = false
                    break;
                }
            }
            if (iscompleteflag === true) {
                setiscomplete(true);
            }
            setIsModalOpen(true);
        })

    };
    const testStart = () => {
        props.countdownStart()
        setEndVisible(true)
        setStartVisible(false)
        setendFormVisible(true)
    }
    let sumscore = 0;
    for (let i = 0; i < data.length; i++) {
        sumscore += data[i].score * 1
    }
    // const handleOk = () => {
    //     let totalscore = 0
    //     form.validateFields().then(values => {
    //         console.log(values)
    //         for (let i = 0; i < data.length; i++) {
    //             if (values[data[i].key] === data[i].rightchoice) {
    //                 totalscore += data[i].score * 1
    //             }
    //         }
    //         settotalscore(totalscore)
    //         console.log(totalscore)
    //     })
    //     setIsModalOpen(false);
    // };
    const handleOk = () => {
        setEndVisible(false)
        let totalscore = 0;
        form.validateFields().then(values => {
            // for (let i = 0; i < data.length; i++) {
            //     if(values[data[i].key]===undefined)
            //     {

            //     }
            // }
            // console.log(values);
            let userAnswersCopy = { ...userAnswers };
            for (let i = 0; i < data.length; i++) {
                if (values[data[i].key] === data[i].rightchoice) {
                    totalscore += data[i].score * 1;
                }
                userAnswersCopy[data[i].key] = values[data[i].key];
            }
            setUserAnswers(userAnswersCopy);
            settotalscore(totalscore);
            let scorestring = totalscore.toString() + "/" + sumscore.toString();
            console.log(scorestring)
            const scoreobject = { "score": 20 }
            console.log(scoreobject)
            // axios.post(`http://47.102.142.153:5000/user/test/1/1`, scoreobject)
            //     .then(response => {
            //         // 处理请求成功的逻辑
            //         console.log(response)
            //     })
            //     .catch(error => {
            //         // 处理请求失败的逻辑
            //         console.log(error)
            //     });
        });

        setIsModalOpen(false);
        setisEnd(true);
        props.changeisStart()

    };

    useEffect(() => {
        if (props.countEnd === true) {
            alert('时间到了，考试结束')
            handleOk();
            setEndVisible(false)
        }

    }, [props.countEnd]);
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className='TestContent'>
            {startVisible && (<Button type="primary" onClick={testStart}>
                开始考试
            </Button>)}
            {endFormVisible && (<Form form={form}>
                {data.map((item, index) => (
                    <Form.Item key={item.key}>
                        <Question key={item.key} data={item} index={index} userAnswers={userAnswers} isEnd={isEnd} />
                    </Form.Item>
                ))}
            </Form>)}
            {isEnd && (<h2>测验总分为{totalscore}/{sumscore}</h2>)}

            {endVisible && (<Button type="primary" onClick={showModal}>
                结束考试
            </Button>)}

            <Modal title={iscomplete ? "是否结束考试？" : "有试题尚未完成，是否结束考试？"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            </Modal>

        </div>
    )
}
