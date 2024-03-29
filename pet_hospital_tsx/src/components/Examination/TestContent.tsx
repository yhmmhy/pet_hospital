import React, { useState, useEffect } from 'react'
import Question from './Question'
import { Form, Modal, Button } from 'antd';

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
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalscore, settotalscore] = useState(0)
    const [userAnswers, setUserAnswers] = useState({});
    const [isEnd, setisEnd] = useState(false)
    const [startVisible, setStartVisible] = useState(true);
    const [endVisible, setEndVisible] = useState(false);
    const [endFormVisible, setendFormVisible] = useState(false);
    useEffect(() => {
        console.log(props.selectkey)
    }, [props.selectkey]);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const testStart = () => {
        props.countdownStart()
        setEndVisible(true)
        setStartVisible(false)
        setendFormVisible(true)
    }
    let sumscore = 0;
    for (let i = 0; i < data.length; i++) {
        sumscore += data[i].score
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
        let totalscore = 0;
        form.validateFields().then(values => {
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

            <Modal title="是否结束考试？" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            </Modal>

        </div>
    )
}
