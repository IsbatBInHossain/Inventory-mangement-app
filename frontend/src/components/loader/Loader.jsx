import loaderImg from '../../assets/blueFire.gif';
import { createPortal } from 'react-dom';
import './Loader.scss';

const Loader = () => {
  return createPortal(
    <div className='wrapper'>
      <div className='loader'>
        <img src={loaderImg} alt='Loading...' />
      </div>
    </div>,
    document.getElementById('loader')
  );
};

export const Spinner = () => {
  return (
    <div className='--center-all spinner'>
      <img src={loaderImg} alt='Loading...' />
    </div>
  );
};
export default Loader;
