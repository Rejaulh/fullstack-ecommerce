import './SignUp.css';
import { useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
// import { saveTokenToken } from '../../Utils/auth';

const SignUp = () => {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [formData, setFormData] = useState({ username:"", email:"", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await fetch(`${BASEURL}/api/register/`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(formData),
            });
            if(response.ok){
                const data = await response.json();
                // saveTokenToken(data.access);
                setMessage("Registration successful!");
                setTimeout(() => {
                    navigate("/login");
                }, 1200);
            } else {
                setMessage(data.username || data.password || JSON.stringify(data));
            }
        } catch(error){
            console.error("Error during registration", error);
            setMessage("An error occurred. Please try again later.");
        }
    }

    return (
        <div className='signup_container'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className='signup_form'>
                <input 
                    type="text"
                    name="username"
                    placeholder='Username'
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="email"
                    name="email"
                    placeholder='Email'
                    value={formData.email}
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
                <input 
                    type="password"
                    name="confirm_password"
                    placeholder='Confirm Password'
                    value={formData.confirm_password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Register</button>
            </form>
            {message && <p className='message'>{message}</p>}
             <div className='login-link'>
                <p>Already have an account? 
                    <a href="/login">Login</a></p>
            </div>  
        </div>
    );
}

export default SignUp
