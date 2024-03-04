import React from 'react';
import { Button, Form, Input, } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { FacebookLoginButton } from "react-social-login-buttons";
import Swal from "sweetalert2";
import './App.css';

const Register = () => {
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
            return false;
        }
        return true;
    }

    const isStrongPassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return regex.test(password);
    };
    const setToLocal = (values) => {
        const { email, password } = values;

        if (!isStrongPassword(password)) {
            Swal.fire({
                title: "Weak Password",
                text: "use one uppercase,lowercase,min-8char and numbers",
                icon: "warning",
                showConfirmButton: true,
            })
            return;
        }
        if (!emailVerify(email)) {
            Swal.fire({
                title: "Not a email",
                text: "please check the email",
                icon: "warning",
                showConfirmButton: true,
            });
            return;
        }
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        Swal.fire({
            title: "Successfully Register",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
        })
        navigate("/login")
    }

    return (
        <div className='div'>
            <Form
                className='login-form'
                onFinish={setToLocal}
            >
                <div className='form-item'>
                    <h2>Register</h2>
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
                    <Form.Item
                        name="confirm"
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder='Confirm Password' />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Register
                        </Button>
                        <small className='small'>Or</small>
                        <Link to={"/login"} className='link'>Login</Link>
                        <a href='https://www.facebook.com/' rel='noreferrer' target="_blank" >
                            <FacebookLoginButton style={{ height: "30px", fontSize: "14px" }} />
                        </a>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}

export default Register;
