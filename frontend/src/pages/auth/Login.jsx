import styles from './auth.module.scss';
import { BiLogIn } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Card from '../../components/card/card';

const Login = () => {
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <BiLogIn size={35} color='#999' />
          </div>
          <h2>Login</h2>
          <form>
            <input type='email' name='email' required placeholder='Email' />
            <input
              type='password'
              name='password'
              required
              placeholder='Password'
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
