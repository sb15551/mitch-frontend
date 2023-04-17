import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    metricName: "",
    values: [],
    open: false
};

const objectStatSlice = createSlice({
    name: 'objectStat',
    initialState,
    reducers: {
        setObjectStat(state, action) {
            state.metricName = action.payload.metricName;
            state.values = action.payload.values;
            state.open = true;
        },
        removeObjectStat(state) {
            state.metricName = "";
            state.values = [];
            state.open = false;
        }
    },
});

export const {setObjectStat, removeObjectStat} = objectStatSlice.actions;

export default objectStatSlice.reducer;