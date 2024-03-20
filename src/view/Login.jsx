import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../utils/apiRequests';
import { useNavigate } from "react-router-dom";
import { setUser } from '../features/auth/authSlice';
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
