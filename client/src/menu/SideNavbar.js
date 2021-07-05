import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import './Navbar.css';
import { IconContext } from 'react-icons';
 
function SideNavbar(props) {
  const [sidebar, setSidebar] = useState(false);
  const { onClick } = props; 
  const showSidebar = () => setSidebar(!sidebar);
 
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='nav-menu'>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='nav-text'>
              <FaIcons.FaBus onClick={() => onClick('map')}/>
            </li>
            <li className='nav-text'>
              <FaIcons.FaMusic onClick={() => onClick('music')} />
            </li>
            <li className='nav-text'>
              <FaIcons.FaEnvelope onClick={() => onClick('about')} />
            </li>
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
