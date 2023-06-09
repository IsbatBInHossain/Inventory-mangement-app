// import { ReactComponent as Logo } from '../../assets/logo.svg';
import './Home.scss';
import { RiProductHuntLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import invImg from '../../assets/inv-img.png';
import { ShowIfLoggedIn, ShowIfLoggedOut } from '../../protect/HiddenLinks';

const Home = () => {
  return (
    <div className='home'>
      <nav className='container --flex-between'>
        <div className='logo'>
          <RiProductHuntLine size={35} />
        </div>
        <ul className='home-links'>
          <ShowIfLoggedIn>
            <li>
              <button className='--btn --btn-primary'>
                <Link to='/dashboard'>Dashboard</Link>
              </button>
            </li>
          </ShowIfLoggedIn>
          <ShowIfLoggedOut>
            <li>
              <Link to='/register'>Register</Link>
            </li>
          </ShowIfLoggedOut>
          <ShowIfLoggedOut>
            <li>
              <button className='--btn --btn-primary'>
                <Link to='/login'>Login</Link>
              </button>
            </li>
          </ShowIfLoggedOut>
        </ul>
      </nav>

      <section className='container hero'>
        <div className='hero-text'>
          <h2>Inventory & Stock Management Solution</h2>
          <p>
            Inventory system to control and manage proucts in the warehouse in
            real timeand integrated to make it easier to develop your business.
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
          <img src={invImg} alt='inventory' />
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
