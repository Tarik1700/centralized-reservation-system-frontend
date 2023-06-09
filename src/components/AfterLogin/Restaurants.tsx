import { useSelector } from "react-redux";
import { RestaurantState } from "../../features/restaurants/restaurantSlice";
import { RootState } from "../../store";
import arrow from "../../assets/images/arrow.png";
import { useNavigate } from "react-router-dom";

export const Restaurants = () => {
  const restaurants: RestaurantState = useSelector(
    (state: RootState) => state.restaurants
  );
  const navigate = useNavigate();

  return (
    <>
      <h2 className="text-2xl my-4 ">Restaurants</h2>

      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.restaurantList.map((restaurant) => (
          <div
            data-testid="restaurant-item"
            key={restaurant.name}
            onClick={() => navigate("/dashboard/restaurant/" + restaurant.name)}
            className="rounded-xl bg-white lg:mb-0 mb-6 shadow-sm hover:cursor-pointer  h-full "
          >
            <div className="flex flex-col ">
              <img
                src={restaurant.image}
                alt=""
                className="w-full h-52 object-cover rounded-t-xl "
              />

              <div className="p-3 flex h-full">
                <div className="w-[90%] h-full">
                  <h3 className="text-xl font-medium">{restaurant.name}</h3>
                  <p className="font-light text-sm text-[#6B7280] mt-1">
                    {restaurant.description}
                  </p>
                </div>
                <div className="justify-self-end self-center h-full ml-3">
                  <div className="bg-[#64B880] bg-opacity-[85%]  rounded-full w-9 h-9 flex justify-center items-center hover:transition-all hover:scale-95">
                    <img src={arrow} alt="" className="rotate-180 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
