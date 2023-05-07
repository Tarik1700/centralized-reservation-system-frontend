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
import { Label } from "../components/Label/Label";
import { TwButton } from "../components/TwButton/TwButton";
interface MenuItem {
  itemName: string;
  itemDescription: string;
  price: string;
  category: Category;
  itemImgUrl: string;
}

export enum Category {
  BEVERAGE,
  SAVORY,
  DESSERT,
}
const options = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "FR", label: "France" },
  { value: "DE", label: "Germany" },
];

const menuItemTypeOptions = [
  { value: 0, label: "BEVERAGE" },
  { value: 1, label: "SAVORY" },
  { value: 2, label: "DESSERT" },
];

const CreateRestaurant = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [municipality, setMunicipality] = useState(options[0].value);
  const [imgUrl, setImgUrl] = useState("");
  const [workDaysFrom, setWorkDaysFrom] = useState("");
  const [workDaysTo, setWorkDaysTo] = useState("");
  /*  const [weekendDaysFrom, setWeekendDaysFrom] = useState("");
  const [weekendDaysTo, setWeekendDaysTo] = useState(""); */
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<Category>(0);
  const [itemImgUrl, setItemImgUrl] = useState("");

  const addMenuItem = () => {
    const newItem: MenuItem = {
      itemName,
      itemDescription,
      price,
      category,
      itemImgUrl,
    };
    setMenuItems([...menuItems, newItem]);
    setItemName("");
    setItemDescription("");
    setPrice("");
    setCategory(0);
    setItemImgUrl("");
  };

  const { mutate } = useMutation(
    () =>
      api.fetch<any>("create_restaurant", {
        name,
        location,
        phoneNumber,
        description,
        capacity,
        municipality,
        imgUrl,
        workDaysFrom,
        workDaysTo,
        menuItems,
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMunicipality(event.target.value);
  };
  const handleSelectMenuItemTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(Number(event.target.value));
  };
  return (
    <div className="flex justify-center">
      <form
        className="mx-6 my-4 flex flex-col gap-4 max-w-[500px] w-full"
        onSubmit={handleSubmit}
      >
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
            label="Select a municipality"
            options={options}
            value={municipality}
            onChange={handleSelectChange}
          />
        </div>
        <Divider />
        <h2 className="text-2xl text-left px-3 pb-3 text-black">Work hours</h2>
        <Divider />
        <p>Restaurant works on regular days</p>
        <div>
          <Label htmlFor="workDaysFrom" className="" text="From:" />
          <InputWithIcon
            name="workDaysFrom"
            placeholder="Work days from"
            className="block w-full p-4 "
            required
            value={workDaysFrom}
            type="time"
            id="workDaysFrom"
            inputBaseClasses=" text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            inputErrorClasses="border-red-500"
            inputSuccessClasses="border-green-500"
            labelBaseClasses="text-gray-900"
            labelErrorClasses="text-red-500"
            labelSuccessClasses="text-green-500"
            inputSizing="py-4 px-4"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setWorkDaysFrom(event.target.value)
            }
          />
          <Label htmlFor="workDaysTo" className="" text="To:" />
          <InputWithIcon
            name="workDaysTo"
            placeholder="Work days from"
            className="block w-full p-4 "
            required
            value={workDaysTo}
            type="time"
            id="workDaysTo"
            inputBaseClasses=" text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            inputErrorClasses="border-red-500"
            inputSuccessClasses="border-green-500"
            labelBaseClasses="text-gray-900"
            labelErrorClasses="text-red-500"
            labelSuccessClasses="text-green-500"
            inputSizing="py-4 px-4"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setWorkDaysTo(event.target.value)
            }
          />
        </div>
        {/*   <div>
        <p>Restaurant works on weekends</p>
        <p className="text-[10px]">(Leave both fields empty if it is closed)</p>
      </div>
      <div>
        <Label htmlFor="weekendDaysFrom" className="" text="From:" />
        <InputWithIcon
          name="weekendDaysFrom"
          placeholder="Work days from"
          className="block w-full p-4 "
          required
          value={weekendDaysFrom}
          type="time"
          id="weekendDaysFrom"
          inputBaseClasses=" text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          inputErrorClasses="border-red-500"
          inputSuccessClasses="border-green-500"
          labelBaseClasses="text-gray-900"
          labelErrorClasses="text-red-500"
          labelSuccessClasses="text-green-500"
          inputSizing="py-4 px-4"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setWeekendDaysFrom(event.target.value)
          }
        />
        <Label htmlFor="weekendDaysTo" className="" text="To:" />
        <InputWithIcon
          name="weekendDaysTo"
          placeholder="Work days from"
          className="block w-full p-4 "
          required
          value={weekendDaysTo}
          type="time"
          id="weekendDaysTo"
          inputBaseClasses=" text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          inputErrorClasses="border-red-500"
          inputSuccessClasses="border-green-500"
          labelBaseClasses="text-gray-900"
          labelErrorClasses="text-red-500"
          labelSuccessClasses="text-green-500"
          inputSizing="py-4 px-4"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setWeekendDaysTo(event.target.value)
          }
        />
      </div> */}
        <Divider />
        <h2 className="text-2xl text-left px-3 pb-3 text-black">
          Upload images
        </h2>
        <Divider />
        <div>
          <InputWithIcon
            type="text"
            name="imgUrl"
            placeholder="Image url"
            className="block w-full p-4 "
            required
            value={imgUrl}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setImgUrl(event.target.value)
            }
            inputBaseClasses=" text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            inputErrorClasses="border-red-500"
            inputSuccessClasses="border-green-500"
            labelBaseClasses="text-gray-900"
            labelErrorClasses="text-red-500"
            labelSuccessClasses="text-green-500"
            inputSizing="py-4 px-4"
          />
        </div>
        <Divider />
        <h2 className="text-2xl text-left px-3 pb-3 text-black">Create menu</h2>

        <div className="flex flex-col gap-3">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className=" flex flex-col gap-3 p-2 border border-solid border-[#d2d2d2] rounded-lg text-left"
            >
              <div className="p-2 bg-white rounded-lg  border border-solid border-gray-300">
                <p>{item.itemName}</p>
              </div>
              <div className="p-2 bg-white rounded-lg  border border-solid border-gray-300">
                <p>{item.itemDescription}</p>
              </div>
              <div className="p-2 bg-white rounded-lg  border border-solid border-gray-300 flex flex-row justify-between">
                <p>{item.price}</p>
                <p>KM</p>
              </div>
              <div className="p-2 bg-white rounded-lg  border border-solid border-gray-300">
                <p>{Category[item.category]}</p>
              </div>
              <div className=" flex justify-center">
                <img
                  src={item.itemImgUrl}
                  alt="menu item url"
                  className="rounded-lg w-[80px] h-[80px] object-fill"
                />
              </div>
            </div>
          ))}
          <InputWithIcon
            name="Name"
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Name"
            inputBaseClasses=" text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            inputErrorClasses="border-red-500"
            inputSuccessClasses="border-green-500"
            labelBaseClasses="text-gray-900"
            labelErrorClasses="text-red-500"
            labelSuccessClasses="text-green-500"
            inputSizing="py-4 px-4"
          />
          <InputWithIcon
            name="itemDescription"
            type="text"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            placeholder="Description"
            inputBaseClasses=" text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            inputErrorClasses="border-red-500"
            inputSuccessClasses="border-green-500"
            labelBaseClasses="text-gray-900"
            labelErrorClasses="text-red-500"
            labelSuccessClasses="text-green-500"
            inputSizing="py-4 px-4"
          />
          <InputWithIcon
            name="price"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            inputBaseClasses=" text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            inputErrorClasses="border-red-500"
            inputSuccessClasses="border-green-500"
            labelBaseClasses="text-gray-900"
            labelErrorClasses="text-red-500"
            labelSuccessClasses="text-green-500"
            inputSizing="py-4 px-4"
          />
          <Select
            label="Select a municipality"
            options={menuItemTypeOptions}
            value={category}
            onChange={handleSelectMenuItemTypeChange}
          />
          <InputWithIcon
            name="itemImgUrl"
            type="text"
            value={itemImgUrl}
            onChange={(e) => setItemImgUrl(e.target.value)}
            placeholder="Item Image Url"
            inputBaseClasses=" text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            inputErrorClasses="border-red-500"
            inputSuccessClasses="border-green-500"
            labelBaseClasses="text-gray-900"
            labelErrorClasses="text-red-500"
            labelSuccessClasses="text-green-500"
            inputSizing="py-4 px-4"
          />
          <div className=" flex justify-center items-center">
            <TwButton
              variation="primary"
              color="#046C4E"
              onClick={addMenuItem}
              type="button"
              className="w-32"
            >
              Add Item
            </TwButton>
          </div>
        </div>

        <Divider />
        <TwButton variation="primary" color="#046C4E" type="submit">
          Save restaurant
        </TwButton>
      </form>
    </div>
  );
};

export default CreateRestaurant;
