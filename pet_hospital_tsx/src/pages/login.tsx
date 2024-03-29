import { Row, Col, Card, Form, Button, message, Input, Radio, Modal } from 'antd'
import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import logo from '../assets/1.ico'
import { Navigate, useNavigate } from 'react-router-dom'
import { loginAPI } from '../services/auth';
import { UserOutlined, LockOutlined,PhoneOutlined,MailOutlined } from '@ant-design/icons';

function Login() {
    const navigate = useNavigate();
    const [Radiovalue, setRadioValue] = useState("实习生");
    const [form] = Form.useForm();
    const [form1] = Form.useForm();
    const [radioValue1, setRadioValue1] = useState('实习生');
    const [isModal1Open, setIsModal1Open] = useState(false);

    const AddFormFinish = (value) => {
        console.log(value)
        window.location.reload()
    }
    const close = () => {
        setIsModal1Open(false);
      };

    const onChange = (e: RadioChangeEvent) => {
        setRadioValue(e.target.value)
        form.setFieldsValue({ "role": e.target.value });
    };
    const RadioChange1 = (e) => {
        setRadioValue1(e.target.value)
        form1.setFieldsValue({ "role": e.target.value });
      };
    return (
        <Row>
            <Col
                md={{
                    span: 8,
                    push: 8,
                }}
                xs={{
                    span: 22,
                    push: 8,
                }}
            >
                <img src={logo} style={{
                    display: 'block',
                    margin: '20px auto',
                    borderRadius: '16px',
                    width: '200px',
                }} />
                <Modal title="注册用户" open={isModal1Open} onCancel={close} footer={[]}>
                    <Form
                        style={{ marginTop: '30px' }}
                        labelCol={{
                            md: {
                                span: 4,
                            },
                        }}
                        form={form1}
                        onFinish={AddFormFinish}
                        initialValues={{
                            'role': '实习生'
                        }}
                    >
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: '请输入账号' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
                        </Form.Item>
                        <Form.Item
                            name="pwd"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item
                            name="mail"
                            rules={[{ required: true, message: '请输入邮箱' }]}
                        >
                            <Input
                                prefix={<MailOutlined className="site-form-item-icon" />}
                                type="email"
                                placeholder="邮箱"
                            />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            rules={[{ required: true, message: '请输入电话' }]}
                        >
                            <Input
                                prefix={<PhoneOutlined className="site-form-item-icon" />}
                                type="tel"
                                placeholder="电话"
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }} name="role">
                            <Radio.Group defaultValue="实习生" onChange={RadioChange1} value={radioValue1}>
                                <Radio.Button value="实习生">实习生</Radio.Button>
                                <Radio.Button value="管理员">管理员</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit' type='primary' style={{
                                display: 'block',
                                margin: '8px auto',
                                width: '20vw',
                            }}>注册</Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Card title='虚拟宠物医院后台管理系统'>
                    <Form
                        labelCol={{
                            md: {
                                span: 4,
                            },
                        }}
                        initialValues={{
                            'role': '实习生',
                        }}
                        onFinish={(value) => {
                            // const res =await loginAPI(v)
                            console.log(value)
                            // message.success('登录成功')
                            if (value.role == "实习生") {
                                navigate('/fore')
                            } else {
                                navigate('/index')
                            }

                        }}
                    >
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: '请输入用户名' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="pwd"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }} name='role'>
                            <Radio.Group defaultValue="实习生" onChange={onChange} value={Radiovalue}>
                                <Radio.Button value="实习生">实习生</Radio.Button>
                                <Radio.Button value="管理员">管理员</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Button htmlType='submit' type='primary' style={{
                                display: 'block',
                                margin: '8px auto',
                                width: '20vw',
                            }}
                            onClick={()=>{
                                setIsModal1Open(true)
                            }}>没有账号？点此注册</Button>
                        <Form.Item>
                            <Button htmlType='submit' type='primary' style={{
                                display: 'block',
                                margin: '8px auto',
                                width: '20vw',
                            }}>登录</Button>
                        </Form.Item>
                    </Form>
                </Card>

            </Col>
        </Row>
    )
}
export default Login