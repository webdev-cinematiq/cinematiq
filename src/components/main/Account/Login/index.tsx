import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import * as accountService from "../../../../services/accountService";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";

export default function Login() {
  const [credentials, setCredentials] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const currentUser = await accountService.signin(credentials);

      dispatch(setCurrentUser(currentUser));

      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      if (error instanceof Error) {
        setErrorMessage('Login failed. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
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
            {errorMessage && (
              <div className="error-message">
                {errorMessage}
              </div>
            )}
            <form onSubmit={handleLogin}>
              <input
                id="userName"
                type="username"
                placeholder="User Name"
                value={credentials.name}
                onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
                className="form-input"
                required
              />
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="form-input"
                required
              />
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