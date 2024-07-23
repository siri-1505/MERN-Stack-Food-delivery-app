import React, { useState } from 'react';
import ContactModal from '../components/ContactModal';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleContactSubmit(e) {
    e.preventDefault();
    try {
      const sentData = await fetch('http://localhost:8080/api/users/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, description })
      });
      if (!sentData.ok) {
        setMessage('error');
      } else {
        setMessage('success');
        setIsModalOpen(true);
      }
    } catch (err) {
      console.log(err);
    }
    setName('');
    setEmail('');
    setDescription('');
  }

  const styles = {
    container: {
      backgroundColor: 'black',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      
      padding: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      maxWidth: '400px',
      width: '100%',
    },
    label: {
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    input: {
      marginBottom: '10px',
      padding: '10px',
      borderRadius: '4px',
      border: 'none',
      outline: 'none',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
    },
    button: {
      padding: '10px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: 'green',
      color: 'white',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#e04e2b',
    }
  };

  return (
    <div style={styles.container}>
      <h1>Contact</h1>
      <form onSubmit={handleContactSubmit} style={styles.form}>
        <label style={styles.label}>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <label style={styles.label}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <label style={styles.label}>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={styles.input}
        />
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
        >
          Send
        </button>
      </form>
      {message === 'success' && isModalOpen && (
        <ContactModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
