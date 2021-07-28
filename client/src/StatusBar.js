import React from "react";
import "./css/StatusBar.css";
import * as FaIcons from "react-icons/fa";

function StatusBar(props) {
  const { status, endJourney, pauseJourney } = props;
  return (
    <div className="status-bar">
      <div className="status col-lg-8">
        <h6 className="bold-four">{status}</h6>
      </div>
      <div className="status-btns col-sm-3">
        <button className="btn btn-dark start status-bar-btn" onClick={pauseJourney}>
          <FaIcons.FaPause />
        </button>
        <button className="btn btn-dark start status-bar-btn" onClick={endJourney}>
          <FaIcons.FaWindowClose />
        </button>
      </div>
    </div>
  );
}

export default StatusBar;
