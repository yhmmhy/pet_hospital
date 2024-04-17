import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  PayCircleOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Dropdown, message } from 'antd';
import logo from '../assets/1.ico'
import '../index.css'
import { useNavigate } from 'react-router-dom';
import Login from '../pages/login'
import cookie from 'react-cookies'
import axios from 'axios'
import App2 from '../App2.tsx'

axios.defaults.baseURL = 'http://47.102.142.153:5000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const { Header, Sider, Content } = Layout;

const MyLayout = ({ children }: any) => {


  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  if (cookie.load('token') == null) {
    message.error('登录后才能访问哦')
    return <Login />
  }
  if(cookie.load('role')=='实习生'){
    message.error('权限不足，请登录管理员账号后尝试');
    return <App2/>
  }
  return (
    <Layout style={{ width: '100vw', height: '100vh' }}
      id='layout'
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img src={logo} alt="用户" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          onClick={({ key }) => {
            navigate(key);
          }}
          items={[
            {
              key: '/index/',
              icon: <HomeOutlined />,
              label: '首页',
            },
            {
              key: '/index/user',
              icon: <UserOutlined />,
              label: '用户管理',
            },
            {
              key: '/index/charge',
              icon: <PayCircleOutlined />,
              label: '收费管理',
            },
            {
              key: '/index/case',
              icon: <VideoCameraOutlined />,
              label: '病例管理',
            },
            {
              key: '/index/pool',
              icon: <UploadOutlined />,
              label: '题库管理',
            },
            {
              key: '/index/examination',
              icon: <UploadOutlined />,
              label: '试卷管理',
            },
            {
              key: '/index/room',
              icon: <UnorderedListOutlined />,
              label: '科室管理',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <span className='app-title'>虚拟宠物医院后台管理系统</span>
          <Button style={{
            float: 'right',
            marginTop: '16px',
            marginRight: '50px',
          }} onClick={() => {
            axios.post('/user/logout').then(res => {
              if (res.data.code == 200) {
                cookie.remove('token', { path: '/' })
                cookie.remove('username', { path: '/' })
                cookie.remove('role', { path: '/' })
                navigate('/');
              }
            }, error => {
              console.log('错误', error.message)
            })

          }}>
            退出登录
          </Button>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyLayout;