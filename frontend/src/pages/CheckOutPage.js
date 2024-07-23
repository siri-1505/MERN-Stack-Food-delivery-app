import React from 'react';
import { useSelector } from 'react-redux';
import CheckOutModal from '../components/CheckOutModal';

export default function CheckOutPage() {
  const cart = useSelector((state) => state.cart);
  
  const totalPrice = cart.items.reduce((total, item) => {
    const itemPrice = Number(item.price);
    const itemTotal = item.quantity * itemPrice;
    return total + itemTotal;
  }, 0);

  console.log("Hello")

  return (
    <div>
      <CheckOutModal cartItems={cart.items} totalPrice={totalPrice} />
    </div>
  );
}
