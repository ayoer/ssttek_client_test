import {configureStore} from '@reduxjs/toolkit';
import {vendorReducer} from './vendor';
import {countryReducer} from './country';

const store = configureStore({
  reducer: {
    vendor: vendorReducer,
    country: countryReducer,
  },
});

export default store;

// export const AppDispatch = store.dispatch;
// export const RootState = store.getState();
