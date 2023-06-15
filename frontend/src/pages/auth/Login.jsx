import styles from './auth.module.scss';
import { BiLogIn } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { loginUser, validateEmail } from '../../services/authService';
import { toast } from 'react-toastify';
import { setLogin, setName } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value || '' });
  };

  const handleLoginUser = async e => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error('Please fill in all the fields');
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }

    const userData = { email, password };
    setLoading(true);

    try {
      const data = await loginUser(userData);
      setLoading(false);
      dispatch(setLogin(true));
      if (data && data.name) {
        dispatch(setName(data.name));
      } else {
        dispatch(setName(''));
      }
      navigate('/dashboard');
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      {loading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <BiLogIn size={35} color='#999' />
          </div>
          <h2>Login</h2>
          <form onSubmit={handleLoginUser}>
            <input
              type='email'
              name='email'
              required
              placeholder='Email'
              value={email}
              onChange={handleInputChange}
            />
            <input
              type='password'
              name='password'
              required
              placeholder='Password'
              value={password}
              onChange={handleInputChange}
            />
            <button className='--btn --btn-primary --btn-block' type='submit'>
              Login
            </button>
          </form>
          <Link to='/forgotpassword'>Forgot Password</Link>
          <span className={styles.register}>
            <Link to='/'>Home</Link>
            <p>&nbsp; Don{`'`}t have an account? &nbsp;</p>
            <Link to='/register'>Register</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};
export default Login;
