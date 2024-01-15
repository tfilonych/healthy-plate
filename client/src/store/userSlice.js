import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../http';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async function(user, { rejectWithValue }) {
    try {
      const response = await $api.post('/api/auth/login', { ...user });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      const response = await $api.post(
        '/api/auth/refresh',
        { withCredentials: true }
      );
      return response.data;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    accessToken: '',
    status: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed';
        state.error = setError;
      })
      .addCase(checkAuth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        console.log('action payload');
        console.log(action.payload);
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.status = 'failed';
        state.error = setError;
      });

  }
});

export default userSlice.reducer;