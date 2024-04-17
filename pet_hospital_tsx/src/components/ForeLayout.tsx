import React, { Children, useState } from 'react';
import { Breadcrumb, Layout, Menu, theme, Button, FloatButton, Modal, message } from 'antd';
import {
  UserOutlined,
  HomeOutlined,
  ReadOutlined,
  CompassOutlined,
  SolutionOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Login from '../pages/login'
import cookie from 'react-cookies'
import Assist from '../pages/assist';


const { Header, Content, Footer } = Layout;
function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
const id = randomString(12, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
const ForeLayout = ({ children }: any) => {

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate()
  const menuClick = (e: { key: string }) => {
    navigate(e.key)
  }
  if (!cookie.load('token')) {
    message.error('登录后才能访问哦')
    return <Login />

  }

  return (
    <Layout style={{ width: '100vw', height: '100vh' }}
      id='layout'>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}

      >
        <h1 style={{ color: 'white', fontSize: '20px', marginRight: '20px' }}>
          虚拟宠物医院学习系统
        </h1>
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={menuClick}
          items={[
            {
              key: '/fore/',
              icon: <HomeOutlined />,
              label: '首页',
            },
            {
              key: '/fore/BasicTable',
              icon: <CompassOutlined />,
              label: '医院导览',
            },
            {
              key: '/fore/roleplay',
              icon: <UserOutlined />,
              label: '角色扮演',
            },
            {
              key: '/fore/caselearn',
              icon: <ReadOutlined />,
              label: '病例学习',
            },
            {
              key: '/fore/examination',
              icon: <SolutionOutlined />,
              label: '测试',
            },
          ]}
          style={{ flex: 1, minWidth: 0 }}
        />
        <Button style={{
          float: 'right',
        }} onClick={() => {
          console.log(cookie.load('token'))
          cookie.remove('token', { path: '/' })
          cookie.remove('username', { path: '/' })
          cookie.remove('role', { path: '/' })
          navigate('/');
        }}>
          退出登录
        </Button>
      </Header>
      <Content style={{
        margin: '24px 48px',
        minHeight: 750,
        // background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}>
        {children}
        <FloatButton icon={<QuestionCircleOutlined />} type="primary" onClick={showDrawer} />
        <Assist open={open} setOpen={setOpen}id ={id} />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        ECNU SEI ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default ForeLayout;

