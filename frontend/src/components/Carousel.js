import React from 'react';
import styles from './Carousel.module.css'

const Carousel = () => {
  return (
    <div className={styles.container}>
      <img src='./FoodImage.avif' alt="Carousel" className={styles.img} />
      <div className={styles.text}>
        <h2 className={styles.heading}>Cravings Hunt</h2>
        <p>Discover the best food & drinks in Hyderabad</p>
        
      </div>
      <div className={styles.navigation}>
        <span className={styles.arrow}>&#8249;</span>
        <span className={styles.arrow}>&#8250;</span>
      </div>
    </div>
  );
}

export default Carousel;
