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