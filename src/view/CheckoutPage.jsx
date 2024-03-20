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
  const [loading, setLoading] = useState(false); // State to track loading status

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
      setLoading(true); 
      await placeOrder(orderData);
      dispatch(clearCart());
      toast.success('Order placed successfully!');
      navigate('/thank-you');
    } catch (error) {
      console.error('Order failed:', error.message);
      toast.error('Order failed. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <div className="small-container cart-page">
        <h2>Order Summary</h2>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Sub Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="cart-info">
                    <img src="https://img.freepik.com/free-photo/black-woman-trendy-grey-leather-jacket-posing-beige-background-studio-winter-autumn-fashion-look_273443-141.jpg" alt="" />
                    <div>
                      <p>{item.title}</p>
                      <small>Price : ₦{item.price.toFixed(2)}</small><br />
                    </div>
                  </div>
                </td>
                <td>
                  <input type="number" value={item.quantity} disabled />
                </td>
                <td>₦{(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-price">
          <table>
            <tbody>
              <tr>
                <td>Shipping Fee</td>
                <td>₦0.00</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>₦{totalAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <form>
            <div>
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label>State:</label>
              <input
                type="text"
                name="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div>
              <label>Country:</label>
              <input
                type="text"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </form>
          {loading ? (
            <button className="btn btn-checkout" disabled>
              Placing Order...
            </button>
          ) : (
            <button className="btn btn-checkout" onClick={handleOrder}>
              Place Order
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
