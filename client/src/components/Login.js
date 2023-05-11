import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

// This component handles our login form and has a link to the register form
//({ latitude, longitude }) 
const Login = ({ handleLogin, handleChange, formData }) => {
  return (
    <div>
      <h2>Log In</h2>
      <hr />
      <form onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }} >
        <input name="username" type="text" value={formData.username} onChange={handleChange} />
        <input name="password" type="password" value={formData.password} onChange={handleChange} />
        <button className="content-button">Log In</button>
        <Link to="/register">  or Register </Link>
      </form>
    </div>
  );
}

export default Login;