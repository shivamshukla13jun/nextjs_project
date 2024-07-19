// store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null,
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    role: typeof window !== 'undefined' ? localStorage.getItem('role') : null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.permis;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('role', action.payload.role);
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectCurrentUser = (state) => state.user.user;
export const selectCurrentToken = (state) => state.user.token;
export const selectCurrentRole = (state) => state.user.role;

export default userSlice.reducer;
