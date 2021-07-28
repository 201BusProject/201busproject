import React from "react";
import "./css/StatusBar.css";
import * as FaIcons from "react-icons/fa";

function StatusBar(props) {
  const { status } = props;
  return (
    <div className="status-bar">
      <div className="status col-lg-9">
        <h6 className="bold-four">{status}</h6>
      </div>
      <div className="status-btns col-sm-2">
        <button className="btn btn-dark start status-bar-btn">
          <FaIcons.FaUndo />
        </button>
        <button className="btn btn-dark start status-bar-btn">
          <FaIcons.FaPause />
        </button>
      </div>
    </div>
  );
}

export default StatusBar;
