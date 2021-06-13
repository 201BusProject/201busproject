import React from 'react';
import './Recording.css';
import { RecordingData } from './RecordingData';

 
function Recording() {
  return (
    <>
    <ul>
    {RecordingData.map((item, index) => {
        return (
          <li key={index} className={item.cName}>
            <Link to={item.path}>
              {item.icon}
            </Link>
          </li>
        );
      })}
    </ul>
    </>
  );
}

export default Recording