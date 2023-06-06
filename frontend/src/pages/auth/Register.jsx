import styles from './auth.module.scss';
import { TiUserAddOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import Card from '../../components/card/card';

const Register = () => {
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <TiUserAddOutline size={35} color='#999' />
          </div>
          <h2>Register</h2>
          <form>
            <input type='text' name='name' required placeholder='Name' />
            <input type='email' name='email' required placeholder='Email' />
            <input
              type='password'
              name='password'
              required
              placeholder='Password'
            />
            <input
              type='password'
              name='confirm-password'
              required
              placeholder='Confirm Password'
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
