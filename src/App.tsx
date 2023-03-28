import Login from './components/Login/Login';
import TutorialPage from './pages/TutorialPage';

import './App.css';
import { TwButton } from './components/TwButton/TwButton';
import Nav from './components/Navbar/Nav';
import Render from './pages/AfterLogin/Render';
import RestaurantInformation from './pages/RestaurantInformation/RestaurantInformation';

function App() {
  return (
    <div className="App">
      <Nav />

      {/* <Login /> */}
      {/* <Render /> */}
      <RestaurantInformation />
    </div>
  );
}

export default App;
