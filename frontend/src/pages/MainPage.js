import React from 'react';
import NavigationBar from '../components/NavigationBar';
import DisplayProducts from '../components/DisplayProducts';
import Carousel from '../components/Carousel';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

export default function MainPage() {
  const location = useLocation();
  const showMainComponents = !location.pathname.includes('/fooditems/checkout') && !location.pathname.includes('/fooditems/orders') && !location.pathname.includes('/fooditems/contact') && !location.pathname.includes('/fooditems/about');

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    content: {
      flex: 1,
    }
  };

  return (
    <div style={styles.container}>
      <NavigationBar />
      <div style={styles.content}>
        {showMainComponents && <Carousel />}
        {showMainComponents && <DisplayProducts />}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
