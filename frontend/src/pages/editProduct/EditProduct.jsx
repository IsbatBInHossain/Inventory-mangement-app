import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getAllProducts,
  getSingleProduct,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from '../../redux/features/products/productSlice';
import Loader from '../../components/loader/Loader';
import ProductForm from '../../components/product/productForm/ProductForm';

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const loading = useSelector(selectIsLoading);
  const productEdit = useSelector(selectProduct);

  const [product, setProduct] = useState(productEdit);
  const [productImage, setProductImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);
    setImagePreview(
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
    );
    setDescription(
      productEdit && productEdit.description ? productEdit.description : ''
    );
  }, [productEdit]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = e => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveProduct = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', product?.name);
    formData.append('category', product?.category);
    formData.append('price', product?.price);
    formData.append('quantity', product?.quantity);
    formData.append('description', description);
    if (productImage) {
      formData.append('image', productImage);
    }
    await dispatch(updateProduct({ formData, id }));
    await dispatch(getAllProducts());
    navigate('/dashboard');
  };

  return (
    <div>
      {loading && <Loader />}
      <h3 className='--mt'>Edit Product</h3>
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
export default EditProduct;
