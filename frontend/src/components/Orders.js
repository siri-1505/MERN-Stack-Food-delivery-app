import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Orders.module.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrders() {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:8080/api/users/orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setOrders(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          navigate('/login');
        } else {
          console.error('Error fetching orders:', err);
        }
      }
    }
    fetchOrders();
  }, [navigate]);

  return (
    <div className={styles.ordersContainer}>
      <h2 className={styles.title}>Your Orders</h2>
      <ul className={styles.orderList}>
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order, index) => (
            <li key={order._id} className={styles.orderItem}>
              <div className={styles.orderDetails}>
                <h3>Order {index + 1}</h3>
                <p><strong>Shipping Address:</strong> {order.address1}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className={styles.orderItems}>
                <h4>Items:</h4>
                <ul className={styles.itemList}>
                  {order.orderItems.map((item, itemIndex) => (
                    <li key={itemIndex} className={styles.item}>
                      <span className={styles.itemName}>{item.name}</span>
                      <span className={styles.itemPrice}>${item.price}</span>
                      <span className={styles.itemQuantity}>Qty: {item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <span className={styles.itemTotalPrice}>Total Price: ${order.totalPrice}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Orders;
