import { useState } from 'react';
import SearchInput from './SearchInput';
import Cards from './Cards';
import Slider from './Slider';
import restaurantSlides from '../../data/slides.json';
import { useNavigate } from 'react-router-dom';
import api from '../../helpers/api/api.factory';
import { useQuery } from 'react-query';
import ClipLoader from 'react-spinners/ClipLoader';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/auth/userSlice';

const Render = () => {
  const slides = restaurantSlides;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const userInfo = useQuery(
    ['get_user_info'],
    () => api.fetch('get_user_info'),
    {
      onSuccess: (data) => {
        dispatch(setUser(data));
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      },
    }
  );

  return (
    <div className="pb-4 ">
      <ClipLoader
        size={120}
        color={'green'}
        aria-label="Loading Spinner"
        data-testid="loader"
        loading={loading}
        className="mt-28"
      />
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
