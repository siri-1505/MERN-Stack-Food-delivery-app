import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#1c1c1c',
    color: '#ffffff',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
  },
  homeLink: {
    fontSize: '1.25rem',
    color: '#ff6600',
    textDecoration: 'none',
    border: '2px solid #ff6600',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  homeLinkHover: {
    backgroundColor: '#ff6600',
    color: '#1c1c1c',
  },
};

const ErrorPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>403 - Unauthorized Access</h1>
      <p style={styles.message}>You do not have permission to view this page.</p>
      <Link
        to="/"
        style={styles.homeLink}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = styles.homeLinkHover.backgroundColor;
          e.target.style.color = styles.homeLinkHover.color;
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '';
          e.target.style.color = styles.homeLink.color;
        }}
      >
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
