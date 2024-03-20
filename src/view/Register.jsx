import React, { useState } from 'react';
import { register } from '../utils/apiRequests';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error('All fields are required!');
      return;
    }

    try {
      await register(name, email, password);
      toast.success('Registration successful')
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error.message);
      setError('Registration failed. Please try again.');
      toast.error('Registration failed. Please try again')
    }
  };

  return (
    <div className="small-container cart-page">

    <div>
      <h2>Register</h2>
      <p></p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
             <span>Already have an account? <Link to="/login">Login</Link></span>
          </div>
        <button className="btn btn-checkout" type="submit">Register</button>
        {error && <p>{error}</p>}
      </form>
    </div>
    </div>
  );
}

export default Register;
