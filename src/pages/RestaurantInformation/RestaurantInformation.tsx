import 'react-toastify/dist/ReactToastify.css';
import informationAsset from '../../assets/images/restaurant/restaurant-details/information.svg';

import Menu from './Menu';
import IMenu from '../../interfaces/IMenu';
import ModalGeneric from '../../components/ModalGeneric/ModalGeneric';
import { useState } from 'react';
import { TwButton } from '../../components/TwButton/TwButton';
import {
  ToastHelper,
  ToastMessageType,
  ToastType,
} from '../../helpers/ToastHelper';
import Datepicker from 'tailwind-datepicker-react';
import { ModalGenericNew } from '../../components/ModalGeneric/ModalGenericNew';
import { useParams } from 'react-router-dom';
import api from '../../helpers/api/api.factory';
import { useQuery } from 'react-query';
import { Restaurant } from '../../features/restaurants/restaurantSlice';
import { ClipLoader } from 'react-spinners';
import searchAsset from '../../assets/images/search.svg';

const RestaurantInformation = () => {
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [menu, setMenu] = useState<IMenu[]>();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const params = useParams();

  interface RestaurantDetails {
    restaurant: Restaurant;
    menuItems: IMenu[];
  }

  const restaurantsInfo = useQuery(
    ['get_restaurant'],
    () => api.fetch('get_restaurant', { id: params.id }),
    {
      onSuccess: (data: RestaurantDetails) => {
        setRestaurant(data.restaurant);
        setMenu(data.menuItems);
        setLoading(false);
      },
      onError: (err) => {
        setNotFound(true);
        setLoading(false);
      },
    }
  );

  const [isOpen, setIsOpen] = useState(false);
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [show, setShow] = useState<boolean>(false);
  const handleChange = (selectedDate: Date) => {
    console.log(selectedDate);
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const openInfoModal = () => setInfoIsOpen(true);
  const closeInfoModal = () => setInfoIsOpen(false);

  const notificationSuccess = () => {
    ToastHelper.showToast(
      'Reservation',
      ToastType.SUCCESS,
      ToastMessageType.CREATE
    );
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Add logic for handling time change here
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    // Add logic for handling text area change here
  };

  const options = {
    autoHide: true,
    todayBtn: true,
    clearBtn: true,
    //TODO: when we decide what is the max date in advance that someone can reserve, we will set it here to generate automatically based on todays date.
    maxDate: new Date('2030-01-01'),
    minDate: new Date('1950-01-01'),
    language: 'en',
  };

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
          <img src={searchAsset} alt="" className="h-44 opacity-50" />
          <p className="text-center text-2xl mt-5 text-gray-400">
            No result found
          </p>
        </div>
      )}
      {!loading && !notFound && (
        <div className="text-left bg-[#FBFBF9]">
          <div className="h-44 sm:h-64 xl:h-80 2xl:h-96  ">
            <img
              src={restaurant!.image}
              alt=""
              className="object-cover w-full h-full rounded-b-lg "
            />
          </div>

          <div className="mx-5 mt-3">
            <div className="border-[#ECECEC] border-b-[1px] mb-3"></div>
            <div className="flex justify-between items-center">
              <div className="title">
                <div className="title">
                  <h2 className="text-xl">{restaurant!.name}</h2>
                </div>
                <div className="text-xs font-normal text-[#9D9D9D]">
                  {restaurant!.location.address},{' '}
                  {restaurant!.location.municipality}
                </div>
              </div>

              <div className="flex gap-2">
                <TwButton
                  variation="primary"
                  color="#D2D2D2"
                  onClick={openInfoModal}
                  className=" h-8 w-8 flex items-center justify-center rounded-lg p-0"
                >
                  <img src={informationAsset} alt="" className="h-5 w-5 " />
                </TwButton>

                <ModalGenericNew
                  size="sm"
                  isOpen={infoIsOpen}
                  onClose={closeInfoModal}
                  position="center"
                  modalFooterClassName="justify-center"
                  title="More info"
                >
                  <div className=" border-solid border-gray-300 border-[1px] rounded-[10px] ">
                    <div className="ml-[13px] flex flex-col gap-[25px] mt-2 mb-2 py-4">
                      <p>
                        <b>Address: </b>
                        {restaurant!.location.address}
                      </p>
                      <p>
                        <b>Tel: </b>
                        {restaurant!.phoneNumber.slice(0, 3) +
                          ' ' +
                          restaurant!.phoneNumber.slice(3, 6) +
                          '-' +
                          restaurant!.phoneNumber.slice(6)}
                      </p>
                      <p>
                        <b>Work hours:</b>
                      </p>
                      <div className="flex flex-col gap-[17px] ml-[16px]">
                        <p>
                          <b>MON - SUN | </b>{' '}
                          {restaurant?.workingHours.openTime.slice(0, 5)} -{' '}
                          {restaurant?.workingHours.closeTime.slice(0, 5)}
                        </p>
                      </div>
                    </div>
                  </div>
                </ModalGenericNew>

                <TwButton
                  variation="primary"
                  color="#157635"
                  onClick={openModal}
                  className="w-24 h-8 rounded-lg text-white uppercase font-normal text-[16px]"
                >
                  Reserve
                </TwButton>
                <ModalGenericNew
                  size="sm"
                  isOpen={isOpen}
                  onClose={closeModal}
                  position="center"
                  modalFooterClassName="justify-center"
                  title="Make a reservation"
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
                    <div className="flex gap-7 flex-col">
                      <div>
                        <input
                          type="number"
                          id="number_of_people"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Number of people"
                          required
                        />
                      </div>
                      <div className="">
                        <Datepicker
                          options={options}
                          onChange={handleChange}
                          show={show}
                          setShow={handleClose}
                        />
                      </div>
                      <div>
                        <input
                          type="time"
                          id="reservation_time"
                          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                          onChange={handleTimeChange}
                        />
                      </div>
                      <div>
                        <textarea
                          id="additional_notes"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Have some special comments?"
                          rows={8}
                          onChange={handleTextAreaChange}
                        />
                      </div>
                      <div></div>
                    </div>
                  </form>
                </ModalGenericNew>
              </div>
            </div>

            <div className="pt-5">
              <p className="font-light text-base text-[#6B7280] ">
                {restaurant!.description}
              </p>
            </div>
            <div className="py-4 ">
              <h2 className="text-xl mb-4">Menu</h2>
              <div className="mb-4 bg-white h-80 overflow-scroll rounded-lg shadow-md">
                {menu &&
                  menu.map((menuItem: IMenu, i) => (
                    <Menu key={`${menuItem.name}-${i}`} menuItem={menuItem} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantInformation;
