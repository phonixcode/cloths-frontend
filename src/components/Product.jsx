import React, { useState, useEffect } from 'react';
import { getProducts } from '../utils/apiRequests';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../features/cart/cartSlice';
import { toast } from "react-toastify";


function ProductPage() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    // dispatch(addProductToCart(product));
    if (product.stock > 0) {
      dispatch(addProductToCart({ product, quantity: 1 }));
    } else {
      toast.error("Product out of stock!");
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <div>
        {products.map(product => (
          <div key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ₦{product.price.toFixed(2)}</p>
            <button className="cart-button" onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
