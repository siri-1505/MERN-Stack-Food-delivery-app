import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavigationBar.module.css';
import LogoutPage from '../pages/LogoutPage';
import Cart from './Cart';

export default function NavigationBar() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li className={`${styles.li} ${styles.left}`}>
          <Link to='/'>
            <img src='/Craving.jpg' alt='Logo' className={styles.img} />
          </Link>
        </li>
        <div className={styles.centerItems}>
        <li className={styles.li}>
            <Link to='/fooditems'>Home</Link>
          </li>
          <li className={styles.li}>
            <Link to='/fooditems/about'>About Us</Link>
          </li>
          <li className={styles.li}>
            <Link to='/fooditems/orders'>Orders</Link>
          </li>
          <li className={styles.li}>
            <Link to='/fooditems/contact'>Contact Us</Link>
          </li>
        </div>
        <div className={styles.rightItems}>
          <li className={styles.li}>
            <Cart></Cart>
          </li>
          <li>
            <LogoutPage></LogoutPage>
          </li>
        </div>
      </ul>
    </nav>
  );
}
