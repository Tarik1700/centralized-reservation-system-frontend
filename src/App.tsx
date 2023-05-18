import Login from './components/Login/Login';
import './App.css';
import Render from './components/AfterLogin/Render';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import NavBarLayout from './components/NavBarLayout/NavBarLayout';
import { useState } from 'react';
import TOKEN from './helpers/api/token';
import RestaurantInformation from './pages/RestaurantInformation/RestaurantInformation';
import Register from './components/Register/Register';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { UserState, setUser } from './features/auth/userSlice';
import api from './helpers/api/api.factory';
import CreateRestaurant from './pages/CreateRestaurant';
import Navbar from './components/Navbar/Navbar';
import Subscription from './pages/Subscription/Subscription';
import Payment from './pages/Subscription/Payment';
import {
  RestaurantState,
  setRestaurant,
} from './features/restaurants/restaurantSlice';

function App() {
  const [loggedUser, setLoggedUser] = useState<UserState>();
  const [restaurants, setRestaurants] = useState<RestaurantState>();
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const userInfo = useQuery(
    ['get_user_info'],

    () => api.fetch('get_user_info'),
    {
      onSuccess: (data: UserState) => {
        setLoggedUser(data);
        dispatch(setUser(data));
      },
      onError: (err) => {},
    }
  );

  const restaurantsInfo = useQuery(
    ['get_restaurants'],
    () => api.fetch('get_restaurants'),
    {
      onSuccess: (data: RestaurantState) => {
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
      if (path !== '/register' && path !== '/login') {
        window.location.pathname = '/login';
        if (path !== '/register' && path !== '/login') {
          window.location.pathname = '/login';
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
                  {/* <Route path="/test" element={< />}></Route> */}
                  <Route
                    /*path="/dashboard/restaurant/:id"  This is the path that we need to use in the future  */
                    path="/dashboard/restaurant/:id"
                    element={<RestaurantInformation />}
                  />
                  <Route
                    path="/create-restaurant"
                    element={<CreateRestaurant />}
                  />
                  <Route path="/subscription" element={<Subscription />} />
                  <Route path="/subscription/payment" element={<Payment />} />
                  {/* Future routes */}
                  {/* 
                <Route path="/current-reservations" element={< />} />    
                <Route path="/reservation-history" element={< />} />
                <Route path="/current-reservations" element={< />} />
                <Route path="/my-restaurants" element={< />} />   
                <Route path="/my-restaurants/:id/edit" element={< />} />   
           
              */}
                </>
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
