import "./css/App.css";
import Map from "./map";
import SideNavbar from "./menu/SideNavbar";
import Music from "./pages/Music";
import About from "./pages/About";
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [component, setComponent] = useState("map");

  const handleSidebarClick = item => {
    setComponent(item);
  };

  const appComponents = {
    map: <Map />,
    music: <Music />,
    about: <About />
  };

  return (
    <div className="App">
      <Router basename="/">
        <SideNavbar onClick={handleSidebarClick} />
      </Router>
      {appComponents[component]}
    </div>
  );
}

export default App;
