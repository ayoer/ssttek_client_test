import {createReducer} from '@reduxjs/toolkit';
import {searchCountry} from './action';

const initialState = {
  countries: [],
  pending: false,
  error: false,
};

export const countryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(searchCountry.pending, (state) => {
      state.pending = true;
    })
    .addCase(searchCountry.fulfilled, (state, {payload}) => {
      state.pending = false;
      const response = payload;
      state.countries = response.data;
    })
    .addCase(searchCountry.rejected, (state, {payload}) => {
      state.pending = false;
      state.errors = true;
    });
});
