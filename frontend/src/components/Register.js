import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css'; 
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate=useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            });
            console.log(response);
            const data = await response.json();
            if (!response.ok) {
                setError(data.message || 'Registration failed.');
            } else {
                localStorage.setItem('userEmail', email);
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                setMessage('Signup successful');
                navigate('/fooditems')
                console.log('Signup successful', data);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to fetch. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className={styles.container} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/SignupImage.jpg)` }}>
            <div className={styles.overlay}></div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1 className={styles.heading}>Signup</h1>
                <h2 className={styles.subheading}>Name</h2>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} className={styles.input} placeholder='Enter your name'/>
                <h2 className={styles.subheading}>Email</h2>
                <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} placeholder='Enter your email'/>
                <h2 className={styles.subheading}>Password</h2>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} placeholder='Enter your password'/>
                {error && <p className={styles.error}>{error}</p>}
                {message && <p className={styles.message}>{message}</p>}
                <p className={styles.text}>Have an account? <Link to='/login' className={styles.link}>Login</Link></p>
                <button type='submit' disabled={isSubmitting} className={styles.button}>Signup</button>
            </form>
        </div>
    );
}
