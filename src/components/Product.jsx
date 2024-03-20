import React, { useState, useEffect } from 'react';
import { getProducts } from '../utils/apiRequests';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../features/cart/cartSlice';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
    <>
      <div className="small-container">
        <div className="row row-2">
          <h2>All Products</h2>

        </div>

        <div className="row">
          {products.map(product => (
            <div className="col-4" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img width={100} height={200} src="https://img.freepik.com/free-photo/black-woman-trendy-grey-leather-jacket-posing-beige-background-studio-winter-autumn-fashion-look_273443-141.jpg" alt="" />
                <h4>{product.title}</h4>
                <p>₦{product.price.toFixed(2)}</p>
              </Link>
              <button className="btn" onClick={() => addToCart(product)}>Add To Cart</button>
            </div>
          ))}
        </div>

        {/* <div className="page-btn">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>&#8594;</span>
        </div> */}

      </div>
    </>

  );
}

export default ProductPage;
