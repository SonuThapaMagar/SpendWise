import React from 'react'
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import Logo from "/src/assets/logo.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/');
    };

    const onFinish = async (values) => {
        try {
            // Check if the email already exists
            const response = await axios.get("http://localhost:4000/users", {
                params: {
                    email: values.email
                }
            })

            if (response.data.length > 0) {
                message.error("Email already exists");
                return;
            }

            //saving the new user to JSON Server
            await axios.post("http://localhost:4000/users", {
                username: values.username,
                email: values.email,
                password: values.password,
            })

            message.success("Signup successful! Please login.");
            navigate('/login');
        } catch (error) {
            message.error("An error occurred. Please try again.");

        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100 p-4'>
            <div className='w-full max-w-sm bg-white shadow-lg rounded-lg p-6'>
                <img src={Logo} alt="Logo" className="mx-auto w-24 h-24 rounded-full" />
                <h2 className="text-2xl font-semibold text-center mb-4 text-blue-500">Sign Up</h2>
                <Form
                    name="login"
                    initialValues={{
                        remember: true,
                    }}
                    style={{
                        maxWidth: 360,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email" />
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
                        <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Sign Up
                        </Button>
                        <p className="text-center mt-4">
                            Already have an account?
                            <span onClick={handleLoginClick} className="text-blue-500 ml-1 cursor-pointer">
                                Login now!
                            </span>
                        </p>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default SignUp
