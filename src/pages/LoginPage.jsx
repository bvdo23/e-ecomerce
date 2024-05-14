import React, { useState } from 'react';
import Header from '../components/Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const userData = {
            username: username,
            password: password
        };
        try {

            const response = await axios.post('http://localhost:3000/api/users/login', userData);
            console.log('Login successful');
            console.log('Token:', response.data.token);
            navigate('/')

        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <Header />
            <div style={{
                height: "30%",
                width: "20%",
                borderRadius: "2%",
                marginLeft: "20%",
                marginTop: "10%"
            }}>
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Tên đăng nhập</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Tên đăng nhập..."
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} // Lưu giá trị người dùng nhập vào state username
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Lưu giá trị người dùng nhập vào state password
                        />
                    </Form.Group>
                    <Button variant="outline-primary" type="submit">
                        Đăng nhập
                    </Button>
                    <a style={{ paddingLeft: "10px" }} href='/register'>Chưa có tài khoản?..</a>
                </Form>
            </div>
        </div>
    );
}

export default LoginPage;
