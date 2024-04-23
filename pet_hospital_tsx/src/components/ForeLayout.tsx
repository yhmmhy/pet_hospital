import React, { useState, useRef, Suspense } from 'react';
import { Layout, Menu, theme, FloatButton, message } from 'antd';
import { Button, Tour } from 'antd';
import type { TourProps } from 'antd';
import {
  UserOutlined,
  HomeOutlined,
  ReadOutlined,
  CompassOutlined,
  SolutionOutlined,
  QuestionCircleOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import Login from '../pages/login'
import cookie from 'react-cookies'

const Assist = React.lazy(() => import('../pages/assist'));

const { Header, Content, Footer } = Layout;
  // @ts-ignore
function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
const id = randomString(12, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
const ForeLayout = ({ children }: any) => {
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const [tourOpen, setTourOpen] = useState<boolean>(false);
  const steps: TourProps['steps'] = [
    {
      title: '功能菜单栏',
      description: '包括医院导览，角色扮演，病例学习和测试功能，可以学习宠物医生相关知识',
        // @ts-ignore
      target: () => ref1.current.menu.list,
    },
    {
      title: '智能助教',
      description: '智能助教功能，可以根据本虚拟宠物医院学习系统内的数据回答您的问题',
      target: () => ref2.current,
    },
    {
      title: '退出登录',
      description: '登出当前用户',
      target: () => ref3.current,
    },
    {
      title: '功能导航',
      description: '想要再次浏览页面功能导航，可以点击此按钮',
      target: () => ref4.current,
    },
  ];
  const showDrawer = () => {
    setOpen(true);
  };

  const {
    token: {  borderRadiusLG },
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
          selectedKeys={[location.pathname]}
          ref={ref1}
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
        <Button ref={ref3} style={{
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
        <FloatButton.Group shape="circle" style={{ right: 24 }}>
          <FloatButton icon={<QuestionCircleOutlined />} type="primary" onClick={showDrawer} ref={ref2} />
          <FloatButton icon={<FileTextOutlined />} onClick={() => { setTourOpen(true) }} ref={ref4} />
        </FloatButton.Group>
        <Suspense fallback={<div>Loading...</div>}>
          <Assist open={open} setOpen={setOpen} id={id} />
        </Suspense>

        <Tour open={tourOpen} onClose={() => setTourOpen(false)} steps={steps} />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        ECNU SEI ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default ForeLayout;

