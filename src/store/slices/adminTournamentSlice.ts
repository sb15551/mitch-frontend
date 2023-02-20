import {createSlice} from '@reduxjs/toolkit';
import {defaultTournament, TournamentParticipantDto} from "../../dto/TournamentObjects";

const initialState = {
    tournament: defaultTournament,
    id: null,
    title: null,
    locationId: null,
    eventDate: null,
    statusCode: null,
    buyin: null,
    rebuy: null,
    addon: null,
    topPlaces: null,
    participants: Array<TournamentParticipantDto>()
};

const adminTournamentSlice = createSlice({
    name: 'adminTournament',
    initialState,
    reducers: {
        setAdminTournament(state, action) {
            state.tournament = action.payload;
            state.id = action.payload.id;
            state.title = action.payload.title;
            state.locationId = action.payload.locationId;
            state.eventDate = action.payload.eventDate;
            state.statusCode = action.payload.statusCode;
            state.buyin = action.payload.buyin;
            state.rebuy = action.payload.rebuy;
            state.addon = action.payload.addon;
            state.topPlaces = action.payload.topPlaces;
            state.participants = action.payload.participants;
        },
        removeAdminTournament(state) {
            state.tournament = defaultTournament;
            state.id = null;
            state.title = null;
            state.locationId = null;
            state.eventDate = null;
            state.statusCode = null;
            state.buyin = null;
            state.rebuy = null;
            state.addon = null;
            state.topPlaces = null;
            state.participants = Array<TournamentParticipantDto>();
        }
    },
});

export const {setAdminTournament, removeAdminTournament} = adminTournamentSlice.actions;

export default adminTournamentSlice.reducer;