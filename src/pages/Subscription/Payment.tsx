import { InputWithIcon } from '../../components/InputWithIcon/InputWithIcon';
import { useState } from 'react';
import {
  ToastHelper,
  ToastMessageType,
  ToastType,
} from '../../helpers/ToastHelper';
import { useMutation } from 'react-query';
import api from '../../helpers/api/api.factory';
import axios from 'axios';
import { UserState } from '../../features/auth/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Payment = () => {
  const [name, setName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>();
  const [expirationDate, setExpirationDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>();
  const [terms, setTerms] = useState<boolean>(false);

  const loggedUser: UserState = useSelector((state: RootState) => state.auth);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cardNumber!.length < 16)
      return notificationError('Invalid card number');
    if (!expirationDate.includes('/'))
      return notificationError('Bad expiration date format');
    if (cvv!.length < 3) return notificationError('Invalid CVV number');
    if (!terms)
      return notificationError(
        'You must agree to the Terms of Use in order to make a subscription'
      );
    mutate();
  };

  const notificationError = (message: string) => {
    ToastHelper.showToast(message, ToastType.ERROR, ToastMessageType.CUSTOM);
  };

  const { mutate } = useMutation(
    () => api.fetch<any>('post_subscription', {}),

    {
      onSuccess: (res: any) => {
        ToastHelper.showToast(
          'Your subscription is accepted!',
          ToastType.SUCCESS,
          ToastMessageType.CUSTOM
        );
        window.location.reload();
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

  return (
    <>
      {loggedUser.user.role === 'OWNER' ? (
        <div className="mt-8 mx-4">
          <h2 className="font-medium text-2xl ">Subscription</h2>
          <h3 className="mt-4">Your subscription is active!</h3>
        </div>
      ) : (
        <div>
          <div className="mt-8 mx-4">
            <h2 className="font-medium text-2xl ">Payment</h2>
            <p className="text-sm mt-2 text-[#9D9D9D]">
              All information should be provided in order to achieve successful
              payment.
            </p>

            <form
              className="space-y-4 md:space-y-6 sm:max-w-[700px] sm:mr-4 mt-7"
              onSubmit={handleSubmit}
            >
              <div>
                <InputWithIcon
                  type="text"
                  name="name"
                  placeholder="Name and Surname"
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  required
                  value={name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setName(event.target.value)
                  }
                  inputBaseClasses="text-gray-900 border-gray-300 bg-gray-50"
                  inputErrorClasses="border-red-500"
                  inputSuccessClasses="border-green-500"
                  labelBaseClasses="text-gray-900"
                  labelErrorClasses="text-red-500"
                  labelSuccessClasses="text-green-500"
                  inputSizing="py-4 px-4"
                />
              </div>

              <div>
                <InputWithIcon
                  type="number"
                  name="cardNumber"
                  maxLength={12}
                  placeholder="Card Number"
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  required
                  value={cardNumber}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (event.target.value.length < 17)
                      setCardNumber(event.target.value);
                  }}
                  inputBaseClasses="text-gray-900 border-gray-300 bg-gray-50"
                  inputErrorClasses="border-red-500"
                  inputSuccessClasses="border-green-500"
                  labelBaseClasses="text-gray-900"
                  labelErrorClasses="text-red-500"
                  labelSuccessClasses="text-green-500"
                  inputSizing="py-4 px-4"
                />
              </div>
              <div className="flex justify-between">
                <div className="w-[80%]">
                  <InputWithIcon
                    type="text"
                    name="expirationDate "
                    placeholder="Expiration Date"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    required
                    value={expirationDate}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      if (event.target.value.length < 6)
                        setExpirationDate(event.target.value);
                    }}
                    inputBaseClasses="text-gray-900 border-gray-300 bg-gray-50"
                    inputErrorClasses="border-red-500"
                    inputSuccessClasses="border-green-500"
                    labelBaseClasses="text-gray-900"
                    labelErrorClasses="text-red-500"
                    labelSuccessClasses="text-green-500"
                    inputSizing="py-4 px-4"
                  />
                </div>
                <div className="ml-3 w-[20%] ">
                  <InputWithIcon
                    type="number"
                    maxLength={4}
                    name="cvv"
                    placeholder="CVV"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    required
                    value={cvv}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      if (event.target.value.length < 4)
                        setCvv(event.target.value);
                    }}
                    inputBaseClasses="text-gray-900 border-gray-300 bg-gray-50"
                    inputErrorClasses="border-red-500"
                    inputSuccessClasses="border-green-500"
                    labelBaseClasses="text-gray-900"
                    labelErrorClasses="text-red-500"
                    labelSuccessClasses="text-green-500"
                    inputSizing="py-4 px-4"
                  />
                </div>
              </div>
              <div className="pb-2">
                <input
                  type="checkbox"
                  checked={terms}
                  className="border-[#C6C6C6] hover:cursor-pointer rounded-[0.2rem] h-5 w-5 "
                  onChange={() => setTerms((checked) => !checked)}
                />
                <span
                  className="text-[#9D9D9D] pl-2 text-sm hover:cursor-pointer"
                  onClick={() => setTerms((checked) => !checked)}
                >
                  I have read and accept the{' '}
                  <span className="text-[#157635]  ">Terms of Use</span>{' '}
                </span>
              </div>

              <button
                type="submit"
                className=" bg-[#157635] w-full disabled:opacity-25 sm:w-80 rounded-lg   text-white h-12 text-lg hover:cursor-pointer"
              >
                Confirm payment
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
