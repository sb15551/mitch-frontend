import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import objectErrorReducer from './slices/errorSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        objectError: objectErrorReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;