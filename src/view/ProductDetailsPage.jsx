import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProductDetail } from '../utils/apiRequests';
import { addProductToCart } from '../features/cart/cartSlice';
import { toast } from "react-toastify";

function ProductDetailsPage() {
    const { productId } = useParams();
    const dispatch = useDispatch();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedGender, setSelectedGender] = useState('');

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const productData = await getProductDetail(productId);
                setProduct(productData);
            } catch (error) {
                console.error('Error fetching product details:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [productId]);

    const handleAddToCart = () => {
        if (product.stock > 0) {
            dispatch(addProductToCart({ product, quantity: 1 }));
        } else {
            toast.error("Product out of stock!");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="small-container single-product">
            <div className="row">
                <div className="col-2">
                    <img width="100%" height={400} src={product.image} alt="" id="productImg" />

                </div>
                <div className="col-2">
                    <h1>{product.title}</h1>
                    <h4>₦{product.price.toFixed(2)}</h4>

                    <div className="row">
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="col-1">
                                <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                                    <option value="">Select Size</option>
                                    {product.sizes.map((size) => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {product.colors && product.colors.length > 0 && (
                            <div className="col-1">
                                <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                                    <option value="">Select Color</option>
                                    {product.colors.map((color) => (
                                        <option key={color} value={color}>{color}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {product.genders && product.genders.length > 0 && (
                            <div className="col-1">
                                <select value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
                                    <option value="">Select Gender</option>
                                    {product.genders.map((gender) => (
                                        <option key={gender} value={gender}>{gender}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    <button onClick={handleAddToCart} className="btn btn-checkout">Add to Cart</button>
                    <h3>Product Details</h3>
                    <p>
                        {product.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsPage;
