import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getLoginStatus } from '../services/authService';
import { setLogin } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const useRedirectUser = path => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const redirectUser = async () => {
      const loginStatus = await getLoginStatus();
      dispatch(setLogin(loginStatus));

      if (!loginStatus) {
        toast.info('Session expired, Please login to continue.');
        navigate(path);
        return;
      }
    };
    redirectUser();
  }, [dispatch, navigate, path]);
};
export default useRedirectUser;
