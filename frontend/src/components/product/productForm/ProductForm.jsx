/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import './ProductForm.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Card from '../../card/Card';

const ProductForm = ({
  product,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {
  const { name, category, price, quantity } = product || {};

  return (
    <div>
      <div className='add-product'>
        <Card cardClasses={'card'}>
          <form onSubmit={saveProduct}>
            <Card cardClasses={'group'}>
              <label>Product Image</label>
              <code className='--color-dark'>
                Supported Formats: jpg, jpeg, png
              </code>
              <input
                type='file'
                name='image'
                onChange={e => handleImageChange(e)}
              />
              {imagePreview !== null ? (
                <div className='image-preview'>
                  <img src={imagePreview} alt='product image' />
                </div>
              ) : (
                <p>No image set for this product</p>
              )}
            </Card>
            <label>Product Name:</label>
            <input
              type='text'
              name='name'
              placeholder='Product Name'
              value={name || ''}
              onChange={handleInputChange}
            />
            <label>Product Category:</label>
            <input
              type='text'
              name='category'
              placeholder='Product Category'
              value={category || ''}
              onChange={handleInputChange}
            />
            <label>Product Price:</label>
            <input
              type='text'
              name='price'
              placeholder='Product Price'
              value={price || ''}
              onChange={handleInputChange}
            />
            <label>Product Quantity:</label>
            <input
              type='text'
              name='quantity'
              placeholder='Product Quantity'
              value={quantity || ''}
              onChange={handleInputChange}
            />
            <label>Product Description:</label>
            <ReactQuill
              theme='snow'
              value={description}
              onChange={setDescription}
              modules={ProductForm.modules}
              formats={ProductForm.formats}
            />
            <div className='--my'>
              <button type='submit' className='--btn --btn-primary'>
                Save Product
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['clean'],
  ],
};
ProductForm.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'color',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'video',
  'image',
  'code-block',
  'align',
];

export default ProductForm;
