import styles from './auth.module.scss';
import { MdPassword } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Card from '../../components/card/Card';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { resetPassword } from '../../services/authService';

const initialState = {
  password: '',
  confirmPassword: '',
};

const Reset = () => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const { password, confirmPassword } = formData;
  const { resetToken } = useParams();

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleResetPassword = async e => {
    e.preventDefault();
    console.log(resetToken);

    if (password.length < 6) {
      return toast.error('Password must be of at least 6 characters');
    }
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    const userData = { password };
    try {
      const response = await resetPassword(userData, resetToken);
      toast.success(response.success);
      navigate('/login');
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <MdPassword size={35} color='#999' />
          </div>
          <h2>Reset Password</h2>
          <form onSubmit={handleResetPassword}>
            <input
              type='password'
              name='password'
              required
              placeholder='New Password'
              value={password}
              onChange={handleInputChange}
            />
            <input
              type='password'
              name='confirmPassword'
              required
              placeholder='Confirm New Password'
              value={confirmPassword}
              onChange={handleInputChange}
            />
            <button className='--btn --btn-primary --btn-block' type='submit'>
              Reset Password
            </button>
            <div className={styles.links}>
              <p>
                <Link to='/'>- Home</Link>
              </p>
              <p>
                <Link to='/login'>Login -</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};
export default Reset;
