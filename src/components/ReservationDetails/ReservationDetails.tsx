import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../helpers/api/api.factory";
import { useMutation, useQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import search from "../../assets/images/search.svg";
import { Reservation } from "../MyReservations/MyReservations";
import {
  ToastHelper,
  ToastMessageType,
  ToastType,
} from "../../helpers/ToastHelper";
import axios from "axios";

const ReservationDetails = () => {
  const [reservation, setReservation] = useState<Reservation | undefined>();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const { mutate } = useMutation(
    () => api.fetch<any>("delete_reservation", { id: params.id }),

    {
      onSuccess: (res: any) => {
        ToastHelper.showToast(
          "Reservation cancelled successfully",
          ToastType.SUCCESS,
          ToastMessageType.CUSTOM
        );
        navigate("/my-reservations");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          ToastHelper.showToast(
            error.message,
            ToastType.ERROR,
            ToastMessageType.CUSTOM
          );
        }
      },
    }
  );

  const reservationDetailsInfo = useQuery(
    ["get_reservation_details"],
    () => api.fetch("get_reservation_details", { id: params.id }),
    {
      onSuccess: (data: Reservation) => {
        setReservation(data);
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
          color={"green"}
          aria-label="Loading Spinner"
          data-testid="loader"
          loading={loading}
          className="mt-28 "
        />
      </div>
      {notFound && (
        <div className="flex flex-col justify-center mt-24">
          <img src={search} alt="" className="h-44 opacity-50" />
          <p className="text-center text-2xl mt-5 text-gray-400">
            No result found
          </p>
        </div>
      )}
      {!loading && !notFound && (
        <div className="text-left bg-white mx-4 lg:flex rounded-b-lg lg:m-4 lg:rounded-xl">
          <div className="h-44 sm:h-64 xl:h-80 lg:h-[300px] lg:order-2 lg:w-[60%] ">
            <img
              src={reservation!.restaurant!.image}
              alt=""
              className="object-cover w-full h-full lg:rounded-r-xl lg:rounded-l-none rounded-b-lg "
            />
          </div>

          <div className="mx-5 mt-3 lg:w-[40%] ">
            <div className="flex justify-between items-center mb-2">
              <div className="title">
                <div className="title">
                  <h2 className="text-xl">{reservation!.restaurant!.name}</h2>
                </div>
                <div className="text-xs pl-2 mb-2 font-normal text-[#9D9D9D]">
                  {reservation!.restaurant!.location.address},{" "}
                  {reservation!.restaurant!.location.municipality}
                </div>
              </div>

              {reservation?.deleted && (
                <div>
                  <button className="cursor:pointer font-normal  bg-[#FF605C] text-white rounded-lg px-3 text-sm py-2">
                    Cancelled
                  </button>
                </div>
              )}
            </div>

            <hr />

            <div className="mt-4 flex justify-between lg:justify-start">
              <div>
                <h3 className="font-normal text-lg">For:</h3>
                <p className="text-[#9D9D9D] text-xs ml-2 mb-3">
                  {reservation!.numberOfGuests} people
                </p>
              </div>

              <div className="lg:ml-40">
                <h3 className="font-normal text-lg ">Date:</h3>
                <p className="text-[#9D9D9D] text-xs ml-2 mb-3">
                  {reservation!.date}, {reservation!.startTime.slice(0, 5)}
                </p>
              </div>
            </div>

            <hr />

            <div>
              <h3 className="font-normal text-lg mt-2 pb-2">
                Special request:
              </h3>

              <p className="text-[#9D9D9D] text-base ml-2 mb-2 pb-4">
                {reservation?.specialComment !== "" ? (
                  reservation?.specialComment
                ) : (
                  <span className="mb-4">No special requests</span>
                )}
              </p>
            </div>

            {!reservation?.deleted && (
              <>
                <hr />
                <div className="flex justify-end items-center mt-2 lg:mt-5">
                  <button
                    onClick={() => mutate()}
                    className="cursor:pointer font-normal text-lg bg-[#FF605C] text-white rounded-lg px-4 py-2"
                  >
                    Cancel reservation
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ReservationDetails;
