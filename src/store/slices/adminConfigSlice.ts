import {createSlice} from '@reduxjs/toolkit';
import {Role} from "../../dto/PlayerObjects";
import {StatusDto} from "../../dto/TournamentObjects";
import {LocationDto} from "../../dto/LocationObjects";

const initialState = {
    roles: Array<Role>(),
    statuses: Array<StatusDto>(),
    locations: Array<LocationDto>(),
    isDownload: false
};

const adminConfigSlice = createSlice({
    name: 'adminConfig',
    initialState,
    reducers: {
        setAdminConfig(state, action) {
            state.roles = action.payload.roles;
            state.statuses = action.payload.statuses;
            state.isDownload = true;
        },
        setLocations(state, action) {
            state.locations = action.payload.rows;
        },
        removeAdminConfig(state) {
            state.roles = Array<Role>();
            state.statuses = Array<StatusDto>();
            state.locations = Array<LocationDto>();
            state.isDownload = false;
        }
    },
});

export const {setAdminConfig, setLocations, removeAdminConfig} = adminConfigSlice.actions;

export default adminConfigSlice.reducer;