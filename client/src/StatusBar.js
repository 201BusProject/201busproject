import React from "react";
import "./css/StatusBar.css";
import * as FaIcons from "react-icons/fa";

function StatusBar(props) {
  const { status } = props;
  return (
    <div className="row">
      <div className="col-sm-1" />
      <div className="status-bar col">
        <div className="row">
          <div className="status col">
            <h6 className="bold">{status}</h6>
          </div>
          <div className="status-btns">
            <button className="btn btn-dark start status-bar-btn">
              <FaIcons.FaUndo />
            </button>
            <button className="btn btn-dark start status-bar-btn">
              <FaIcons.FaPause />
            </button>
          </div>
        </div>
      </div>
      <div className="col-sm-1" />
    </div>
  );
}

export default StatusBar;
