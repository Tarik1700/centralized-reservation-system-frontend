import Login from "./components/Login/Login";
import "./App.css";
import Render from "./components/AfterLogin/Render";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import TOKEN from "./helpers/api/token";
import RestaurantInformation from "./pages/RestaurantInformation/RestaurantInformation";
import Register from "./components/Register/Register";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { UserState, setUser } from "./features/auth/userSlice";
import api from "./helpers/api/api.factory";
import CreateRestaurant from "./pages/CreateRestaurant";
import Navbar from "./components/Navbar/Navbar";
import Subscription from "./pages/Subscription/Subscription";
import Payment from "./pages/Subscription/Payment";
import {
  RestaurantState,
  setRestaurant,
} from "./features/restaurants/restaurantSlice";
import ManageRules from "./components/Rules/ManageRules";
import RestaurantsCard from "./components/RestaurantsCard/RestaurantsCard";
import MyReservations from "./components/MyReservations/MyReservations";
import ReservationDetails from "./components/ReservationDetails/ReservationDetails";
import EditRestaurant from "./components/EditRestaurant/EditRestaurant";
import { Restaurant } from "./features/restaurants/restaurantSlice";

export interface RestaurantListResponse {
  _embedded: {
    restaurantList: Restaurant[];
  };
}

function App() {
  const [loggedUser, setLoggedUser] = useState<UserState>();
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const userInfo = useQuery(
    ["get_user_info"],

    () => api.fetch("get_user_info"),
    {
      onSuccess: (data: UserState) => {
        setLoggedUser(data);
        dispatch(setUser(data));
      },
      onError: (err) => {},
    }
  );

  const { refetch } = useQuery(
    ["get_restaurants"],
    () => api.fetch("get_restaurants"),
    {
      onSuccess: (data: RestaurantListResponse) => {
        if (data._embedded)
          if (data._embedded.restaurantList[0].name !== "")
            dispatch(setRestaurant(data));
        setLoading(false);
      },
      onError: (err) => {
        setLoading(false);
      },
    }
  );

  const redirectUserToLogin = () => {
    const path = window.location.pathname;
    if (!loggedUser && !TOKEN.get()) {
      if (path !== "/register" && path !== "/login") {
        window.location.pathname = "/login";
        if (path !== "/register" && path !== "/login") {
          window.location.pathname = "/login";
        }
      }
    }
  };
  return (
    <div className="App ">
      <Router>
        <Routes>
          <>
            {loggedUser && (
              <Route element={<Navbar />}>
                <>
                  <Route path="/dashboard" element={<Render />} />
                  <Route
                    path="/dashboard/restaurant/:id"
                    element={<RestaurantInformation />}
                  />
                  <Route
                    path="/create-restaurant"
                    element={<CreateRestaurant refetch={refetch} />}
                  />
                  <Route
                    path="/rules"
                    element={<RestaurantsCard cardType="rules" />}
                  />

                  <Route path="/rules/:id" element={<ManageRules />} />

                  <Route
                    path="/edit-restaurant"
                    element={<RestaurantsCard cardType="restaurant" />}
                  />

                  <Route
                    path="/edit-restaurant/:id"
                    element={<EditRestaurant refetch={refetch} />}
                  />
                  <Route path="/subscription" element={<Subscription />} />
                  <Route path="/my-reservations" element={<MyReservations />} />
                  <Route
                    path="/my-reservations/:id"
                    element={<ReservationDetails />}
                  />
                  <Route path="/subscription/payment" element={<Payment />} />
                </>
              </Route>
            )}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />

            {redirectUserToLogin()}
          </>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
