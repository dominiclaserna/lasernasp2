import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './LoginForm.css';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Login successful!'); // Display success notification
                localStorage.setItem('loggedInUserEmail', formData.email);
                
                
                navigate('/bills');
                window.location.reload();
            } else {
                toast.error('Incorrect email or password!'); // Display error notification
            }
        } catch (error) {
            console.error('Server error:', error);
        }
    };
    
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
