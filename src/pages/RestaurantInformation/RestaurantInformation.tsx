import 'react-toastify/dist/ReactToastify.css';
import informationAsset from '../../assets/images/restaurant/restaurant-details/information.svg';

import pizza from '../../assets/images/restaurant/restaurant-menu/pizza.png';
import hamburger from '../../assets/images/restaurant/restaurant-menu/hamburgers.png';
import pancake from '../../assets/images/restaurant/restaurant-menu/pancakes.png';
import IRestaurantDetails from '../../interfaces/IRestaurantDetails';
import Menu from './Menu';
import IMenu from '../../interfaces/IMenu';
import Slider from './Slider';
import restaurantData from '../../data/restaurants.json';

const RestaurantInformation = () => {
  const restaurant: IRestaurantDetails | undefined = restaurantData.find(
    (restaurant) => restaurant.id === '29ijmd-2dsadi2-asdkl2'
  );

  const menu = restaurant!.menu.map((menuItem: IMenu) => (
    <Menu menuItem={menuItem} />
  ));

  return (
    <div className="text-left bg-[#FBFBF9]">
      <div className="h-44 sm:h-64 xl:h-80 2xl:h-96 ">
        <Slider images={restaurant!.images} />
      </div>

      <div className="mx-5 mt-3">
        <div className="border-[#ECECEC] border-b-[1px] mb-3"></div>
        <div className="flex justify-between items-center">
          <div className="title">
            <div className="title">
              <h2 className="text-xl">{restaurant!.name}</h2>
            </div>
            <div className="text-xs font-normal text-[#9D9D9D]">
              {restaurant!.address}
            </div>
          </div>

          <div className="flex">
            <div className="w-8 h-8 bg-[#D2D2D2] flex items-center justify-center mr-1 rounded-lg">
              <img src={informationAsset} alt="" className="h-5 w-5 " />
            </div>

            <button className="bg-[#157635] w-24 h-8 rounded-lg text-white uppercase font-normal text-[16px]">
              Reserve
            </button>
          </div>
        </div>

        <div className="pt-5">
          <p className="font-light text-base text-[#6B7280] ">
            {restaurant!.description}
          </p>
        </div>

        <div className="pt-4">
          <h2 className="text-xl mb-4">Menu</h2>
          <div className="mb-4 bg-white h-80 overflow-scroll rounded-lg shadow-md">
            {menu}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInformation;
