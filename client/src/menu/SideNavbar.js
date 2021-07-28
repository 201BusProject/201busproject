import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { IconContext } from "react-icons";

function SideNavbar(props) {
  const [sidebar, setSidebar] = useState(false);
  const { onClick } = props;
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="nav-menu col-sm-1">
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="nav-text">
              <Link to="/" onClick={() => onClick("about")}>
                <div className="translateGroup">
                  <AiIcons.AiFillHome />
                </div>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/" onClick={() => onClick("map")}>
                <div className="translateGroup">
                  <FaIcons.FaBus />
                </div>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/" onClick={() => onClick("music")}>
                <div className="translateGroup">
                  <FaIcons.FaMusic />
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default SideNavbar;
