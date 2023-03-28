import './App.css';
import Nav from './components/Navbar/Nav';
import RestaurantInformation from './pages/RestaurantInformation/RestaurantInformation';

function App() {
  return (
    <div className="App">
      <Nav />

      {/* <Render /> */}
      <RestaurantInformation />
    </div>
  );
}

export default App;
