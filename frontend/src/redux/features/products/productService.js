import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_REACT_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/products`;

// Create a product
const createProduct = async formData => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

const productService = {
  createProduct,
};

export default productService;
