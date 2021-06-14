import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
 
function SideNavbar() {
  const [sidebar, setSidebar] = useState(false);
 
  const showSidebar = () => setSidebar(!sidebar);
 
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='nav-menu'>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='/201busproject' className='menu-bars'>
                <FaIcons.FaBus />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                  </Link>
                </li>
              );
            })}
            <div className = "map-menu">
              <li className = "map-menu-item">
                <FaIcons.FaVolumeMute id="mute-button"/>
              </li>
              <li className = "map-menu-item">
                <FaIcons.FaUndo id="refresh-map"/>
              </li>
            </div>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
 
export default SideNavbar;