import './Home.scss';
import { Link } from 'react-router-dom';
import wizardImg from '../../assets/wizard.png';
import logo from '../../assets/logo.svg';
import { ShowIfLoggedIn, ShowIfLoggedOut } from '../../protect/HiddenLinks';

const Home = () => {
  return (
    <div className='home'>
      <nav className='container --flex-between'>
        <div className='logo'>
          <img src={logo} alt='logo' />
        </div>
        <ul className='home-links'>
          <ShowIfLoggedIn>
            <li>
              <button className='--btn --btn-gold'>
                <Link to='/dashboard'>Dashboard</Link>
              </button>
            </li>
          </ShowIfLoggedIn>
          <ShowIfLoggedOut>
            <li>
              <button className='--btn --btn-gold'>
                <Link to='/register'>Register</Link>
              </button>
            </li>
          </ShowIfLoggedOut>
          <ShowIfLoggedOut>
            <li>
              <button className='--btn --btn-gold'>
                <Link to='/login'>Login</Link>
              </button>
            </li>
          </ShowIfLoggedOut>
        </ul>
      </nav>

      <section className='container hero'>
        <div className='hero-text'>
          <h2>Welcome to Warehouse Wizard</h2>
          <p>
            Master inventory management made easy. Track, control, and optimize
            inventory across any business. Real-time insights, seamless
            operations, and unlimited growth. Unleash the power of Warehouse
            Wizard today.
          </p>
          <div className='hero-buttons'>
            <button className='--btn --btn-secondary'>
              <Link to='/dashboard'>Free 1 Month Trial</Link>
            </button>
          </div>
          <div className='--flex-start'>
            <NumberText num='14K' text='Brand Owners' />
            <NumberText num='23K' text='Active Users' />
            <NumberText num='500+' text='Partners' />
          </div>
        </div>
        <div className='hero-image'>
          <img src={wizardImg} alt='inventory' />
        </div>
      </section>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const NumberText = function ({ num, text }) {
  return (
    <div className='--mr'>
      <h3 className='--color-white'>{num}</h3>
      <p className='--color-white'>{text}</p>
    </div>
  );
};

export default Home;
