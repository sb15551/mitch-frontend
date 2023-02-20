import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    titleError: null,
    messageError: null,
    open: false
};

const objectErrorSlice = createSlice({
    name: 'objectError',
    initialState,
    reducers: {
        setObjectError(state, action) {
            state.titleError = action.payload.titleError;
            state.messageError = action.payload.messageError;
            state.open = true;
        },
        removeObjectError(state) {
            state.titleError = null;
            state.messageError = null;
            state.open = false;
        }
    },
});

export const {setObjectError, removeObjectError} = objectErrorSlice.actions;

export default objectErrorSlice.reducer;