import styles from './auth.module.scss';
import { MdPassword } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Card from '../../components/card/card';

const Reset = () => {
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <MdPassword size={35} color='#999' />
          </div>
          <h2>Reset Password</h2>
          <form>
            <input
              type='password'
              name='password'
              required
              placeholder='New Password'
            />
            <input
              type='password'
              name='confirm-password'
              required
              placeholder='Confirm New Password'
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
