// 1- importing
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backendUrl = "http://localhost:8000/api/user/auth";

// login:
export const login = createAsyncThunk("auth/login", async ({ email, password }, thunkApi) => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(`${backendUrl}/sign-in`, { email, password }, config);

        // store user's token in local storage
        localStorage.setItem('userToken', data.accessToken);

        return data;

    } catch (error) {
        // return custom error message from backend if present
        if (error.response && error.response.data.message) {

            return thunkApi.rejectWithValue(error.response.data.message)
        } else {

            return thunkApi.rejectWithValue(error.message);
        }
    }

});

// register:
export const signUp = createAsyncThunk("auth/signUp",
    async ({ firstName, lastName, email, password }, thunkApi) => {

        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const { data } = await axios.post(`${backendUrl}/sign-up`,
                { firstName, lastName, email, password }, config);

            return data;

        } catch (error) {
            // return custom error message from backend if present
            if (error.response && error.response.data.message) {

                return thunkApi.rejectWithValue(error.response.data.message)
            } else {

                return thunkApi.rejectWithValue(error.message);
            }
        }

    }
);