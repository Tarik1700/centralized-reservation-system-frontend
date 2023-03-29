import "react-toastify/dist/ReactToastify.css";
import informationAsset from "../../assets/images/restaurant/restaurant-details/information.svg";

import pizza from "../../assets/images/restaurant/restaurant-menu/pizza.png";
import hamburger from "../../assets/images/restaurant/restaurant-menu/hamburgers.png";
import pancake from "../../assets/images/restaurant/restaurant-menu/pancakes.png";
import IRestaurantDetails from "../../interfaces/IRestaurantDetails";
import Menu from "./Menu";
import IMenu from "../../interfaces/IMenu";
import Slider from "./Slider";
import restaurantData from "../../data/restaurants.json";
import ModalGeneric from "../../components/ModalGeneric/ModalGeneric";
import { useState } from "react";
import { TwButton } from "../../components/TwButton/TwButton";
import {
  ToastHelper,
  ToastMessageType,
  ToastType,
} from "../../helpers/ToastHelper";
import { InputWithIcon } from "../../components/InputWithIcon/InputWithIcon";

const RestaurantInformation = () => {
  const restaurant: IRestaurantDetails | undefined = restaurantData.find(
    (restaurant) => restaurant.id === "29ijmd-2dsadi2-asdkl2"
  );
  const [isOpen, setIsOpen] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState("");

  const menu = restaurant!.menu.map((menuItem: IMenu, i) => (
    <Menu key={`${menuItem.name}-${i}`} menuItem={menuItem} />
  ));

  const notificationSuccess = () => {
    ToastHelper.showToast(
      "Reservation",
      ToastType.SUCCESS,
      ToastMessageType.CREATE
    );
  };

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

            <ModalGeneric
              size="sm"
              isOpen={isOpen}
              setOpen={setIsOpen}
              modalFooterClassName="justify-center"
              buttonToOpenModal={
                <TwButton
                  variation="primary"
                  color="#157635"
                  onClick={() => setIsOpen(true)}
                  className=" w-24 h-8 rounded-lg text-white uppercase font-normal text-[16px]"
                >
                  Reserve
                </TwButton>
              }
              header="Make a reservation"
              footer={
                <div className="flex justify-center items-center">
                  <div className="w-[261px]">
                    <TwButton
                      className="text-sm font-medium py-2 px-3"
                      variation="primary"
                      color="#046C4E"
                      onClick={() => {
                        notificationSuccess();
                        setIsOpen(false);
                      }}
                    >
                      CONFIRM RESERVATION
                    </TwButton>
                  </div>
                </div>
              }
            >
              <form>
                <div>
                  <input
                    type="number"
                    id="number_of_people"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Number of people"
                    required
                  />
                </div>
              </form>
            </ModalGeneric>
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
