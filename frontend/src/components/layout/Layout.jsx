import Footer from '../footer/Footer';
import Header from '../header/Header';

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className='--pad' style={{ minHeigth: '80vh' }}>
        {children}
      </div>
      <Footer />
    </>
  );
};
export default Layout;
