import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { placeOrder } from '../utils/apiRequests';
import { clearCart } from '../features/cart/cartSlice';
import { generateOrderNumber } from '../utils/orderUtils';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  // Get the user ID from local storage
  const userId = localStorage.getItem('userId');

  const handleOrder = async () => {
    if (!userId) {
        toast.error('User not authenticated. Please log in.');
        return;
    }

    if (!address || !state || !country) {
        toast.error('Please provide shipping information.');
        return;
    }

    const orderNumber = generateOrderNumber();

    const orderData = {
        user_id: userId,
        order_number: orderNumber,
        total_amount: totalAmount,
        payment_method: 'cod',
        order_items: items.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            price: item.price,
        })),
        shipping_address: address,
        shipping_city: state,
        shipping_country: country,
    };

    try {
        await placeOrder(orderData);
        dispatch(clearCart());
        toast.success('Order placed successfully!');
        navigate('/thank-you');
    } catch (error) {
        console.error('Order failed:', error.message);
        toast.error('Order failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <div>
        <h2>Order Summary</h2>
        {items.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Subtotal: ₦{(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <p>Total: {totalAmount.toFixed(2)}</p>
        <p>Shipping Fee: ₦0.00</p>
        <h2>Shipping Address</h2>
        <form>
          <div>
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label>State:</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />₦
          </div>
          <div>
            <label>Country:</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </form>
        <button onClick={handleOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;
