import { useParams } from 'react-router-dom';
import useRedirectUser from '../../../customHooks/useRedirectUser';
import './ProductDetails.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../redux/features/auth/authSlice';
import { useEffect } from 'react';
import { getSingleProduct } from '../../../redux/features/products/productSlice';
import Card from '../../card/Card';
import { Spinner } from '../../loader/Loader';
import DOMPurify from 'dompurify';

const ProductDetails = () => {
  useRedirectUser('/login');
  const { id } = useParams();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    state => state.product
  );

  const stockStatus = quantity => {
    if (quantity > 0) {
      return <span className='--color-success'>In stock</span>;
    }
    return <span className='--color-danger'>Out of stock</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      if (!product || product.id !== id) {
        dispatch(getSingleProduct(id));
      }
    }
    if (isError) {
      console.log(message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, isError, isLoggedIn, message]);

  return (
    <div className='product-detail'>
      <h3 className='--mt'>Product Details</h3>
      <Card cardClasses='card'>
        {isLoading && <Spinner />}
        {product && (
          <div className='detail'>
            <Card cardClasses='group'>
              {product?.image ? (
                <img
                  src={product.image.filePath}
                  alt={product.image.fileName}
                />
              ) : (
                <p>No image is set for this product</p>
              )}
            </Card>
            <h4>Product Avilability: {stockStatus(product.quantity)}</h4>
            <hr />
            <h4>
              <span className='badge'>Name: </span> &nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {product.sku}
            </p>
            <p>
              <b>&rarr; Category : </b> {product.category}
            </p>
            <p>
              <b>&rarr; Price : </b> {'Tk.'}
              {product.price}
            </p>
            <p>
              <b>&rarr; Quantity in stock : </b> {product.quantity}
            </p>
            <p>
              <b>&rarr; Total Value in stock : </b> {'Tk.'}
              {product.price * product.quantity}
            </p>
            <hr />
            <p>
              <b>&rarr; Description : </b>
              <br />
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
              className='--color-dark'
            ></div>
            <hr />
            <code className='--color-dark'>
              Created at: {product.createdAt.toLocaleString('en-Us')}
            </code>
            <br />
            <code className='--color-dark'>
              Last modified at: {product.updatedAt.toLocaleString('en-Us')}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};
export default ProductDetails;
