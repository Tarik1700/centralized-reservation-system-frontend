import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../helpers/api/api.factory';
import { useQuery } from 'react-query';
import { Restaurant } from '../../features/restaurants/restaurantSlice';
import { ClipLoader } from 'react-spinners';

interface Props {
  cardType: string;
}

const RestaurantsCard = (props: Props) => {
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const navigate = useNavigate();

  const restaurantsInfo = useQuery(
    ['get_owned_restaurants'],
    () => api.fetch('get_owned_restaurants', {}),
    {
      onSuccess: (data: Restaurant) => {
        setRestaurant(data);
        setLoading(false);
      },
      onError: (err) => {
        setNotFound(true);
        setLoading(false);
      },
    }
  );

  return (
    <>
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
      {notFound && (
        <div className="flex flex-col justify-center mt-24">
          <p className="text-center text-2xl mt-5 text-gray-400">
            You do not have any restaurant added!
          </p>
        </div>
      )}
      {!loading && !notFound && (
        <>
          <div className="pb-4 px-4">
            <h2 className="text-2xl my-6 ">Choose a restaurant</h2>
            <div className="md:flex gap-4  flex-wrap ">
              <div
                onClick={() => navigate(restaurant!.name)}
                className="rounded-xl  bg-white lg:mb-0 mb-6 shadow-sm hover:cursor-pointer md:w-[380px] h-full "
              >
                <div className="flex  ">
                  <img
                    src={restaurant!.image}
                    alt=""
                    className="w-[45%] object-cover rounded-l-xl "
                  />

                  <div className="p-3 w-[55%] h-full flex flex-col">
                    <div className=" h-full">
                      <h3 className="text-xl font-medium">
                        {restaurant!.name}
                      </h3>
                      <p className="font-light text-sm text-[#6B7280] mt-1">
                        {restaurant!.location.address}
                      </p>
                      <p className="font-light text-sm text-[#6B7280] mt-1">
                        {restaurant!.location.municipality}
                      </p>
                    </div>
                    <button className=" bg-[#046C4E] text-sm text-white py-2 px-4 rounded-xl mt-3">
                      Edit {props.cardType}
                    </button>
                    <div className="justify-self-end self-center h-full ml-3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RestaurantsCard;
