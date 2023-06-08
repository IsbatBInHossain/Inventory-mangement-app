import styles from './auth.module.scss';
import { AiOutlineMail } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Card from '../../components/card/card';
import { useState } from 'react';
import { forgotPassword, validateEmail } from '../../services/authService';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleForgotPass = async e => {
    e.preventDefault();
    if (!email) {
      return toast.error('Please fill in all the fields');
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }
    await forgotPassword({ email });
    setEmail('');
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <AiOutlineMail size={35} color='#999' />
          </div>
          <h2>Forgot Password</h2>
          <form onSubmit={handleForgotPass}>
            <input
              type='email'
              name='email'
              required
              placeholder='Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button className='--btn --btn-primary --btn-block' type='submit'>
              Get Reset Email
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
export default ForgotPassword;
