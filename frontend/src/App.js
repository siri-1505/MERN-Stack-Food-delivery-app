import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/OrdersPage';
import Register from './components/Register';
import MainPage from './pages/MainPage';
import CartPage from './pages/CartPage';
import CheckOutPage from './pages/CheckOutPage';
import ErrorPage from './pages/ErrorPage'

function App() {
  return (
    <div className="background">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<Register />} />
        <Route path="fooditems" element={<MainPage />}>
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckOutPage />} />
        </Route>
        <Route path="/error" element={<ErrorPage />} />
        <Route path='*' element={<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
