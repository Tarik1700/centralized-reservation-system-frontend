import { useState } from 'react';
import SearchInput from './SearchInput';
import Slider from './Slider';
import { useQuery } from 'react-query';
import ClipLoader from 'react-spinners/ClipLoader';
import { UserState, setUser } from '../../features/auth/userSlice';
import api from '../../helpers/api/api.factory';
import { useDispatch, useSelector } from 'react-redux';
import { Restaurants } from './Restaurants';
import { RootState } from '../../store';
import { RestaurantState } from '../../features/restaurants/restaurantSlice';
import searchAsset from '../../assets/images/search.svg';

const Render = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const userInfo = useQuery(
    ['get_user_info'],
    () => api.fetch('get_user_info'),
    {
      onSuccess: (data: UserState) => {
        dispatch(setUser(data));
        setLoading(false);
      },
      onError: (err) => {
        setLoading(false);
      },
    }
  );

  const restaurants: RestaurantState = useSelector(
    (state: RootState) => state.restaurants
  );

  return (
    <div className="pb-4 px-4">
      <div className="flex justify-center">
        <ClipLoader
          size={120}
          color={'green'}
          aria-label="Loading Spinner"
          data-testid="loader"
          loading={loading}
          className="mt-28 "
        />
      </div>

      {!loading && restaurants.restaurantList[0].name !== '' && (
        <>
          <SearchInput />
          <Slider />
          <Restaurants />
        </>
      )}

      {!loading && restaurants.restaurantList[0].name === '' && (
        <>
          <SearchInput />
          <div className="flex flex-col justify-center mt-24">
            <img src={searchAsset} alt="" className="h-44 opacity-50" />
            <p className="text-center text-2xl mt-5 text-gray-400">
              No restaurants available
            </p>
          </div>
        </>
      )}
    </div>
  );
};
export default Render;
