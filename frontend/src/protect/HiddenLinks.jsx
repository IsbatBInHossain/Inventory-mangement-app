import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/features/auth/authSlice';

// eslint-disable-next-line react/prop-types
export const ShowIfLoggedIn = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <>{children}</>;
  } else return null;
};

// eslint-disable-next-line react/prop-types
export const ShowIfLoggedOut = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <>{children}</>;
  } else return null;
};
