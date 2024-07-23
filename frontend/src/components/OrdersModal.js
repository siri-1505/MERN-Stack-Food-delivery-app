import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../Redux/CartSlice';
import ReactDOM from 'react-dom';
import styles from './OrdersModal.module.css';

export default function Orders({ onClose }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOkayClick = () => {
        dispatch(clearCart());
        onClose(); 
        navigate('/fooditems'); 
    };

    return ReactDOM.createPortal(
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <div className={styles.heading}>Order placed successfully</div>
                <Link to='/fooditems' onClick={handleOkayClick} className={styles.button}>Okay</Link>
            </div>
        </div>,
        document.getElementById('success')
    );
}
