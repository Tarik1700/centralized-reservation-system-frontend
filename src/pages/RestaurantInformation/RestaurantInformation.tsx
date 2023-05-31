import 'react-toastify/dist/ReactToastify.css';
import informationAsset from '../../assets/images/restaurant/restaurant-details/information.svg';
import { format } from 'date-fns';
import Menu from './Menu';
import IMenu from '../../interfaces/IMenu';
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
import { useMutation, useQuery } from 'react-query';
import { Restaurant } from '../../features/restaurants/restaurantSlice';
import { ClipLoader } from 'react-spinners';
import searchAsset from '../../assets/images/search.svg';
import { UserState } from '../../features/auth/userSlice';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import axios from 'axios';
import deleteOrderItem from '../../assets/images/deletetable.png';

interface Order {
  name: string;
  price: number;
  category: string;
  image: string;
}

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

  const handleOrder = (e: IMenu) => {
    ToastHelper.showToast(
      e.name + ' has been added to your order.',
      ToastType.SUCCESS,
      ToastMessageType.CUSTOM
    );

    setOrder((prev) => [
      ...prev,
      { name: e.name, price: e.price, category: e.category, image: e.image },
    ]);
  };

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
  const loggedUser: UserState = useSelector((state: RootState) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);

  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [specialComment, setSpecialComment] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [reservationEndTime, setReservationEndTime] = useState('');
  const [reservationDate, setReservationDate] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);
  const [showDiscount, setShowDiscount] = useState<boolean>(false);
  const [showOrderScreen, setShowOrderScreen] = useState(false);
  const [discountAmount, setDiscountAmount] = useState({
    oldAmount: 0,
    newAmount: 0,
  });

  const [order, setOrder] = useState<Order[]>([]);

  const handleChange = (selectedDate: Date) => {
    setReservationDate(selectedDate);
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const openInfoModal = () => setInfoIsOpen(true);
  const closeInfoModal = () => setInfoIsOpen(false);

  const { mutate } = useMutation(
    () =>
      api.fetch<any>('post_reservation', {
        numberOfGuests: parseInt(numberOfPeople),
        date: format(reservationDate, 'yyyy-MM-dd'),
        startTime: reservationTime,
        endTime: reservationEndTime,
        specialComment,
        restaurant: {
          name: restaurant?.name,
        },
        user: {
          email: loggedUser.user.email,
        },
        menuItems: order,
      }),
    {
      onSuccess: (res: any) => {
        if (res.priceBeforeDiscount - res.priceAfterDiscount > 0) {
          setShowDiscount(true);
          setDiscountAmount({
            oldAmount: res.priceBeforeDiscount,
            newAmount: res.priceAfterDiscount,
          });
          notificationSuccess();
        } else {
          notificationSuccess();
        }
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            ToastHelper.showToast(
              error.response.data,
              ToastType.ERROR,
              ToastMessageType.CUSTOM
            );
          }
        }
      },
    }
  );

  const handleReservation = () => {
    mutate();
  };

  const handleReservationInfo = () => {
    setIsOrderOpen(true);
    setIsOpen(false);
  };

  const handleDeleteOrderItem = (item: number) => {
    setOrder((orderItem) =>
      orderItem.filter((currItem, itemIndex) => {
        if (itemIndex !== item) {
          return currItem;
        }
      })
    );
  };

  const notificationSuccess = () => {
    ToastHelper.showToast(
      'Reservation',
      ToastType.SUCCESS,
      ToastMessageType.CREATE
    );
  };

  const options = {
    autoHide: true,
    todayBtn: true,
    clearBtn: true,
    maxDate: new Date('2030-01-01'),
    minDate: new Date('2023-05-27'),
    language: 'en',
    defaultDate: new Date(),
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
                  size="md"
                  isOpen={isOpen}
                  onClose={closeModal}
                  position="center"
                  modalFooterClassName="justify-center"
                  title="Make a reservation"
                >
                  <form id="reservationForm" onSubmit={handleReservationInfo}>
                    <div className="flex gap-7 flex-col">
                      <div>
                        <input
                          type="number"
                          id="number_of_people"
                          value={numberOfPeople}
                          onChange={(e) => setNumberOfPeople(e.target.value)}
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
                      <div className="flex items-center">
                        <p className="mr-4 text-sm">From: </p>
                        <input
                          type="time"
                          id="reservation_time"
                          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                          value={reservationTime}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => setReservationTime(event.target.value)}
                        />
                      </div>
                      <div className="flex items-center">
                        <p className="mr-4 text-sm">Until: </p>
                        <input
                          type="time"
                          id="reservation_endTime"
                          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                          value={reservationEndTime}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => setReservationEndTime(event.target.value)}
                        />
                      </div>
                      <div>
                        <textarea
                          id="additional_notes"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Have some special requests?"
                          rows={8}
                          value={specialComment}
                          onChange={(e) => setSpecialComment(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex mt-4 w-full justify-end items-center">
                      <TwButton
                        className="text-sm font-medium py-2 px-3  w-32"
                        variation="primary"
                        color="#046C4E"
                        type="submit"
                      >
                        NEXT
                      </TwButton>
                    </div>
                  </form>
                </ModalGenericNew>

                <ModalGenericNew
                  size="sm"
                  isOpen={isOrderOpen}
                  onClose={() => setIsOrderOpen(false)}
                  position="center"
                  modalClassName=" mt-4 overflow-scroll"
                  modalFooterClassName="justify-center"
                  title="Select your order"
                  footer={
                    <div className="flex justify-end items-center w-full">
                      <div className="flex items-center">
                        <div
                          className="relative"
                          onClick={() => {
                            setShowOrderScreen(true);
                            setIsOrderOpen(false);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 text-gray-400 mr-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                          </svg>

                          <div className="absolute top-[-10px] left-3 bg-red-600 text-white rounded-full text-center w-5 h-5 text-sm">
                            {order.length}
                          </div>
                        </div>

                        <TwButton
                          className="text-sm disabled:text-black disabled:bg-gray-200 font-medium py-2 px-3 w-32"
                          disabled={order.length === 0}
                          variation="primary"
                          color="#046C4E"
                          onClick={() => {
                            if (order.length > 0) {
                              setIsOrderOpen(false);
                              setIsOverviewOpen(true);
                            }
                          }}
                        >
                          NEXT
                        </TwButton>
                      </div>
                    </div>
                  }
                >
                  <form>
                    <div className="flex flex-col">
                      <div>
                        <div className="py-4 max-h-72 overflow-scroll flex flex-wrap">
                          {menu &&
                            menu.map((menuItem: IMenu, i) => (
                              <div
                                key={menuItem.name}
                                className="menu-item  hover:cursor-pointer border-[#ECECEC] border-[1px] py-2 rounded-lg  w-[45%] mr-3 mb-3 flex flex-col justify-center items-center "
                                onClick={() => handleOrder(menuItem)}
                              >
                                <div className="item-image ">
                                  <img
                                    className="h-20 w-20 object-cover rounded-xl"
                                    src={menuItem.image}
                                    alt=""
                                  />
                                </div>

                                <div className="border-[#ECECEC] border-[1px] w-[90%] flex flex-col items-center rounded-lg mt-2">
                                  <div className="text-base mt-1">
                                    {menuItem.name}
                                  </div>
                                  <div className="border-b-[#ECECEC] border-b-[1px] w-[70%] my-1"></div>
                                  <div className="item-price mb-1">
                                    {menuItem.price} KM
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </form>
                </ModalGenericNew>
                <ModalGenericNew
                  size="sm"
                  isOpen={isOverviewOpen}
                  onClose={() => setIsOverviewOpen(false)}
                  position="center"
                  modalClassName=" mt-4 overflow-scroll"
                  modalFooterClassName="justify-center"
                  title="Reservation details"
                  footer={
                    <div className="flex justify-end items-center w-full">
                      <div className="flex">
                        <TwButton
                          className="text-sm font-medium py-2 px-3 w-32"
                          variation="primary"
                          color="#046C4E"
                          onClick={() => {
                            handleReservation();
                            setIsOverviewOpen(false);
                          }}
                        >
                          RESERVE
                        </TwButton>
                      </div>
                    </div>
                  }
                >
                  <p>
                    Number of people:
                    <span className="ml-2 px-2 text-center bg-gray-100">
                      {numberOfPeople}
                    </span>
                  </p>
                  <p>
                    Reservation date:
                    <span className="ml-2 px-2 text-center bg-gray-100">
                      {reservationDate.getDate() +
                        '.' +
                        (reservationDate.getMonth() + 1) +
                        '.' +
                        reservationDate.getFullYear() +
                        '.'}
                    </span>
                  </p>
                  <p>Reservation time:</p>
                  <span>
                    From:
                    <span className="mx-2 px-2 text-center bg-gray-100">
                      {reservationTime}
                    </span>
                    Until:
                    <span className="ml-2 px-2 text-center bg-gray-100">
                      {reservationEndTime}
                    </span>
                  </span>
                  <p>Additional comment:</p>
                  <p className=" px-2  bg-gray-100">{specialComment}</p>
                  <div>
                    Order:
                    {order.map((order) => {
                      return (
                        <p
                          className=" px-2  bg-gray-100 flex justify-between"
                          key={order.price * Math.random()}
                        >
                          {order.name}

                          <span>{order.price} KM</span>
                        </p>
                      );
                    })}
                  </div>

                  <p className="flex justify-between">
                    Total:
                    <span className="pr-2">
                      {order.reduce((acc, curr) => {
                        return acc + curr.price;
                      }, 0)}{' '}
                      KM
                    </span>
                  </p>
                </ModalGenericNew>
                <ModalGenericNew
                  size="sm"
                  isOpen={showDiscount}
                  onClose={() => setShowDiscount(false)}
                  position="center"
                  modalClassName=" mt-4 overflow-scroll  text-center"
                  modalFooterClassName="justify-center"
                  title="Discount"
                  footer={
                    <div className="flex justify-center items-center w-full">
                      <div className="flex">
                        <TwButton
                          className="text-sm font-medium py-2 px-3 w-32"
                          variation="primary"
                          color="#046C4E"
                          onClick={() => {
                            setShowDiscount(false);
                          }}
                        >
                          CLOSE
                        </TwButton>
                      </div>
                    </div>
                  }
                >
                  <div>
                    <p>
                      You have received a{' '}
                      <span className="text-[#046C4E]">discount</span>! Your
                      payment amount is now{' '}
                      {discountAmount.newAmount.toFixed(2)}KM, instead of{' '}
                      {discountAmount.oldAmount.toFixed(2)}KM.
                    </p>
                  </div>
                </ModalGenericNew>
                <ModalGenericNew
                  size="sm"
                  isOpen={showOrderScreen}
                  onClose={() => setShowOrderScreen(false)}
                  position="center"
                  modalClassName=" mt-4 overflow-scroll  text-center"
                  modalFooterClassName="justify-center"
                  title="Your order"
                  footer={
                    <div className="flex justify-center items-center w-full">
                      <div className="flex">
                        <TwButton
                          className="text-sm font-medium py-2 px-3 w-32"
                          variation="primary"
                          color="#046C4E"
                          onClick={() => {
                            setShowOrderScreen(false);
                            setIsOrderOpen(true);
                          }}
                        >
                          BACK
                        </TwButton>
                      </div>
                    </div>
                  }
                >
                  {order.length > 0 ? (
                    <div className="text-left">
                      {order.map((orderItem, index) => {
                        return (
                          <div className="flex justify-between" key={index}>
                            <div>{orderItem.name}</div>

                            <div className="flex items-center">
                              {orderItem.price}KM{' '}
                              <img
                                className="w-4 h-4 ml-2"
                                src={deleteOrderItem}
                                alt=""
                                onClick={() => handleDeleteOrderItem(index)}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div>You did not add items to your order!</div>
                  )}
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
              <div className="mb-4 bg-white h-80 overflow-scroll rounded-lg shadow-md py-4">
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
