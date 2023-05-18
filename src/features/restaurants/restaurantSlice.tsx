import { createSlice } from '@reduxjs/toolkit';

export interface Restaurant {
  name: string;
  description: string;
  phoneNumber: string;
  capacity: number;
  image: string;
  location: {
    address: string;
    municipality: string;
    city: string;
  };
  workingHours: {
    openTime: string;
    closeTime: string;
  };
  owner: {
    name: string;
    surname: string;
    email: string;
    role: string;
  };
}

export interface RestaurantState {
  restaurantList: Restaurant[];
}

const initialState: RestaurantState = {
  restaurantList: [
    {
      name: '',
      description: '',
      phoneNumber: '',
      capacity: 0,
      image: '',
      location: {
        address: '',
        municipality: '',
        city: '',
      },
      workingHours:{
        openTime: '',
        closeTime: ''
      },
      owner: {
        name: '',
        surname: '',
        email: '',
        role: '',
      },
    },
  ],
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurantList = action.payload._embedded.restaurantList;
    },
  },
});

export const { setRestaurant } = restaurantSlice.actions;

export default restaurantSlice.reducer;
