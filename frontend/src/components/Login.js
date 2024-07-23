import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import axios from 'axios';

export default function Login() {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", {
        email: credentials.email,
        password: credentials.password
      });
      const json = response.data;
      if (json.Login) {
        localStorage.setItem('userEmail', credentials.email);
        localStorage.setItem('accessToken', json.accessToken);
        localStorage.setItem('refreshToken', json.refreshToken);
        setMessage('Login Successful');
        navigate("/fooditems");
      } else {
        setError(json.message);
        setMessage(json.message);
        alert("Enter Valid Credentials");
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during login. Please try again.');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/LoginImage.jpg)` }}>
      <div className={styles.overlay}></div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Login</h2>
        <h3 className={styles.subheading}>Email</h3>
        <input
          type='text'
          name="email"
          className={styles.input}
          value={credentials.email}
          onChange={onChange}
          placeholder='Enter your email'
        />
        <h3 className={styles.subheading}>Password</h3>
        <input
          type='password'
          name="password"
          className={styles.input}
          value={credentials.password}
          onChange={onChange}
          placeholder='Enter your password'
        />
        {error && <p className={styles.error}>{error}</p>}
        {message && <p className={styles.message}>{message}</p>}
        <p className={styles.text}>
          Don't have an account? <Link to='/register' className={styles.link}>Register</Link>
        </p>
        <button className={styles.button} type='submit'>Login</button>
      </form>
    </div>
  );
}
