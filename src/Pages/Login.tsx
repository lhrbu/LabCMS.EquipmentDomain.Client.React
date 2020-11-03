import React from 'react';
import { Button, Form, Input } from 'antd';
import sha256 from 'crypto-js/sha256';

const Login:React.FC<{OnLogin?:(()=>void)}> = ({OnLogin})=>
{
    return (
        <Form
            labelCol={{span:8}}
            wrapperCol={{span:16}}
            onFinish={ValidateLogin}
            >
                <Form.Item
                    label="User"
                    name = "User"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                    <Input />
                </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                wrapperCol={{offset:8,span:16}}
                >
                <Button type="primary" htmlType="submit">
                    Login
                </Button>    
            </Form.Item>
        </Form>
    );

    function ValidateLogin(values:any)
    {
        const sha256User = sha256(values.User).toString();
        const sha256Password = sha256(values.Password).toString();
        if(sha256User!=="55db364a5348163e021144ba0090590933fcfaec6058599e8e9850ce7aab1ca0" ||
            sha256Password !=="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855")
        {
            window.alert("Wrong login information!");
        }else{
            OnLogin?.();
            window.alert("Login Successful!");
        }
    }
}

export default Login;