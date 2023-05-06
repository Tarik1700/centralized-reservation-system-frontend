import React, { useState } from 'react';
import {
  ToastHelper,
  ToastMessageType,
  ToastType,
} from '../../helpers/ToastHelper';
import 'react-toastify/dist/ReactToastify.css';
import { InputWithIcon } from '../InputWithIcon/InputWithIcon';
import { TwButton } from '../TwButton/TwButton';
import { NavLink, useNavigate } from 'react-router-dom';
import TOKEN from '../../helpers/api/token';
import { useMutation } from 'react-query';
import api from '../../helpers/api/api.factory';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const notificationError = (message: string) => {
    ToastHelper.showToast(message, ToastType.ERROR, ToastMessageType.CUSTOM);
  };

  const { mutate } = useMutation(
    () =>
      api.fetch<any>('register_user', {
        name,
        surname,
        email,
        password,
        confirmPassword,
      }),
    {
      onSuccess: (res: any) => {
        TOKEN.set(res.token);
        navigate('/dashboard');
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          notificationError(error.message);
        }
      },
    }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password.length < 8) {
      notificationError('Your password must be at least 8 characters long.');
      return;
    } else if (password !== confirmPassword) {
      notificationError('Passwords do not match.');
      return;
    }

    mutate();
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-10 lg:py-0">
      <div className="flex flex-col items-center justify-center w-full h-screen px-6 py-8 lg:flex-row">
        <span className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="h-44 w-44 mb-4 lg:mr-36 lg:h-80 lg:w-80 lg:mb-0"
            src="https://i.ibb.co/g3bhRfQ/logo.png"
            alt="logo"
          />
        </span>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}
              action="#"
            >
              <div>
                <InputWithIcon
                  type="text"
                  name="name"
                  placeholder="Name"
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
                  type="text"
                  name="surname"
                  placeholder="Surname"
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  required
                  value={surname}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setSurname(event.target.value)
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
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  required
                  value={email}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(event.target.value)
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
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  required
                  value={password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(event.target.value)
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
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setConfirmPassword(event.target.value)
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
              <TwButton
                type="submit"
                variation="primary"
                className="w-full disabled:bg-stone-500"
                color="#147234"
              >
                Sign up
              </TwButton>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Have an account?{' '}
                <span className="font-medium text-green-600 hover:underline dark:text-green-500 hover:cursor-pointer">
                  <NavLink to="/login">Log in here</NavLink>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
