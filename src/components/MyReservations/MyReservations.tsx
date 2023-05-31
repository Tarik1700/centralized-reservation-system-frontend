import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../helpers/api/api.factory';
import { useQuery } from 'react-query';
import { Restaurant } from '../../features/restaurants/restaurantSlice';
import { ClipLoader } from 'react-spinners';
import searchAsset from '../../assets/images/search.svg';
import { UserState } from '../../features/auth/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import arrow from '../../assets/images/arrow.png';

interface Table {
  capacity: number;
  id: string;
}

export interface Reservation {
  date: string;
  endTime: string;
  menuItems: [];
  numberOfGuests: number;
  reservationId: string;
  restaurant: Restaurant;
  specialComment: string;
  startTime: string;
  table: Table;
  deleted: boolean;
}

const MyReservations = () => {
  const [myReservations, setMyReservations] = useState<Reservation[]>();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const loggedUser: UserState = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const myReservationsInfo = useQuery(
    ['get_my_reservations'],
    () => api.fetch('get_my_reservations', { id: loggedUser.user.email }),
    {
      onSuccess: (data: Reservation[]) => {
        setMyReservations(data);
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
          <img src={searchAsset} alt="" className="h-44 opacity-50" />
          <p className="text-center text-2xl mt-5 text-gray-400">
            No result found
          </p>
        </div>
      )}
      {!loading && !notFound && (
        <>
          <div className="pb-4 px-4 ">
            <h2 className="text-2xl my-6 ">My reservations</h2>
            <div className="lg:flex lg:gap-4 flex-wrap  ">
              {myReservations?.length === 0 && (
                <h3>You do not have any reservations!</h3>
              )}
              {myReservations?.map((reservation) => (
                <div
                  className="w-full lg:w-[400px] mb-4  bg-white px-4 py-3 rounded-xl shadow-sm hover:cursor-pointer"
                  key={reservation.reservationId}
                  onClick={() => {
                    navigate('/my-reservations/' + reservation.reservationId);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-normal text-xl">
                        {reservation.restaurant.name}
                      </h2>
                      <p className="text-[#9D9D9D] text-xs ml-2 mb-3">
                        {reservation.restaurant.location.address},{' '}
                        {reservation.restaurant.location.municipality}
                      </p>
                    </div>

                    {reservation.deleted && (
                      <div className="text-center cursor:pointer mb-2 font-normal text-xs  bg-[#FF605C] text-white rounded-lg px-2 py-1 self-center">
                        Cancelled
                      </div>
                    )}

                    <div className="justify-self-end self-center h-full ">
                      <div className="bg-[#64B880] bg-opacity-[85%]  rounded-full w-9 h-9 flex justify-center mr-1 mb-2 items-center hover:transition-all hover:scale-95">
                        <img src={arrow} alt="" className="rotate-180 w-5" />
                      </div>
                    </div>
                  </div>

                  <hr />

                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="font-normal text-lg">For:</h3>
                      <p className="text-[#9D9D9D] text-xs ml-2 mb-3">
                        {reservation.numberOfGuests} people
                      </p>
                    </div>

                    <div>
                      <h3 className="font-normal text-lg">Date:</h3>
                      <p className="text-[#9D9D9D] text-xs ml-2 mb-3">
                        {reservation.date}, {reservation.startTime.slice(0, 5)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyReservations;
