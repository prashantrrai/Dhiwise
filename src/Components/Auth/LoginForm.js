import React, { useState } from 'react';
import './LoginForm.css';
import { Link, useNavigate } from 'react-router-dom';
import { Login } from '../../Services/Auth/Login';
import { useDispatch } from 'react-redux';
import { login } from '../../Slice/authSlice';
import { toast } from 'react-toastify';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await Login(formData);
            const token = response.token;
            localStorage.setItem('token', token);
            setFormData({
                username: '',
                password: ''
            });
            // alert('User logged in successfully');
            toast.success('Login successfull!');
            dispatch(login(token));
            navigate('/');
        } catch (error) {
            console.error('ERROR IN LoginForm', error);
            toast.error('Failed to login. Please check your credentials.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <p className="signup-link">
                    Not registered yet? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
