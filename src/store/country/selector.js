import {createSelector} from '@reduxjs/toolkit';

export const selectCountry = (state) => state.country;

export const countrySelector = createSelector(selectCountry, (state) => state);
