import {createSlice} from '@reduxjs/toolkit';
import {LocalStorageKeyEnum} from "../../common/LocalStorageKeyEnum";

const initialState = {
    login: null,
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
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.userRole = action.payload.userRole;
        },
        removeUser(state) {
            state.login = null;
            state.token = null;
            state.id = null;
            state.userRole = null;
        },
    },
});

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;