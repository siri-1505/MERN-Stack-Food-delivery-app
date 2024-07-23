import React, { useState, useEffect, useCallback } from 'react';
import styles from './CheckOutModal.module.css';
import OrdersModal from './OrdersModal';
import { useNavigate } from 'react-router-dom';

export default function CheckOutModal({ cartItems, totalPrice }) {
  const navigate = useNavigate();
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address1: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    cardName: '',
    cardNumber: '',
    cardExp: '',
    cardCVV: '',
    billingAddress: ''
  });
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(step)) {
      alert('Please fill out all required fields.');
      return;
    }

    const orderData = {
      ...formData,
      orderItems: cartItems,
      totalPrice
    };
    console.log(orderData);

    const accessToken = localStorage.getItem('accessToken'); // Get the access token from localStorage

    try {
      const response = await fetch('http://localhost:8080/api/users/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}` // Include the access token in the Authorization header
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        if (response.status === 401) {
          navigate('/login'); // Redirect to login if unauthorized
          throw new Error('Unauthorized access. Please log in.');
        }
        throw new Error('Something went wrong');
      }

      setMessage('success');
      setIsModalOpen(true);
    } catch (err) {
      console.error('Error:', err);
      alert("Invalid data format entered")
      setMessage('An error occurred during checkout. Please try again.');
    }
  };

  const validateStep = useCallback((step) => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.phone;
      case 2:
        return formData.address1 && formData.city && formData.state && formData.zip && formData.country;
      case 3:
        return formData.cardName && formData.cardNumber && formData.cardExp && formData.cardCVV;
      default:
        return false;
    }
  }, [formData]);

  useEffect(() => {
    setIsNextEnabled(validateStep(step));
  }, [formData, step, validateStep]);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Checkout</h2>

        {step === 1 && (
          <>
            <h3>Personal Information</h3>
            <div className={styles.formGroup}>
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>Phone:</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <button type="button" onClick={handleNext} className={styles.submitButton} disabled={!isNextEnabled}>Next</button>
          </>
        )}

        {step === 2 && (
          <>
            <h3>Shipping Information</h3>
            <div className={styles.formGroup}>
              <label>Address Line 1:</label>
              <input type="text" name="address1" value={formData.address1} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>City:</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>State/Province/Region:</label>
              <input type="text" name="state" value={formData.state} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>Zip/Postal Code:</label>
              <input type="text" name="zip" value={formData.zip} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>Country:</label>
              <input type="text" name="country" value={formData.country} onChange={handleChange} required />
            </div>
            <button type="button" onClick={handlePrev} className={styles.submitButton}>Previous</button>
            <button type="button" onClick={handleNext} className={styles.submitButton} disabled={!isNextEnabled}>Next</button>
          </>
        )}

        {step === 3 && (
          <>
            <h3>Payment Information</h3>
            <div className={styles.formGroup}>
              <label>Cardholder's Name:</label>
              <input type="text" name="cardName" value={formData.cardName} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>Card Number:</label>
              <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>Expiration Date:</label>
              <input type="text" name="cardExp" value={formData.cardExp} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>CVV:</label>
              <input type="text" name="cardCVV" value={formData.cardCVV} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>Billing Address:</label>
              <input type="text" name="billingAddress" value={formData.billingAddress} onChange={handleChange} />
            </div>
            <button type="button" onClick={handlePrev} className={styles.submitButton}>Previous</button>
            <button type="submit" className={styles.submitButton} disabled={!isNextEnabled}>Confirm Order</button>
          </>
        )}

        {message === 'success' && isModalOpen && <OrdersModal onClose={() => setIsModalOpen(false)} />}
      </form>
    </div>
  );
}
