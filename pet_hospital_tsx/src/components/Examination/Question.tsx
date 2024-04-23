import { Form, Radio, Space } from 'antd/lib';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import './Question.css'
// let data =
// {
//     key: '1',
//     id: '1',
//     title: '狗狗狗狗狗狗',
//     A: '狗狗狗狗',
//     B: '狗狗狗狗',
//     C: '狗狗狗狗',
//     D: '狗狗狗狗',
//     type: '接诊',
//     rightchoice: 'A',
//     score: 20
// }
  // @ts-ignore
export default function Question(props) {
      // @ts-ignore
    const { data, index, userAnswers, isEnd } = props;
    const userChoice = userAnswers[data.key];
    const isCorrect = userChoice === data.rightchoice;
    return (
        <div className="form-container">
            <h3 >题目{props.index + 1}:{props.data.title}({props.data.score}分)</h3>
            <br></br>
            <Form.Item className="item" name={props.data.key}>
                <Radio.Group >
                    <Space direction="vertical" >
                        <Radio value="A" > {props.data.A} </Radio>
                        <Radio value="B" > {props.data.B} </Radio>
                        <Radio value="C" > {props.data.C} </Radio>
                        <Radio value="D"> {props.data.D} </Radio>
                    </Space>
                </Radio.Group>
                {isEnd && (
                    <h2 style={isCorrect ? { color: 'green' } : { color: 'red' }}>
                        {isCorrect ? <CheckOutlined /> : <CloseOutlined />}
                        {isCorrect ? '回答正确' : `回答错误，正确选项为${props.data.rightchoice}`}
                    </h2>
                )}
            </Form.Item>


        </div>
    )
}
