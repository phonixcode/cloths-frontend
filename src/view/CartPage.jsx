import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  incrementQuantity,
  decrementQuantity,
  removeProductFromCart,
} from "../features/cart/cartSlice";

function CartPage() {
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalAmount } = useSelector((state) => state.cart);

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemove = (id) => {
    dispatch(removeProductFromCart(id));
  };

  const handleCheckout = () => {
    if (loginState) {
      // Proceed with checkout process
      navigate('/checkout');
    } else {
      // Redirect to login screen if user is not signed in
      navigate('/login', { state: { returnTo: '/cart' } });
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {items.map((item) => (
            <div key={item.id}>
              <h3>{item.title}</h3>
              <p>Price: ₦{item.price.toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => handleIncrement(item.id)}>+</button>
              <button onClick={() => handleDecrement(item.id)}>-</button>
              <button onClick={() => handleRemove(item.id)}>Remove</button>
              <p>Subtotal: ₦{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <p>Total: ₦{totalAmount.toFixed(2)}</p>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
