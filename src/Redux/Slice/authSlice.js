import { createSlice } from '@reduxjs/toolkit';

const TokenFromLocalStorage = () => {
    return localStorage.getItem('token');
};

const initialState = {
    isLoggedIn: !!TokenFromLocalStorage(),
    token: TokenFromLocalStorage(),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
