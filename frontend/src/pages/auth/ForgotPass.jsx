import styles from './auth.module.scss';
import { AiOutlineMail } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Card from '../../components/card/card';

const ForgotPassword = () => {
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <AiOutlineMail size={35} color='#999' />
          </div>
          <h2>Forgot Password</h2>
          <form>
            <input type='email' name='email' required placeholder='Email' />
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
