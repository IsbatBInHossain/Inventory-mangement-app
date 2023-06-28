import styles from './auth.module.scss';
import { TiUserAddOutline } from 'react-icons/ti';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { registerUser, validateEmail } from '../../services/authService';
import { setLogin, setName } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { name, email, password, confirmPassword } = formData;

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleRegister = async e => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error('Please fill in all the fields');
    }
    if (password.length < 6) {
      return toast.error('Password must be of at least 6 characters');
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }
    const userData = { name, email, password };
    setLoading(true);
    try {
      const data = await registerUser(userData);
      setLoading(false);
      dispatch(setLogin(true));
      dispatch(setName(data.name));
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
            <TiUserAddOutline size={35} color='#999' />
          </div>
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input
              type='text'
              name='name'
              required
              placeholder='Name'
              value={name}
              onChange={handleInputChange}
            />
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
            <input
              type='password'
              name='confirmPassword'
              required
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={handleInputChange}
            />
            <button className='--btn --btn-primary --btn-block' type='submit'>
              Register
            </button>
          </form>
          <span className={styles.register}>
            <Link to='/'>Home</Link>
            <p>&nbsp; Already have an account? &nbsp;</p>
            <Link to='/login'>Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};
export default Register;
