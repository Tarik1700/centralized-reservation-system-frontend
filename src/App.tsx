import Login from "./components/Login/Login";

import "./App.css";
import { TwButton } from "./components/TwButton/TwButton";
import Nav from "./pages/AfterLogin/Nav";
import Render from "./pages/AfterLogin/Render";

function App() {
  return (
    <div className="App">
      <Login />
      {/*<Render/>*/}
    </div>
  );
}

export default App;
