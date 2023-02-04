import {createSlice} from '@reduxjs/toolkit';
import {LocalStorageKeyEnum} from "../../common/LocalStorageKeyEnum";

const initialState = {
    login: null,
    name: null,
    surname: null,
    token: null,
    id: null,
    userRole: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            localStorage.setItem(LocalStorageKeyEnum.USER, JSON.stringify(action.payload));
            state.login = action.payload.login;
            state.name = action.payload.name;
            state.surname = action.payload.surname;
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.userRole = action.payload.userRole;
        },
        removeUser(state) {
            state.login = null;
            state.name = null;
            state.surname = null;
            state.token = null;
            state.id = null;
            state.userRole = null;
        },
    },
});

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;