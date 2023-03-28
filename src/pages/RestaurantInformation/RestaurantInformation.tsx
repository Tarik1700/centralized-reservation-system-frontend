import 'react-toastify/dist/ReactToastify.css';
import informationAsset from '../../assets/images/restaurant/restaurant-details/information.svg';

import pizza from '../../assets/images/restaurant/restaurant-menu/pizza.png';
import hamburger from '../../assets/images/restaurant/restaurant-menu/hamburgers.png';
import pancake from '../../assets/images/restaurant/restaurant-menu/pancakes.png';
import IRestaurantDetails from '../../interfaces/IRestaurantDetails';
import Menu from './Menu';
import IMenu from '../../interfaces/IMenu';
import Slider from './Slider';

const RestaurantInformation = () => {
  const restaurant: IRestaurantDetails = {
    name: 'Saray Bosna',
    address: 'Butmirska cesta 21, Ilidža',
    description:
      'Here are the biggest enterprise technolog acquisitions of 2021 so far, in reverse chronological order. Here are the biggest enterprise technology acquisitions of 2021 so far.',
    menu: [
      { name: 'Margherita', price: 5, image: pizza },
      { name: 'Hamburger', price: 8, image: hamburger },
      { name: 'Pancake', price: 7, image: pancake },
    ],
    images: [
      'https://images.unsplash.com/photo-1586999768265-24af89630739?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    ],
  };

  const menu = restaurant.menu.map((menuItem: IMenu) => (
    <Menu menuItem={menuItem} />
  ));

  return (
    <div className="text-left bg-[#FBFBF9]">
      <div className="h-44 sm:h-64 xl:h-80 2xl:h-96 ">
        <Slider images={restaurant.images} />
      </div>

      <div className="mx-5 mt-3">
        <div className="border-[#ECECEC] border-b-[1px] mb-3"></div>
        <div className="flex justify-between items-center">
          <div className="title">
            <div className="title">
              <h2 className="text-xl">{restaurant.name}</h2>
            </div>
            <div className="text-xs font-normal text-[#9D9D9D]">
              {restaurant.address}
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
            {restaurant.description}
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
