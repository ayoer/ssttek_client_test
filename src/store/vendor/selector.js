import {createSelector} from '@reduxjs/toolkit';

export const selectVendor = (state) => state.vendor;

export const vendorSelector = createSelector(selectVendor, (state) => state);
