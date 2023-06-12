/* eslint-disable react/prop-types */
import { TbCurrencyTaka } from 'react-icons/tb';
import { BsCart4, BsCartX } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';
import './ProductSummary.scss';
import InfoBox from '../../infoBox/InfoBox';
import { useDispatch, useSelector } from 'react-redux';
import {
  calcCategory,
  calcOutOfStock,
  calcStoreValue,
  selectCategory,
  selectOutOfStock,
  selectTotalStoreValue,
} from '../../../redux/features/products/productSlice';
import { useEffect } from 'react';
import { formatNumbers } from '../../../services/formatNumbers';

//Icons
const earningIcon = <TbCurrencyTaka size={40} color='#fff' />;
const productIcon = <BsCart4 size={40} color='#fff' />;
const categoryIcon = <BiCategory size={40} color='#fff' />;
const outOfStockIcon = <BsCartX size={40} color='#fff' />;

const ProductSummery = ({ products }) => {
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const category = useSelector(selectCategory);
  const outOfStock = useSelector(selectOutOfStock);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calcStoreValue(products));
    dispatch(calcCategory(products));
    dispatch(calcOutOfStock(products));
  }, [dispatch, products]);

  return (
    <div className='product-summary'>
      <h3 className='--mt'>Inventory Status</h3>
      <div className='info-summary'>
        <InfoBox
          icon={productIcon}
          title='Total Products'
          bgColor='card1'
          count={products.length}
        />
        <InfoBox
          icon={earningIcon}
          title='Total Store Value'
          bgColor='card2'
          count={`Tk.${formatNumbers(totalStoreValue)}`}
        />
        <InfoBox
          icon={outOfStockIcon}
          title='Out of Stock'
          bgColor='card3'
          count={outOfStock}
        />
        <InfoBox
          icon={categoryIcon}
          title='All Categories'
          bgColor='card4'
          count={category.length}
        />
      </div>
    </div>
  );
};
export default ProductSummery;
