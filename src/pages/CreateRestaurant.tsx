import React, { useState } from 'react';
import { Divider } from '../components/Divider/Divider';
import { InputWithIcon } from '../components/InputWithIcon/InputWithIcon';
import api from '../helpers/api/api.factory';
import {
  useMutation,
  useQuery,
  QueryObserverResult,
  RefetchQueryFilters,
} from 'react-query';
import {
  ToastHelper,
  ToastMessageType,
  ToastType,
} from '../helpers/ToastHelper';
import axios from 'axios';
import Select from '../components/Select/Select';
import { Label } from '../components/Label/Label';
import { TwButton } from '../components/TwButton/TwButton';
import closeButton from '../assets/images/deletetable.png';
import { useNavigate } from 'react-router';
import { Restaurant } from '../features/restaurants/restaurantSlice';
import { ClipLoader } from 'react-spinners';
import { RefetchOptions } from 'react-query';
import { RestaurantListResponse } from '../App';

interface MenuItem {
  name: string;
  price: string;
  category: string;
  image: string;
}

interface TableCapacity {
  capacity: number;
}

export enum Category {
  BEVERAGE,
  SAVORY,
  DESSERT,
}
const options = [
  { value: 'Centar', label: 'Centar' },
  { value: 'Hadžići', label: 'Hadžići' },
  { value: 'Ilidža', label: 'Ilidža' },
  { value: 'Ilijaš', label: 'Ilijaš' },
  { value: 'Novi Grad', label: 'Novi Grad' },
  { value: 'Novo Sarajevo', label: 'Novo Sarajevo' },
  { value: 'Stari Grad', label: 'Stari Grad' },
  { value: 'Trnovo', label: 'Trnovo' },
  { value: 'Vogošća', label: 'Vogošća' },
];

const menuItemTypeOptions = [
  { value: 'BEVERAGE', label: 'BEVERAGE' },
  { value: 'SAVORY', label: 'SAVORY' },
  { value: 'DESSERT', label: 'DESSERT' },
];

export interface refetchProp {
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<RestaurantListResponse, unknown>>;
}

