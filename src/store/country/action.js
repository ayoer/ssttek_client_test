import {createAsyncThunk} from '@reduxjs/toolkit';
import {notification} from 'antd';
import axios from 'axios';
import {apiUrl} from 'service/apiUrl';
import {SEARCH_COUNTRY} from './action-types';

export const searchCountry = createAsyncThunk(SEARCH_COUNTRY, async (filter) => {
  if (!filter) filter = {};

  try {
    const response = await axios.post(apiUrl.searchCountry, filter);
    return response.data;
  } catch (error) {
    notification.error({
      message: error.response.data.error.message,
    });
  }
});
