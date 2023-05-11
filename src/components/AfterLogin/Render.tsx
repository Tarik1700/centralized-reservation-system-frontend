import { useState } from 'react';
import SearchInput from './SearchInput';
import Cards from './Cards';
import Slider from './Slider';
import restaurantSlides from '../../data/slides.json';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import ClipLoader from 'react-spinners/ClipLoader';
import { UserState, setUser } from '../../features/auth/userSlice';
import api from '../../helpers/api/api.factory';
import { useDispatch } from 'react-redux';

const Render = () => {
  const slides = restaurantSlides;
  const navigate = useNavigate();
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
    <div className="pb-4 ">
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
          <Slider slides={slides} />
          <Cards
            imgAlt="Meaningful alt text "
            imgSrc="/Images/fol.png"
            title="Restoran Park Prinčeva"
            description="Place that you must visit in Sarajevo."
            buttonLabel="Reserve"
            buttonColor="#157635"
            buttonOnClick={() => navigate('/dashboard/restaurant')}
          />
        </>
      )}
    </div>
  );
};
export default Render;
