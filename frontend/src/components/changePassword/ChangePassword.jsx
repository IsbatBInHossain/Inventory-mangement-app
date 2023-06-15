import { useState } from 'react';
import './ChangePassword.scss';
import { toast } from 'react-toastify';
import { changePassword } from '../../services/authService';
import Card from '../card/Card';
import { Spinner } from '../loader/Loader';
import { useNavigate } from 'react-router-dom';

const initialState = {
  oldPassword: '',
  password: '',
  confirmPassword: '',
};

const ChangePassword = () => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { oldPassword, password, confirmPassword } = formData;

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('New passwords do not match. Please try again.');
      setFormData(initialState);
      return;
    }
    setLoading(true);
    try {
      const response = await changePassword({ password, oldPassword });
      setLoading(false);
      toast.success(response);
      navigate('/profile');
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };
  return (
    <div className='change-password'>
      {loading && <Spinner />}
      <Card cardClasses='password-card'>
        <h3>Change Password</h3>
        <form onSubmit={handlePasswordChange} className='--form-control'>
          <input
            type='password'
            name='oldPassword'
            required
            placeholder='Old Password'
            value={oldPassword}
            onChange={handleInputChange}
          />
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
          <button className='--btn --btn-primary' type='submit'>
            Reset Password
          </button>
        </form>
      </Card>
    </div>
  );
};
export default ChangePassword;
