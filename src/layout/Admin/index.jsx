import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
const { Header, Sider, Content, Footer } = Layout;


function LayoutAdmin() {
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout className='h-screen'>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
                <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                    key: '1',
                    icon: <UserOutlined />,
                    label: <NavLink to={'/admin/'}>Dashboard</NavLink>,
                    },
                    {
                    key: '2',
                    icon: <VideoCameraOutlined />,
                    label: 'Auteurs',
                    },
                    {
                    key: '3',
                    icon: <UploadOutlined />,
                    label: <NavLink to={'/admin/post'}>Article</NavLink>,
                    },
                ]}
                />
            </Sider>
          <Layout>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
            >
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
              <Outlet />
            </Content>
            <Footer className="text-center viewport-bottom">DS-Blog ©2023 Created by
                <a href={'#'} target={'_blank'} rel={'noreferrer'}
                   className={'mx-1'}>DS L3 Students</a>
            </Footer>
          </Layout>
        </Layout>
      );
}

export default LayoutAdmin