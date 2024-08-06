import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import * as accountService from "../../../../services/accountService";
import "./index.css"
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../reducer';

export default function Registration() {
  const [user, setUser] = useState<any>({});
  const [reenterPassword, setReenterPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async () => {
    setErrorMessage('');
    setIsLoading(true);

    // Basic validation
    if (!user.name || !user.password || !reenterPassword) {
      setErrorMessage('All fields are required');
      setIsLoading(false);
      return;
    }
    if (user.password !== reenterPassword) {
      setErrorMessage('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const currentUser = await accountService.signup(user);

      dispatch(setCurrentUser(currentUser));

      navigate('/profile');
    } catch (err: any) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setErrorMessage('Registration failed. Please try again.');
      } else if (err.request) {
        // The request was made but no response was received
        setErrorMessage('No response from server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage('An unexpected error occurred. Please try again later.');
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
            {errorMessage && (
              <div className="error-message">
                {errorMessage}
              </div>
            )}
            <form onSubmit={handleRegister}>
              <input
                id="name"
                type="name"
                placeholder="Name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value, role: "VIEWER", join_date: new Date().toISOString() })}
                className="registration-form-input"
                required
              />
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
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