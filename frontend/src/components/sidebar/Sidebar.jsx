import { RiProductHuntLine } from 'react-icons/ri';
import { HiMenuAlt3 } from 'react-icons/hi';
import './Sidebar.scss';
import { useState } from 'react';
import menu from '../../data/sidebarMenu';
import SidebarItem from './SidebarItem';

// eslint-disable-next-line react/prop-types
const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className='layout'>
      <div className='sidebar' style={{ width: isOpen ? '230px' : '60px' }}>
        <div className='top-section'>
          <div className='logo' style={{ display: isOpen ? 'block' : 'none' }}>
            <RiProductHuntLine size={35} style={{ cursor: 'pointer' }} />
          </div>
          <div
            className='bars'
            style={{ marginLeft: isOpen ? '100px' : '0px' }}
          >
            <HiMenuAlt3 onClick={toggleOpen} />
          </div>
        </div>
        {menu.map(item => {
          return <SidebarItem key={item.key} item={item} isOpen={isOpen} />;
        })}
      </div>
      <main
        style={{
          paddingLeft: isOpen ? '230px' : '60px',
          transition: 'all 0.5s',
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
