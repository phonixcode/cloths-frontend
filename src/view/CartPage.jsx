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

    <div className="small-container cart-page">
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
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
                      <a href="" onClick={() => handleRemove(item.id)}>Remove</a>
                    </div>
                  </div>
                </td>
                <td>
                  <button onClick={() => handleIncrement(item.id)}>+</button>
                  <input type="number" value={item.quantity} disabled/>
                  <button onClick={() => handleDecrement(item.id)}>-</button>
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
                  <td>Total</td>
                  <td>₦{totalAmount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <button className="btn btn-checkout" onClick={handleCheckout}>Checkout</button>
        </>

      )}
    </div>

    // <div>
    //   <h1>Cart</h1>
    //   {items.length === 0 ? (
    //     <p>Your cart is empty</p>
    //   ) : (
    //     <div>
    //       {items.map((item) => (
    //         <div key={item.id}>
    //           <h3>{item.title}</h3>
    //           <p>Price: ₦{item.price.toFixed(2)}</p>
    //           <p>Quantity: {item.quantity}</p>
    //           <button onClick={() => handleIncrement(item.id)}>+</button>
    //           <button onClick={() => handleDecrement(item.id)}>-</button>
    //           <button onClick={() => handleRemove(item.id)}>Remove</button>
    //           <p>Subtotal: ₦{(item.price * item.quantity).toFixed(2)}</p>
    //         </div>
    //       ))}
    //       <p>Total: ₦{totalAmount.toFixed(2)}</p>
    //       <button onClick={handleCheckout}>Checkout</button>
    //     </div>
    //   )}
    // </div>
  );
}

export default CartPage;
