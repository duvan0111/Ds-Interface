import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import authService from '../../services/authService';
import notificationService from '../../services/notificationService';
import { useNavigate } from 'react-router-dom';
import localstorageService, { UTILS_APP } from '../../services/localstorageService';


const Login = () => {
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()  

  const onFinish = (values) => {
    setLoader(true);

    authService.login(values)
    .then((res) => {
        console.log(res)
        const { data } = res;
        
        localstorageService.set(UTILS_APP.TOKEN, data.token);
        localstorageService.set(UTILS_APP.USER, data.userId);
        
        navigate('/admin')
    })
    .catch((err) => {
        try {
            notificationService.notifyError(err.response.data.message);
        } catch (error) {
            notificationService.notifyError("Une erreur s'est produite");
        }
    })
    .finally(() => {
        setLoader(false);
    });
  };

  return (
    <>
        <div className='flex justify-center items-center h-screen'>
            <div>
                <Form
                    name="normal_login"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ minWidth: 600}}
                    className="login-form "
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                            type: 'email'
                        },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                        ]}
                    >
                        <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        // type="password"
                        placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                        Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            className="login-form-button bg-sky-600" 
                            loading={loader}>
                            Log in
                        </Button>
                        {/* Or <a href="">register now!</a> */}
                    </Form.Item>
                </Form>
            </div>
        </div>
    </>
  );
};
export default Login;