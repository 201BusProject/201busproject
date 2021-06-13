import React from 'react';
import * as FaIcons from 'react-icons/fa';
 
export const SidebarData = [
  {
    title: 'Recordings',
    path: '/music',
    icon: <FaIcons.FaMusic />,
    cName: 'nav-text'
  },
  // {
  //   title: 'Routes',
  //   path: '/routes',
  //   icon: <FaIcons.FaRoute />,
  //   cName: 'nav-text'
  // },
  {
    title: 'Contact',
    path: '/about',
    icon: <FaIcons.FaEnvelope />,
    cName: 'nav-text'
  }
];
