import './Login.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { saveToken } from '../../Utils/auth';

const Login = () => {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [formData, setFormData] = useState({ 
        username:"", 
        password: "" 
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setMessage("");

        try{
            const response = await fetch(`${BASEURL}/api/token/`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if(response.ok){
                
                saveToken(data.access, data.refresh);
                setMessage("Login successful!");

                setTimeout(() => {
                    navigate("/");
                }, 1000);

            } else {
                setMessage(data.detail || "login failed. Please try again.");
            }
        } catch(error){
            console.error("Error during login", error);
            setMessage("An error occurred. Please try again later.");
        }
    };

    return (
        <div className='login-container'>
            <h2>Login</h2>

            <form onSubmit={handleSubmit} className='login-form'>
                <input 
                    type="text"
                    name="username"
                    placeholder='Username'
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="password"
                    name="password"
                    placeholder='Password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type='submit'>Login</button>

            </form>
            {message && <p className='message'>{message}</p>}

            <div className='register-link'>
                <p>Don't have an account? 
                    <Link to ="/register">Sign up</Link></p>
            </div>
        </div>
        
    );
};

export default Login;   