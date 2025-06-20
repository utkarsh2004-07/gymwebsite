// src/components/LoginForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, seterror] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/user/login', { email, password }, {
                withCredentials: true
            });

            // console.log(response.data.token)

            if (response.data.userId) {
                // Store the userId in localStorage
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('joindate', response.data.joindate);
                localStorage.setItem('token', response.data.token);
                alert('Login successful!');
                navigate('/')
            } else {
                seterror('Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login failed:');
            seterror("Login field")
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        {error && <p className="error">{error}</p>}
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-indigo-600 rounded shadow hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign In
                        </button>
                        <p className='text-center mt-1'>Dont have an account  <Link to={"/signup"}>Signup</Link>  </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
