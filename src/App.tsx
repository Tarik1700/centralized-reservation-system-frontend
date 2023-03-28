import Login from "./components/Login/Login";
import "./App.css";
import Render from "./pages/AfterLogin/Render";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBarLayout from "./components/NavBarLayout/NavBarLayout";
import { useState } from "react";
import TOKEN from "./helpers/api/token";
import RestaurantInformation from "./pages/RestaurantInformation/RestaurantInformation";

function App() {
  const [loggedUser, setLoggedUser] = useState(TOKEN.get());

  const redirectUserToLogin = () => {
    const path = window.location.pathname;
    if (!loggedUser) {
      if (path !== "/signup" && path !== "/login") {
        window.location.pathname = "/login";
      }
    }
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <>
            {loggedUser && (
              <Route element={<NavBarLayout />}>
                <Route path="/dashboard" element={<Render />} />
                <Route
                  /*path="/dashboard/restaurant/:id"  This is the path that we need to use in the future  */
                  path="/dashboard/restaurant"
                  element={<RestaurantInformation />}
                />

                {/* Future routes */}
                {/* 
                <Route path="/current-reservations" element={< />} />    
                <Route path="/reservation-history" element={< />} />
                <Route path="/current-reservations" element={< />} />
                <Route path="/my-restaurants" element={< />} />   
                <Route path="/my-restaurants/:id/edit" element={< />} />   
                <Route path="/create-restaurant" element={< />} />
              */}
              </Route>
            )}

            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            {/* 
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/landing" element={< />} />
          */}
            {redirectUserToLogin()}
          </>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
