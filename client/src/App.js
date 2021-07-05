import "./css/App.css";
import Map from "./map";
import SideNavbar from "./menu/SideNavbar";
import Music from "./pages/Music";
import About from "./pages/About";
import React, { useState } from "react";

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
      <SideNavbar onClick={handleSidebarClick} />
      {appComponents[component]}
    </div>
  );
}

export default App;
