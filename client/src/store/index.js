import { configureStore } from '@reduxjs/toolkit';
import { isSerser } from '../utils/utils';
import recipeReducer from './recipeSlice';
import userSlice from './userSlice';

const preloadedState = !isSerser && window.__INITIAL_STATE__ || {};
export default configureStore({
  reducer: {
    recipes: recipeReducer,
    user: userSlice
  },
  preloadedState
});