const CreateRestaurant = ({ refetch }: refetchProp) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState({
    address: '',
    municipality: options[0].value,
    city: 'Sarajevo',
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState<number>(0);
  const [image, setImage] = useState('');
  const [workingHours, setWorkingHours] = useState({
    openTime: '',
    closeTime: '',
  });
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('BEVERAGE');
  const [itemImage, setItemImage] = useState('');
  const [tables, setTables] = useState<TableCapacity[]>([]);
  const [isOwner, setIsOwner] = useState(false);

  const addMenuItem = () => {
    const newItem: MenuItem = {
      name: itemName,
      price,
      category,
      image: itemImage,
    };

    setMenuItems((menuItems) => [...menuItems, newItem]);
    setItemName('');
    setPrice('');
    setCategory('BEVERAGE');
    setItemImage('');
  };

  const addTable = () => {
    const newTable: TableCapacity = {
      capacity,
    };
    setTables((tables) => [...tables, newTable]);
    setCapacity(0);
  };

  const deleteTable = (tableIndex: number) => {
    setTables((tables) =>
      tables.filter((table, index) => index !== tableIndex)
    );
  };

  const navigate = useNavigate();

  const { mutate } = useMutation(
    () =>
      api.fetch<any>('create_restaurant', {
        name,
        location,
        phoneNumber,
        description,
        capacity,
        image,
        workingHours,
        menuItems,
        tables,
      }),

    {
      onSuccess: (res: any) => {
        ToastHelper.showToast(
          'Restaurant created successfully',
          ToastType.SUCCESS,
          ToastMessageType.CUSTOM
        );
        refetch();
        navigate('/dashboard');
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

  const deleteMenuItem = (menuIndex: number) => {
    setMenuItems((items) =>
      menuItems.filter((item, index) => index !== menuIndex)
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation((location) => ({
      ...location,
      municipality: event.target.value,
    }));
  };
  const handleSelectMenuItemTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
  };

  const [loading, setLoading] = useState(true);
  const restaurantsInfo = useQuery(
    ['get_owned_restaurants'],
    () => api.fetch('get_owned_restaurants', {}),
    {
      onSuccess: (data: Restaurant) => {
        if (data) {
          setIsOwner(true);
        }
        setLoading(false);
      },
      onError: (err) => {
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

      {isOwner && !loading && (
        <div className="flex flex-col justify-center mt-24">
          <p className="text-center text-2xl mt-5 text-gray-400">
            You cannot add more than one restaurant!
          </p>
        </div>
      )}
      {!isOwner && !loading && (
        <div className="flex justify-center sm:justify-start sm:mt-3">
          <form
            className="mx-6 my-4 flex flex-col gap-4 max-w-[500px] w-full"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl text-left px-3  text-black">
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
                value={location.address}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setLocation((location) => ({
                    ...location,
                    address: event.target.value,
                  }))
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
                type="number"
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

              <Select
                label="Select a municipality"
                options={options}
                value={location.municipality}
                onChange={handleSelectChange}
              />
            </div>
            <Divider />
            <h2 className="text-2xl text-left px-3 pb-3 text-black">
              Work hours
            </h2>
            <Divider />
            <p>Restaurant works on regular days</p>
            <div>
              <Label htmlFor="openTime" className="" text="From:" />
              <InputWithIcon
                name="openTime"
                placeholder="Work days from"
                className="block w-full p-4 "
                required
                value={workingHours.openTime}
                type="time"
                id="openTime"
                inputBaseClasses=" text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                inputErrorClasses="border-red-500"
                inputSuccessClasses="border-green-500"
                labelBaseClasses="text-gray-900"
                labelErrorClasses="text-red-500"
                labelSuccessClasses="text-green-500"
                inputSizing="py-4 px-4"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setWorkingHours((workingHours) => ({
                    ...workingHours,
                    openTime: event.target.value,
                  }))
                }
              />
              <Label htmlFor="closeTime" className="" text="To:" />
              <InputWithIcon
                name="closeTime"
                placeholder="Work days from"
                className="block w-full p-4 "
                required
                value={workingHours.closeTime}
                type="time"
                id="closeTime"
                inputBaseClasses=" text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                inputErrorClasses="border-red-500"
                inputSuccessClasses="border-green-500"
                labelBaseClasses="text-gray-900"
                labelErrorClasses="text-red-500"
                labelSuccessClasses="text-green-500"
                inputSizing="py-4 px-4"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setWorkingHours((workingHours) => ({
                    ...workingHours,
                    closeTime: event.target.value,
                  }))
                }
              />
            </div>

            <Divider />
            <h2 className="text-2xl text-left px-3 pb-3 text-black">
              Upload image
            </h2>
            <Divider />
            <div>
              <InputWithIcon
                type="text"
                name="image"
                placeholder="Image url"
                className="block w-full p-4 "
                required
                value={image}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setImage(event.target.value)
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
            <h2 className="text-2xl text-left px-3 pb-3 text-black">
              Add tables
            </h2>

            {tables.map((item, index) => (
              <div
                key={index}
                className=" flex  gap-3 p-2 border border-solid border-[#d2d2d2] rounded-lg text-left"
              >
                <div className="p-2 w-[90%] bg-white rounded-lg  border border-solid border-gray-300 flex flex-row justify-between">
                  <p>Table {index + 1} capacity: </p>
                  <p>{item.capacity}</p>
                </div>

                <div
                  className="self-center justify-center"
                  onClick={() => deleteTable(index)}
                >
                  <img src={closeButton} className="w-4 h-4" alt="" />
                </div>
              </div>
            ))}

            <div className="flex">
              <InputWithIcon
                name="table"
                type="number"
                value={capacity.toString()}
                onChange={(e) => setCapacity(e.target.valueAsNumber)}
                placeholder="Table capacity"
                inputBaseClasses=" text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                inputErrorClasses="border-red-500"
                inputSuccessClasses="border-green-500"
                labelBaseClasses="text-gray-900"
                labelErrorClasses="text-red-500"
                labelSuccessClasses="text-green-500"
                inputSizing="py-4 px-4"
              />

              <TwButton
                variation="primary"
                color="#046C4E"
                onClick={addTable}
                type="button"
                className="w-[60%] ml-2 whitespace-nowrap"
              >
                Add Table
              </TwButton>
            </div>

            <Divider />
            <h2 className="text-2xl text-left px-3 pb-3 text-black">
              Create menu
            </h2>

            <div className="flex flex-col gap-3">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className=" flex flex-col gap-3 p-2 border border-solid border-[#d2d2d2] rounded-lg text-left"
                >
                  <div className="p-2 bg-white rounded-lg  border border-solid border-gray-300">
                    <p>{item.name}</p>
                  </div>
                  <div className="p-2 bg-white rounded-lg  border border-solid border-gray-300 flex flex-row justify-between">
                    <p>{item.price}</p>
                    <p>KM</p>
                  </div>
                  <div className="p-2 bg-white rounded-lg  border border-solid border-gray-300">
                    <p>{item.category}</p>
                  </div>
                  <div className=" flex justify-between items-center">
                    <img
                      src={item.image}
                      alt="menu item url"
                      className="rounded-lg w-[80px] h-[80px] object-fill"
                    />

                    <div onClick={() => deleteMenuItem(index)}>
                      <img className="w-10 h-10 " src={closeButton} alt="" />
                    </div>
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
                label="Select item category"
                options={menuItemTypeOptions}
                value={category}
                onChange={handleSelectMenuItemTypeChange}
              />
              <InputWithIcon
                name="itemimage"
                type="text"
                value={itemImage}
                onChange={(e) => setItemImage(e.target.value)}
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
      )}
    </>
  );
};

export default CreateRestaurant;
