import './SignUp.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const SignUp = () => {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [formData, setFormData] = useState({ 
        username:"", 
        email:"", 
        password: "" ,
        password2: ""
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setMessage("");

        //  client-side validation
        if (formData.password !== formData.password2) {
            setMessage("Passwords do not match");
            return;
        }

        try{
            const response = await fetch(`${BASEURL}/api/register/`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if(response.ok){
                setMessage("Registration successful!");

                setTimeout(() => {
                    navigate("/login");
                }, 1200);

            } else {
                setMessage(
                    data.username?.[0] ||
                    data.email?.[0] ||
                    data.password?.[0] ||
                    "Registration failed");
                   
            }
        } catch(error){
            console.error("Error during registration", error);
            setMessage("Server error. Please try again later.");
        }
    };

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
                    name="password2"
                    placeholder='Confirm Password'
                    value={formData.password2}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Register</button>
            </form>
            {message && <p className='message'>{message}</p>}
             <div className='login-link'>
                <p>Already have an account? 
                    <Link to="/login">Login</Link></p>
            </div>  
        </div>
    );
};

export default SignUp
