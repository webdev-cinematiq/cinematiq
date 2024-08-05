import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://our-server-url/api/login', { email, password });
      const { token } = response.data;

      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }

      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="row">
      <div className="col">
        <p className="register-text">
          New to Cinematiq?
          <Link to="/Registration" className="btn btn-register">Register</Link>
        </p>
        <div className="left-container">
          <div className="login-form">
            <div className="avatar-icon">
              <FaUserCircle size={150} />
            </div>
            <h2>Login to your account</h2>
            <p>Enter your details to login</p>
            <form onSubmit={handleLogin}>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
              <div className="form-footer">
                <div className="remember-me-container">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="checkbox-input"
                  />
                  <label htmlFor="rememberMe" className="checkbox-label">
                    Remember Me?
                  </label>
                </div>
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>
              <button type="submit" className="btn btn-submit-login">Login</button>
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