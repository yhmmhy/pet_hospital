import { Row, Col, Card, Form, Button, message, Input, Radio, Modal,Alert } from 'antd'
import React, { useEffect, useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import logo from '../assets/1.ico'
import { Navigate, useNavigate } from 'react-router-dom'
import { loginAPI } from '../services/auth';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios'
import { Md5 } from 'ts-md5'
import cookie from 'react-cookies'

function Login() {
    const navigate = useNavigate();
    const [Radiovalue, setRadioValue] = useState("实习生");
    const [form] = Form.useForm();
    const [form1] = Form.useForm();
    const [radioValue1, setRadioValue1] = useState('实习生');
    const [isModal1Open, setIsModal1Open] = useState(false);
    const [pageRadio, setPageRadio] = useState('后台')
    const [radioStyle, setRadioStyle] = useState('none')
    axios.defaults.baseURL = 'http://47.102.142.153:5000';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    
    const AddFormFinish = (value) => {
        const md5 = Md5.hashStr(value.pwd);
        var is_admin = 0;
        if(value.role == '管理员'){
            is_admin = 1;
        }
        axios.post('/register', {
            'account': value.name,
            'is_admin': is_admin,
            'password': md5,
            'phone': value.phone,
            'mail': value.mail
        }).then(res => {
            if (res.data.code==200) {
                message.success(res.data.message);
                close();
                form1.resetFields();
            }
        }, error => {
            message.error('注册失败');
        })
    }

    const handleValidator = (rule, value, callback) => {
        if (!value) {
            callback('');
        }
        const pwd = form1.getFieldValue('pwd')
        let validateResult = value == pwd;  // 自定义规则
        if (!validateResult) {
            callback('两次密码不一致！');
        }
        callback();
    }

    const LoginFormFinish = (value) => {
        const md5 = Md5.hashStr(value.pwd);
        axios.post('/login', {
            'account': value.name,
            'role': value.role,
            'password': md5,
        }).then(res => {
            if (res.data.code == 200) {
                message.success(res.data.message)
                cookie.save('token', res.data.token, { path: '/' });
                cookie.save('username', value.name, { path: '/' });
                cookie.save('role', value.role, { path: '/' })
                if (value.role == "实习生") {
                    navigate('/fore')
                } else if (value.page == '前台') {
                    navigate('/fore')
                } else navigate('/index')
            }

        }, error => {
            message.error('登录失败');
        })

    }

    const close = () => {
        setIsModal1Open(false);
    };

    const onChange = (e: RadioChangeEvent) => {
        setRadioValue(e.target.value)
        form.setFieldsValue({ "role": e.target.value });
        if (e.target.value == '管理员') {
            setRadioStyle('block')
        } else {
            setRadioStyle('none')
        }
    };
    const pageChange = (e: RadioChangeEvent) => {
        setPageRadio(e.target.value)
        form.setFieldsValue({ "page": e.target.value });
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
                            rules={[{ required: true, message: '请输入用户名' }, { pattern: new RegExp('^[a-zA-Z0-9_]{3,20}$', 'g'), message: '用户名长度为3-20位，允许使用字母，数字和下划线' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="pwd"
                            rules={[{ required: true, message: '请输入密码' }, { pattern: new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$'), message: '密码必须包含字母和数字，不能使用特殊字符，长度在 6-20 之间' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item
                            name="pwd2"
                            rules={[{ required: true, message: '请再次输入密码' }, { validator: (rules, value, callback) => { handleValidator(rules, value, callback) } }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="确认密码"
                            />
                        </Form.Item>
                        <Form.Item
                            name="mail"
                            rules={[{ required: true, message: '请输入邮箱' }, {
                                pattern: new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, 'g'
                                ), message: '请输入正确的邮箱地址'
                            }]}
                        >
                            <Input
                                prefix={<MailOutlined className="site-form-item-icon" />}
                                type="email"
                                placeholder="邮箱"
                            />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            rules={[{ required: true, message: '请输入手机号码' }, {
                                pattern: new RegExp(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, 'g'
                                ), message: '请输入正确的手机号码'
                            }]}
                        >
                            <Input
                                prefix={<PhoneOutlined className="site-form-item-icon" />}
                                type="tel"
                                placeholder="手机号码"
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
                <Card title='虚拟宠物医院学习系统'>
                    <Form
                        labelCol={{
                            md: {
                                span: 4,
                            },
                        }}
                        initialValues={{
                            'role': '实习生',
                            'page': '后台'
                        }}
                        onFinish={LoginFormFinish}
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
                        <Form.Item wrapperCol={{ offset: 6, span: 16 }} name='page' style={{ display: radioStyle }}>
                            <Radio.Group defaultValue="后台" onChange={pageChange} value={pageRadio}>
                                <Radio.Button value="前台">前台学习系统</Radio.Button>
                                <Radio.Button value="后台">后台管理系统</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Button type='primary' style={{
                            display: 'block',
                            margin: '8px auto',
                            width: '20vw',
                        }}
                            onClick={() => {
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