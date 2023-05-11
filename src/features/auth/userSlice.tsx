import { createSlice } from '@reduxjs/toolkit';
import TOKEN from '../../helpers/api/token';

export interface UserState {
  user: {
    name: string;
    surname: string;
    email: string;
    role: string;
  };
}

const initialState: UserState = {
  user: {
    name: '',
    surname: '',
    email: '',
    role: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: () => {
      TOKEN.remove();
      return initialState;
    },
  },
});

export const { logoutUser, setUser } = userSlice.actions;

export default userSlice.reducer;
