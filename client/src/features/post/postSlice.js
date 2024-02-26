import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    posts: [],
    loading: false,
    error: null,

}

// createAsyncThunk(typePrefix: string, payloadCreator: AsyncThunkPayloadCreator<any, void, AsyncThunkConfig>)
export const fetchPosts = createAsyncThunk('post/fetchPosts', async (args, thunkApi) => {
    // export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/posts");
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
        // return thunkApi.rejectWithValue(error.response.message);
    }

}
);

// Slice post:
const postSlice = createSlice(
    {
        name: 'post',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(fetchPosts.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                    console.log("Pending")
                })
                .addCase(fetchPosts.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    state.posts = payload.posts;
                    // return { ...state, loading: false, posts: payload.posts };
                    // console.log("Fulfilled: ", payload.posts)

                })
                .addCase(fetchPosts.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload.message;
                    console.log("Rejected: ", action.payload.message);
                    // state.error = action.error.message;
                    // console.log("Rejected: ", action.error.message);

                })
        }
    }
);

export default postSlice.reducer;