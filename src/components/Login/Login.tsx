import React, { useEffect, useState } from "react";
import {
  ToastHelper,
  ToastMessageType,
  ToastType,
} from "../../helpers/ToastHelper";
import "react-toastify/dist/ReactToastify.css";
import { InputWithIcon } from "../InputWithIcon/InputWithIcon";
import { TwButton } from "../TwButton/TwButton";
import { NavLink, useNavigate } from "react-router-dom";
import TOKEN from "../../helpers/api/token";
import { useMutation } from "react-query";
import api from "../../helpers/api/api.factory";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { mutate } = useMutation(
    () =>
      api.fetch<any>("login_user", {
        email,
        password,
      }),
    {
      onSuccess: (res: { token: string }) => {
        TOKEN.set(res.token);
        navigate("/dashboard");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          if (!error.response) {
            loginError(error.message);
          }
          if (error.response) {
            return loginError(error.message);
          }
        }
      },
    }
  );

  const loginError = (message: string) => {
    ToastHelper.showToast(message, ToastType.ERROR, ToastMessageType.CUSTOM);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };

  useEffect(() => {
    if (TOKEN.get()) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center w-full h-screen px-6 py-8">
        <span className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="h-60 w-60 mb-4"
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
                  type="email"
                  name="email"
                  placeholder="Your email"
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
              <TwButton
                type="submit"
                variation="primary"
                className="w-full"
                color="#147234"
              >
                Log In
              </TwButton>
              <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account?{" "}
                <span className="font-medium text-green-600 hover:underline dark:text-green-500">
                  <NavLink to="/register">Sign up here</NavLink>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
