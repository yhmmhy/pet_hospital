import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Dropdown } from 'antd';
import logo from '../assets/1.ico'
import '../index.css'
import { useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

const MyLayout = ({children}: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate =useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  return (
    <Layout style={{width: '100vw',height: '100vh'}}
            id='layout'
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img src={logo} alt="用户" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          onClick={({key})=>{
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
          <Dropdown overlay={<Menu items={
            [{
                label:'个人中心',
                key:'userCenter',
            },{
              label:'退出',
              key:'exit',
          },]
          } onClick={({key})=>{
            if(key==='exit'){
              navigate('/');
            }
          }}/>}>
            <img src={logo} style={{
              width:'30px',
              borderRadius:'50%',
              float:'right',
              marginTop:'16px',
              marginRight:'20px',
            }} />
          </Dropdown>
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