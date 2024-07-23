import React from 'react';
import styles from './Home.module.css';
import { Link, useLocation } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

export default function Home() {
  const location = useLocation();
  const showLoginForm = location.pathname === '/login';
  const showRegisterForm = location.pathname === '/register';

  return (
    <div className={styles.container}>
      <img src='./FoodList.jpg' alt='background' className={styles.backgroundImage} />
      
      <div className={styles.cravings}>
        <h1 className={styles.h1}>Craving!!</h1>
        {location.pathname === '/' && <h2 className={styles.orderNow}>Order Now &#x2193;</h2>}
        {showLoginForm && <h2 className={styles.orderNow}>Login Now &#x2193;</h2>}
        {showRegisterForm && <h2 className={styles.orderNow}>Register Now &#x2193;</h2>}
      </div>

      {location.pathname === '/' && (
        <div className={styles.back}>
          <span>
            <Link to='/login' className={styles.noUnderline}>View Recipes</Link>
          </span>
        </div>
      )}

      {showLoginForm && <Login />}
      {showRegisterForm && <Register />}
    </div>
  );
}
