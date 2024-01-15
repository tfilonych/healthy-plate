import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../http';

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async function(_, { rejectWithValue }) {
    try {
      const response = await $api.get('/api/recipe/all');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    status: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state) => {
        state.status = 'failed';
        state.error = setError;
      });

  }
});

export default recipeSlice.reducer;