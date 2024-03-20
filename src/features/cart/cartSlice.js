import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Load cart data from local storage if available
const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : { items: [], totalAmount: 0 };
};

const saveCartToLocalStorage = (cartData) => {
  localStorage.setItem("cart", JSON.stringify(cartData));
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addProductToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (!existingItem) {
        state.items.push({ ...product, quantity });
        state.totalAmount += product.price * quantity;

        toast.success("Product added to the cart!");
      } else {
        const totalQuantity = existingItem.quantity + quantity;
        if (totalQuantity <= product.stock) {
          existingItem.quantity += quantity;
          state.totalAmount += product.price * quantity;

          toast.success("Product added to the cart!");
        } else {
          toast.error("Cannot add more than available stock");
        }
      }

      saveCartToLocalStorage(state);
    },
    incrementQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        if (item.quantity < item.stock) {
          item.quantity++;
          state.totalAmount += item.price;
        } else {
          toast.error("Cannot add more than available stock");
        }

        saveCartToLocalStorage(state);
      }
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity--;
        state.totalAmount -= item.price;
      } else {
        toast.error("Quantity cannot be less than 1");
      }

      saveCartToLocalStorage(state);
    },
    removeProductFromCart: (state, action) => {
      const id = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        const removedItem = state.items.splice(index, 1)[0];
        state.totalAmount -= removedItem.price * removedItem.quantity;
        toast.success("Product removed from cart!");
      }

      saveCartToLocalStorage(state);
    },
    updateCartAmount: (state, action) => {
      state.totalAmount = action.payload;

      saveCartToLocalStorage(state);
    },
    calculateTotalAmount: (state) => {
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price,
        0
      );

      saveCartToLocalStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;

      localStorage.removeItem("cart");      
    },
  },
});

export const {
  addProductToCart,
  incrementQuantity,
  decrementQuantity,
  removeProductFromCart,
  updateCartAmount,
  calculateTotalAmount,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
