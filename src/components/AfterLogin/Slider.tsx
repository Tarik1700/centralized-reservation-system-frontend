import { RestaurantState } from '../../features/restaurants/restaurantSlice';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';

const Slider = () => {
  const restaurants: RestaurantState = useSelector(
    (state: RootState) => state.restaurants
  );

  const navigate = useNavigate();

  return (
    <>
      <h2 className="text-2xl mb-4 ">Popular</h2>
      <Swiper
        className="rounded-xl hover:cursor-pointer"
        modules={[Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {restaurants.restaurantList.map((restaurant, index) => {
          if (index < 5)
            return (
              <SwiperSlide
                key={restaurant.name}
                onClick={() =>
                  navigate('/dashboard/restaurant/' + restaurant.name)
                }
              >
                <div className="static ">
                  <img
                    src={restaurant.image}
                    alt=""
                    className="w-full h-52 object-cover md:h-72"
                  />

                  <div className="absolute bg-black bg-opacity-50 top-0 left-0 rounded-xl mt-3 ml-3 px-3 py-2">
                    <h3 className="text-white">{restaurant.name}</h3>
                  </div>
                </div>
              </SwiperSlide>
            );
        })}
      </Swiper>
    </>
  );
};

export default Slider;
