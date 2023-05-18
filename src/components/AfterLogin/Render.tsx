import { useState } from 'react';
import SearchInput from './SearchInput';
import Slider from './Slider';
import { useQuery } from 'react-query';
import ClipLoader from 'react-spinners/ClipLoader';
import { UserState, setUser } from '../../features/auth/userSlice';
import api from '../../helpers/api/api.factory';
import { useDispatch } from 'react-redux';
import { Restaurants } from './Restaurants';

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

      {!loading && (
        <>
          <SearchInput />
          <Slider />
          <Restaurants />
        </>
      )}
    </div>
  );
};
export default Render;
