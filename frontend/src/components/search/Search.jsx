import { BiSearch } from 'react-icons/bi';
import styles from './Search.module.scss';

// eslint-disable-next-line react/prop-types
const Search = ({ value, onChange }) => {
  return (
    <div className={styles.search}>
      <BiSearch size={18} className={styles.icon} />
      <input
        type='text'
        placeholder='Search products'
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
export default Search;
