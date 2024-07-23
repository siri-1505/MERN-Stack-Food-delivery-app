// src/components/Footer.js
import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        <div className={styles.links}>
          <Link to="/about" className={styles.link}>About Us</Link>
          <Link to="/contact" className={styles.link}>Contact</Link>
          <Link to="/privacy" className={styles.link}>Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
