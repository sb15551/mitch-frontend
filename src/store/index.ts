import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import objectErrorReducer from './slices/errorSlice';
import adminConfigReducer from './slices/adminConfigSlice';
import adminTournamentReducer from './slices/adminTournamentSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        objectError: objectErrorReducer,
        adminConfig: adminConfigReducer,
        adminTournament: adminTournamentReducer,
        notification: notificationReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;