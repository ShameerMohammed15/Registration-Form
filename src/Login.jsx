import React from 'react'
import { Button, Form, Input, } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { FacebookLoginButton } from 'react-social-login-buttons';
import Swal from "sweetalert2";
import './App.css';

const Login = () => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password")
    const navigate = useNavigate();

    const emailVerify = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!emailRegex.test(email) || !email.includes('gmail') || !email.includes('com')) {
            Swal.fire({
                title: "Invalid Email",
                text: "Please enter a valid email address.",
                icon: "error",
                showConfirmButton: true,
            });

        }
        return true;
    }

    const getItems = (values) => {
        const { email, password } = values;
        if (!emailVerify(email)) {
            Swal.fire({
                title: "Not a email",
                text: "please check the email",
                icon: "warning",
                showConfirmButton: true,
            });
            return;
        }

        if (email === storedEmail && password === storedPassword) {
            Swal.fire({
                title: "Successfully Login",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
            })
            navigate("/dashboard")
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Invalid email and password',
                icon: 'error',
                showConfirmButton: false,
                timer: 2000,
            })
        }

    }
    return (
        <div className='div' >
            <Form
                className='login-form'
                onFinish={getItems}
            >
                <div className='form-item'>
                    <h2>Login</h2>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input placeholder='Email' />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}

                    >
                        <Input.Password placeholder='Password' />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        <small className='small'>Or</small>
                        <Link to={"/"} className='link' >register now!</Link>
                        <a href='https://www.facebook.com/' rel='noreferrer' target="_blank">
                            <FacebookLoginButton className='facebook-btn' style={{ marginTop: "10px", height: "30px", fontSize: "14px" }} />
                        </a>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}

export default Login
