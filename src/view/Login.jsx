import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../utils/apiRequests';
import { useNavigate } from "react-router-dom";
import { setUser } from '../features/auth/authSlice';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('All fields are required!');
      return;
    }

    try {
      const userData = await login(email, password);
      console.log(userData.user.id, userData.token);
      dispatch(setUser({ userId: userData.user.id, userToken: userData.token }));
      localStorage.setItem('userId', userData.user.id);
      localStorage.setItem('userToken', userData.token);
      const returnTo = navigate(-1)?.state?.returnTo || '/';
      navigate(returnTo);
    } catch (error) {
      console.error('Login error:', error.message);
      setError('Invalid credentials');
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="small-container cart-page">
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
             <span>Click here to <Link to="/register">Register</Link></span>
          </div>
          <button className="btn btn-checkout" type="submit">Login</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
