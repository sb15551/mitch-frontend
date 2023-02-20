import {createSlice} from '@reduxjs/toolkit';

type NotificationSlice = {
    severity: "success" | "error",
    text: string,
    open: boolean
}

const initialState: NotificationSlice = {
    severity: "success",
    text: "",
    open: false
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            state.severity = action.payload.severity;
            state.text = action.payload.text;
            state.open = true;
        },
        removeNotification(state) {
            state.text = "";
            state.open = false;
        }
    },
});

export const {setNotification, removeNotification} = notificationSlice.actions;

export default notificationSlice.reducer;