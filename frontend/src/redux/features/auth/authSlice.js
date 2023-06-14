import { createSlice } from '@reduxjs/toolkit';

let name = '';
try {
  const storedName = localStorage.getItem('name');
  if (storedName) {
    name = JSON.parse(storedName);
  }
} catch (error) {
  console.error('Error parsing JSON from localStorage:', error);
}

const initialState = {
  isLoggedIn: false,
  name: name || '',
  user: {
    name: '',
    email: '',
    phone: '',
    bio: '',
    photo: '',
  },
  userId: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin(state, action) {
      state.isLoggedIn = action.payload;
    },
    setName(state, action) {
      localStorage.setItem('name', JSON.stringify(action.payload));
      state.name = action.payload;
    },
    setUser(state, action) {
      const { name, email, phone, bio, id, photo } = action.payload;
      state.user = { name, email, phone, bio, id, photo };
    },
  },
});

export const { setLogin, setName, setUser } = authSlice.actions;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectName = state => state.auth.name;
export const selectUser = state => state.auth.user;

export default authSlice.reducer;
