import React from "react";
import "./css/StatusBar.css";
import * as FaIcons from "react-icons/fa";

function StatusBar(props) {
  const { status, endJourney, pauseJourney, journeyPaused } = props;
  return (
    <div className="row">
      <div className="col-sm-1" />
      <div className="status-bar-pad col">
        <div className="status-bar">
          <div className="row">
            <div className="status col">
              <h6 className="bold">{status}</h6>
            </div>
            <div className="status-btns">
              <button
                className="btn btn-dark start status-bar-btn"
                onClick={pauseJourney}
              >
                {journeyPaused ? <FaIcons.FaPlay /> : <FaIcons.FaPause />}
              </button>
              <button
                className="btn btn-dark start status-bar-btn"
                onClick={endJourney}
              >
                <FaIcons.FaWindowClose />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-1" />
    </div>
  );
}

export default StatusBar;
