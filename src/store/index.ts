import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import objectErrorReducer from './slices/errorSlice';
import objectStatReducer from './slices/statSlice';
import adminConfigReducer from './slices/adminConfigSlice';
import adminTournamentReducer from './slices/adminTournamentSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        objectError: objectErrorReducer,
        objectStat: objectStatReducer,
        adminConfig: adminConfigReducer,
        adminTournament: adminTournamentReducer,
        notification: notificationReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;