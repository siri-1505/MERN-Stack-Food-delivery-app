import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import CartModal from './CartModal';
import styles from './Cart.module.css';

export default function Cart() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const len = cart.items.length;

  const handleCartClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Link to="#" onClick={handleCartClick} className={styles.link}>
        
        Cart
        <FaShoppingCart />
        {len !== 0 && <span className={styles.count}>{len}</span>}
      </Link>
      {isModalOpen && <CartModal onClose={handleCloseModal} />}
    </div>
  );
}
