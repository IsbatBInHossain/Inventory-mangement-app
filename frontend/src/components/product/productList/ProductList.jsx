/* eslint-disable react/prop-types */
import { AiOutlineEye } from 'react-icons/ai';
import { Spinner } from '../../loader/Loader';
import './ProductList.scss';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Search from '../../search/Search';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterProducts,
  selectFilteredProducts,
} from '../../../redux/features/products/filterSlice';

const shortenText = (text, n) => {
  if (text.length > n) {
    return text.substring(0, n).concat('...');
  }
  return text;
};

const ProductList = ({ products, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFilteredProducts);

  useEffect(() => {
    dispatch(filterProducts({ products, searchTerm }));
  }, [products, searchTerm, dispatch]);

  return (
    <div className='product-list'>
      <hr />
      <div className='table'>
        <div className='--flex-between --flex-dir-column'>
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <Search
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </span>
        </div>
        {isLoading && <Spinner />}
        <div className='table'>
          {!isLoading && products.length === 0 ? (
            <p>No products found, please add some products</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => {
                  const { _id, name, category, price, quantity } = product;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>
                        {'Tk.'}
                        {price}
                      </td>
                      <td>{quantity}</td>
                      <td>
                        {'Tk.'}
                        {quantity * price}
                      </td>
                      <td className='icons'>
                        <span>
                          <AiOutlineEye size={25} color='purple' />
                        </span>
                        <span>
                          <FaEdit size={20} color='green' />
                        </span>
                        <span>
                          <FaTrashAlt size={20} color='red' />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductList;
