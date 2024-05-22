import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginBackground from '../assets/Screenshot 2024-05-19 at 2.50.08 AM.png'
import '../css/styles.css'

function ImageBanner({ src, alt }) {
    return <img loading="lazy" src={src} alt={alt} className="image-css h-60px object-cover absolute inset-0 size-full" />;
}

function SignInForm({ setToken }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [rePass, setRePass] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!name || !email || !password ) {
            alert('All fields are required');
            return;
        }
        if (!email.includes('@')) {
            alert('Email must have "@"');
            return;
        }
        if (password.length < 6 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[!@#$%^&*()_]/.test(password)) {
            alert('Password must be at least 6 characters long and include both lower and uppercase letters and symbols');
            return;
        }
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = { email, password, name, appType: "music" };
        try {
            const response = await fetch('https://academics.newtonschool.co/api/v1/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'projectID': 'f104bi07c490',
                    'accept': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
            const datas = await response.json();
            if (datas.status === "fail") {
                alert("email already exists.")
            } else {
                setToken(datas.token)
                navigate('/signin')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="signinPage">
            <div className="imageOfLoginPage">
                <img className="imgJ" src={loginBackground} alt="Login Background" />
            </div>
            <div className="contentOfsigninpage">
                <h1>Sign Up</h1>
                <p>Get a personalized experience and access all your music</p>

                <div className="inputField">
                    <input
                        type="text"
                        placeholder="Enter Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                </div>
                <div className="login">
                    <button onClick={handleSubmit}>Sign Up</button>
                </div>
                <div className="dontHaveAccount">
                    <p>
                        Already have an account? <span onClick={() => navigate('/signin')}>Log In</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

function SignIn({ setToken }) {
    return (
        <div className="loginPage">
            <SignInForm setToken={setToken} />
        </div>
    );
}

export default SignIn;
