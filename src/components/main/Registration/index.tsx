import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import "./Registration.css"

export default function Registration() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!fullName || !email || !password || !reenterPassword) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }
    if (password !== reenterPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/register', {
        fullName,
        email,
        password
      });

      navigate('/');
    } catch (err: any) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(err.response.data.message || 'Registration failed. Please try again.');
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="row">
      <div className="col"> 
        <p className="login-text">
          Already a User?
          <Link to="/login" className="btn btn-login-link">Login</Link>
        </p>
        <div className="left-container">
          <div className="register-form">
            <div className="avatar-icon">
              <FaUserCircle size={150} />
            </div>
            <h2>Create a New Account</h2>
            <p>Enter your details to Register</p>
            <form onSubmit={handleRegister}>
              <input
                id="full-name"
                type="name"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="registration-form-input"
                required
              />
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="registration-form-input"
                required
              />
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="registration-form-input"
                required
              />
              <input
                id="reenter-password"
                type="password"
                placeholder="Reenter Password"
                value={reenterPassword}
                onChange={(e) => setReenterPassword(e.target.value)}
                className="registration-form-input"
                required
              />
              <button type="submit" className="btn btn-submit-register" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="right-container">
          <div className="poster-container">
            <img src="/images/movie_collage.jpg" alt="Cinematiq" className="logo" />
          </div>
        </div>
      </div>
    </div >
  );
}