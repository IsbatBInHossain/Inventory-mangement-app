import { useDispatch, useSelector } from 'react-redux';
import useRedirectUser from '../../customHooks/useRedirectUser';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { useEffect } from 'react';
import { getAllProducts } from '../../redux/features/products/productSlice';
import ProductList from '../../components/product/productList/ProductList';

const Dashboard = () => {
  useRedirectUser('/login');

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector(
    state => state.product
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getAllProducts());
    }
    if (isError) {
      console.log(message);
    }
  }, [dispatch, isError, isLoggedIn, message]);

  return (
    <div>
      <h2>Dashboard</h2>
      <ProductList products={products} isLoading={isLoading} />
    </div>
  );
};
export default Dashboard;
