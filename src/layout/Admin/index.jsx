import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import localstorageService, { UTILS_APP } from '../../services/localstorageService';
const { Header, Sider, Content, Footer } = Layout;


function LayoutAdmin() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()    
    const [user, setUser] = useState(null)

    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    
    useEffect(() => {
      const user = localstorageService.get(UTILS_APP.USER)
      if(!user){
          navigate('/login')
      }
      setUser(user)
  }, []);

    return (
        <Layout className='min-h-screen'>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
                <Menu
                theme="dark"
                mode="inline"
                // defaultSelectedKeys={['1']}
                items={[
                    {
                    key: '1',
                    icon: <VideoCameraOutlined />,
                    label: <NavLink to={'/admin/'}>Dashboard</NavLink>,
                    },
                    {
                    key: '2',
                    icon: <UserOutlined />,
                    label: <NavLink to={'/admin/editor'}>Editeurs</NavLink>,
                    },
                    {
                    key: '3',
                    icon: <UploadOutlined />,
                    label: <NavLink to={'/admin/post'}>Articles</NavLink>,
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
              className={'flex justify-between'}
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
              <Button
                type='text'
                icon={<LogoutOutlined className="text-danger"/>}
                onClick={() => {
                  localstorageService.clear(UTILS_APP.USER);
                  localstorageService.clear(UTILS_APP.TOKEN);
                  navigate("/login");
                }}
                className={'text-red-600 mt-6'}
              > 
                Se déconnecter
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