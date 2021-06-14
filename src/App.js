import './App.css';
import Mapload from './Mapload';
import SideNavbar from './menu/SideNavbar';
import { HashRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import Music from './pages/Music';
import About from './pages/About';
 
function App() {
  return (
    <div className="App">
      <Router basename = "/">
            <SideNavbar />
            <Switch>
                <Route path='/201busproject' component={withRouter(Mapload)} />
                <Route path='/about' component={withRouter(About)} />
                <Route path='/music' component={withRouter(Music)} />
            </Switch>
        </Router>
      {/* <Mapload /> */}
    </div>
  );
}
 
export default App;