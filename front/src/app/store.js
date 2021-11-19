import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/loginSlice';
import globalReducer from '../features/globalSlice';
import roomReducer from '../features/roomSlice';

export const store = configureStore({
  reducer: {
    global: globalReducer,
    login: loginReducer,
    room: roomReducer
  }
});
