import React, { useState } from "react";
import { Divider } from "../components/Divider/Divider";
import { InputWithIcon } from "../components/InputWithIcon/InputWithIcon";
import api from "../helpers/api/api.factory";
import { useMutation } from "react-query";
import {
  ToastHelper,
  ToastMessageType,
  ToastType,
} from "../helpers/ToastHelper";
import axios from "axios";
import Select from "../components/Select/Select";

const CreateRestaurant = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [municipality, setMunicipality] = useState("");

  const { mutate } = useMutation(
    () =>
      api.fetch<any>("create_restaurant", {
        name,
        location,
        phoneNumber,
      }),
    {
      onSuccess: (res: any) => {
        ToastHelper.showToast(
          "Restaurant created successfully",
          ToastType.SUCCESS,
          ToastMessageType.CUSTOM
        );
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
  const options = [
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
    { value: "FR", label: "France" },
    { value: "DE", label: "Germany" },
  ];
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMunicipality(event.target.value);
  };
  return (
    <form className="mx-6 my-4 flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl text-left px-3 pb-3 text-black">
        Add restaurant
      </h2>
      <Divider />
      <div className="flex flex-col gap-5">
        <InputWithIcon
          type="text"
          name="name"
          placeholder="Name"
          className="block w-full p-4 "
          required
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setName(event.target.value)
          }
          inputBaseClasses="text-gray-900 border-gray-300 bg-gray-50  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          inputErrorClasses="border-red-500"
          inputSuccessClasses="border-green-500"
          labelBaseClasses="text-gray-900"
          labelErrorClasses="text-red-500"
          labelSuccessClasses="text-green-500"
          inputSizing="py-4 px-4"
        />
        <InputWithIcon
          type="text"
          name="Location"
          placeholder="Location"
          className="block w-full p-4"
          required
          value={location}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setLocation(event.target.value)
          }
          inputBaseClasses="text-gray-900 border-gray-300 bg-gray-50  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          inputErrorClasses="border-red-500"
          inputSuccessClasses="border-green-500"
          labelBaseClasses="text-gray-900"
          labelErrorClasses="text-red-500"
          labelSuccessClasses="text-green-500"
          inputSizing="py-4 px-4"
        />
        <InputWithIcon
          type="tel"
          name="Phone number"
          placeholder="Phone number"
          className="block w-full p-4 "
          required
          value={phoneNumber}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPhoneNumber(event.target.value)
          }
          inputBaseClasses="text-gray-900 border-gray-300 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          inputErrorClasses="border-red-500"
          inputSuccessClasses="border-green-500"
          labelBaseClasses="text-gray-900"
          labelErrorClasses="text-red-500"
          labelSuccessClasses="text-green-500"
          inputSizing="py-4 px-4"
        />
        <textarea
          name="description"
          placeholder="Description"
          className=" py-4 px-4 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          required
          value={description}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(event.target.value)
          }
          rows={5}
        />
        <InputWithIcon
          type="text"
          name="Capacity"
          placeholder="Capacity"
          className="block w-full p-4 "
          required
          value={capacity}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setCapacity(event.target.value)
          }
          inputBaseClasses=" text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          inputErrorClasses="border-red-500"
          inputSuccessClasses="border-green-500"
          labelBaseClasses="text-gray-900"
          labelErrorClasses="text-red-500"
          labelSuccessClasses="text-green-500"
          inputSizing="py-4 px-4"
        />
        <Select
          label="Select a country"
          options={options}
          value={municipality}
          onChange={handleSelectChange}
        />
      </div>
      <Divider />
    </form>
  );
};

export default CreateRestaurant;
