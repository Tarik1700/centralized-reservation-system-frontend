import Login from "./components/Login/Login";
import "./App.css";
import Render from "./components/AfterLogin/Render";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBarLayout from "./components/NavBarLayout/NavBarLayout";
import { useState } from "react";
import TOKEN from "./helpers/api/token";
import RestaurantInformation from "./pages/RestaurantInformation/RestaurantInformation";
import Register from "./components/Register/Register";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { UserState, setUser } from "./features/auth/userSlice";
import api from "./helpers/api/api.factory";
import CreateRestaurant from "./pages/CreateRestaurant";

function App() {
  const [loggedUser, setLoggedUser] = useState<UserState>();
  const [loading, setLoading] = useState(true);

  const redirectUserToLogin = () => {
    const path = window.location.pathname;
    if (!loggedUser) {
      if (path !== "/register" && path !== "/login") {
        window.location.pathname = "/login";
      }
    }
  };

  const dispatch = useDispatch();

  const userInfo = useQuery(
    ["get_user_info"],
    () => api.fetch("get_user_info"),
    {
      onSuccess: (data: UserState) => {
        setLoggedUser(data);
        dispatch(setUser(data));
        setLoading(false);
      },
      onError: (err) => {
        setLoading(false);
        console.log(err);
      },
    }
  );

  return (
    <div className="App ">
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
                <Route
                  path="/create-restaurant"
                  element={<CreateRestaurant />}
                />
                {/* Future routes */}
                {/* 
                <Route path="/current-reservations" element={< />} />    
                <Route path="/reservation-history" element={< />} />
                <Route path="/current-reservations" element={< />} />
                <Route path="/my-restaurants" element={< />} />   
                <Route path="/my-restaurants/:id/edit" element={< />} />   
           
              */}
              </Route>
            )}
            <Route path="/register" element={<Register />} />
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
