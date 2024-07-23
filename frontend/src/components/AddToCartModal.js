// Modal.js
import React from 'react';
import styles from './AddToCartModal.module.css';

const Modal = ({ message, onClose }) => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
