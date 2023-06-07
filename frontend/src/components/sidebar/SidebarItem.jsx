/* eslint-disable react/prop-types */
import { useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const activeLink = ({ isActive }) => {
  return isActive ? 'active' : 'link';
};
// const activeSubLink = ({ isActive }) => {
//   return isActive ? 'active' : 'link';
// };

const SidebarItem = ({ item, isOpen }) => {
  const [expanded, setExpanded] = useState(false);

  if (item.childrens) {
    return (
      <div
        className={
          expanded ? 'sidebar-item s-parent open' : 'sidebar-item s-parent'
        }
      >
        <div className='sidebar-title'>
          <span>
            {item.icon && <div className='icon'>{item.icon}</div>}
            {isOpen && <div>{item.title}</div>}
          </span>
          <MdKeyboardArrowRight
            size={25}
            className='arrow-icon'
            onClick={() => setExpanded(!expanded)}
          />
        </div>
        <div className='sidebar-content'>
          {item.childrens.map(child => {
            return (
              <div className='s-child' key={child.key}>
                <NavLink className={activeLink} to={child.path}>
                  <div className='sidebar-item'>
                    <div className='sidebar-title'>
                      <span>
                        {child.icon && <div className='icon'>{child.icon}</div>}
                        {isOpen && <div>{child.title}</div>}
                      </span>
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <NavLink className={activeLink} to={item.path}>
        <div className='sidebar-item'>
          <div className='sidebar-title'>
            <span>
              {item.icon && <div className='icon'>{item.icon}</div>}
              {isOpen && <div>{item.title}</div>}
            </span>
          </div>
        </div>
      </NavLink>
    );
  }
};
export default SidebarItem;
