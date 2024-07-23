import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';
import styles from './Cartmodal.module.css';
import { addToCart, clearCart, removeItem } from '../Redux/CartSlice';
import { Link } from 'react-router-dom';

function CartModal({ onClose }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = cart.items.reduce((total, item) => {
    const itemPrice = Number(item.price);
    const itemTotal = item.quantity * itemPrice;
    return total + itemTotal;
  }, 0);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.h2}>Cart Items</h2>
        <ul className={styles.ul}>
          {cart.items.map((item, index) => (
            <li key={index} className={styles.li}>
              <p>{item.name}</p>
              <span>${Number(item.price).toFixed(2)}</span>
              <div className={styles.quantityContainer}>
                <button onClick={() => handleAddToCart(item)} className={styles.addbutton}>+</button>
                <span className={styles.quantity}>{item.quantity}</span>
                <button onClick={() => handleRemoveItem(item)} className={styles.addbutton}>-</button>
              </div>
            </li>
          ))}
        </ul>
        <p className={styles.totalPrice}>
          {totalPrice ? `Total Price: $${totalPrice.toFixed(2)}` : 'Your Cart is empty'}
        </p>
        <div className={styles.buttonContainer}>
          {cart.items.length > 0 && <button onClick={handleClearCart}>Clear All</button>}
          {cart.items.length > 0 && <Link to="/fooditems/checkout" className={styles.link} onClick={onClose}>Checkout</Link>}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>,
    document.getElementById('cart-root')
  );
}

export default CartModal;
