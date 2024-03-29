import React from "react";
import {Component} from "react";
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Radio } from 'antd'
import './login.css'

export default class Login extends Component{
    render() {
        const onFinish = (values) => {
            console.log('Success:', values);
        };
        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        return (
            <div className={"login"}>
                <header className={"login-header"}>
                    <h1 className={"title"}>
                        虚拟宠物医院学习系统
                    </h1>
                </header>
                <section className={"login-content"}>
                    <h2>
                        用户登录
                    </h2>
                    <Form
                        name="login"
                        className="login-form"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 20,offset:2 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '请输入账号' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />}  placeholder="账号" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 7, span: 16 }}>
                            <Radio.Group defaultValue="user">
                                <Radio.Button value="user">实习生</Radio.Button>
                                <Radio.Button value="admin">管理员</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ offset: 10}}
                        >
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}