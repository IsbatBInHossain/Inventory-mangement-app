/* eslint-disable react/prop-types */
import { AiOutlineEye } from 'react-icons/ai';
import { Spinner } from '../../loader/Loader';
import './ProductList.scss';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Search from '../../search/Search';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  filterProducts,
  selectFilteredProducts,
} from '../../../redux/features/products/filterSlice';
import {
  deleteProduct,
  getAllProducts,
} from '../../../redux/features/products/productSlice';

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

  // Delete Product
  const handleDelete = async id => {
    await dispatch(deleteProduct(id));
    await dispatch(getAllProducts());
  };
  const confirmDelete = id => {
    confirmAlert({
      title: 'Delete Product',
      message: 'Are you sure to delete this product?',
      buttons: [
        {
          label: 'Delete',
          onClick: () => handleDelete(id),
        },
        {
          label: 'Cancel',
          onClick: () => {},
        },
      ],
    });
  };

  // Start Paginate
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  // End Paginate

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
                {currentItems.map((product, index) => {
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
                          <Link to={`/product-details/${_id}`}>
                            <AiOutlineEye size={25} color='purple' />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-product/${_id}`}>
                            <FaEdit size={20} color='green' />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color='red'
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel='...'
          nextLabel='Next'
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel='Prev'
          renderOnZeroPageCount={null}
          containerClassName='pagination'
          pageLinkClassName='page-num'
          previousLinkClassName='page-num'
          nextLinkClassName='page-num'
          activeLinkClassName='activePage'
        />
      </div>
    </div>
  );
};
export default ProductList;
