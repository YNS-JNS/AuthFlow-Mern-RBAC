import { createSlice } from "@reduxjs/toolkit";
import { login, signUp } from './authActions';

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null

const initialState = {

    loading: false,
    userInfo: null,
    userToken,
    error: null,
    success: false,
};


const authSlice = createSlice(
    {
        name: 'auth',
        initialState,
        reducers: {
            logout: (state) => {
                localStorage.removeItem('userToken') // delete token from storage
                state.loading = false
                state.userInfo = null
                state.userToken = null
                state.error = null
            }
        },
        extraReducers: (builder) => {
            builder
                // login:
                .addCase(login.pending, (state) => {

                    state.loading = true;
                    state.error = null;
                    console.log("Pending");

                })
                .addCase(login.fulfilled, (state, { payload }) => {

                    state.loading = false;
                    state.userInfo = payload;
                    // state.success = true;
                    state.userToken = payload.accessToken;
                    console.log("fulfilled response login: ", payload);

                })
                .addCase(login.rejected, (state, { payload }) => {

                    state.loading = false;
                    state.error = payload;
                    console.log("rejected response: ", payload);

                })
                // register user
                .addCase(signUp.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                    console.log("Pending: ");

                })
                .addCase(signUp.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    state.success = true; // registration successful
                    // state.userInfo = payload;
                    console.log("fulfilled payload register: ", payload);
                })
                .addCase(signUp.rejected, (state, { payload }) => {
                    state.loading = false;
                    state.error = payload;
                    console.log("rejected payload: ", payload);
                })
        }
    }
);

export const {logout} = authSlice.actions;

export default authSlice.reducer;