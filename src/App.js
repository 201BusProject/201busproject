import "./css/App.css";
import Map from "./map";
import SideNavbar from "./menu/SideNavbar";
import {
  HashRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import Music from "./pages/Music";
import About from "./pages/About";

function App() {
  return (
    <div className="App">
      <Router basename="/">
        <SideNavbar />
        <Switch>
          <Route path="/map" component={withRouter(Map)} />
          <Route path="/201busproject" component={withRouter(About)} />
          <Route path="/music" component={withRouter(Music)} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
