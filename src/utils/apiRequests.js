import axios from 'axios';
import { BASE_URL } from './api';

export const getProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data.data;
  } catch (error) {
    throw new Error('Error fetching products');
  }
};

export const getProductDetail = async (productId) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${productId}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Error fetching products');
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error('Login failed. Please try again.');
  }
};

export const register = async (name, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, { name, email, password });
    return response.data;
  } catch (error) {
    throw new Error('Registration failed. Please try again.');
  }
};

export const placeOrder = async (orderData) => {
  try {
    const authToken = localStorage.getItem("userToken");
    const response = await axios.post(`${BASE_URL}/orders`, orderData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Order failed. Please try again.');
  }
};