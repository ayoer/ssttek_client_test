import {createReducer} from '@reduxjs/toolkit';
import {useNavigate} from 'react-router-dom';
import {getVendor, searchVendor} from './action';

const initialState = {
  vendor: {},
  vendors: [],
  pending: false,
  error: false,
};

export const vendorReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getVendor.pending, (state) => {
      state.pending = true;
    })
    .addCase(getVendor.fulfilled, (state, {payload}) => {
      state.pending = false;
      const response = payload;
      state.vendor = response;
    })
    .addCase(getVendor.rejected, (state, {payload}) => {
      state.pending = false;
      state.error = true;
    })
    .addCase(searchVendor.pending, (state) => {
      state.pending = true;
    })
    .addCase(searchVendor.fulfilled, (state, {payload}) => {
      state.pending = false;
      const response = payload;
      state.vendors = response.data;
    })
    .addCase(searchVendor.rejected, (state, {payload}) => {
      state.pending = false;
      state.errors = true;
    });
});
