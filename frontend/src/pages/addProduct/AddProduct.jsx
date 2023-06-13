import { useState } from 'react';
import ProductForm from '../../components/product/productForm/ProductForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProduct,
  selectIsLoading,
} from '../../redux/features/products/productSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';

const initialState = {
  name: '',
  category: '',
  quantity: '',
  price: '',
};

const AddProduct = () => {
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectIsLoading);

  const { name, price, category, quantity } = product;

  const handleInputChange = e => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = e => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const generateSKU = category => {
    const letter = category.slice(0, 3).toUpperCase();
    const num = Date.now();
    return letter + '-' + num;
  };

  const saveProduct = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('sku', generateSKU(category));
    formData.append('category', category);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('image', productImage);
    formData.append('description', description);
    await dispatch(createProduct(formData));
    navigate('/dashboard');
  };

  return (
    <div>
      {loading && <Loader />}
      <h3 className='--mt'>Add New Product</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};
export default AddProduct;
