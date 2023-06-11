import { logoutUser } from '../../services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectName, setLogin } from '../../redux/features/auth/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const handleLogoutUser = async () => {
    await logoutUser();
    await dispatch(setLogin(false));
    navigate('/login');
  };
  return (
    <div className='--pad header'>
      <div className='--flex-between'>
        <h3>
          <span className='--fw-thin'>Welcome, </span>
          <span className='--color-danger'>{name}</span>
        </h3>
        <button className='--btn --btn-danger' onClick={handleLogoutUser}>
          Logout
        </button>
      </div>
      <hr />
    </div>
  );
};
export default Header;
