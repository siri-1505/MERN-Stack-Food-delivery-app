import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './DisplayProducts.module.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/CartSlice';
import Modal from './AddToCartModal'

export default function DisplayProducts() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchItems = async () => {
      const accessToken = localStorage.getItem('accessToken'); // Get the token from localStorage
      console.log('AccessToken:', accessToken);

      try {
        const response = await axios.get('http://localhost:8080/api/users/fooditems', {
          headers: {
            'Authorization': `Bearer ${accessToken}` // Include the token in the headers
          }
        });
        setItems(response.data);
      } catch (err) {
        console.error('Error fetching items:', err);
        setError('Error fetching items');
      }
    };

    fetchItems();
  }, []);

  const handleAddToCart = (item) => {
    const quantity = 1;
    dispatch(addToCart({
      name: item.title,
      price: item.price,
      restaurant: item.restaurantChain,
      quantity: quantity
    }));

    setModalMessage(`${item.title} added to cart`);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 3000); // Auto-close modal after 3 seconds
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <ul className={styles.ul}>
        {items && items.map((item) => (
          <li key={item.id} className={styles.li}>
            <div className={styles.card}>
              <div className={styles.cardContent}>
                <img src={item.image} alt={item.title} className={styles.img} />
                <div className={styles.info}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.restaurant}>Restaurant: {item.restaurantChain}</p>
                  <p className={styles.price}>Price: ${item.price}</p>
                  <div className={styles.add}>
                    <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {showModal && <Modal message={modalMessage} onClose={handleCloseModal} />}
    </div>
  );
}
