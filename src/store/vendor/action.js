import {createAsyncThunk} from '@reduxjs/toolkit';
import {notification} from 'antd';
import axios from 'axios';
import {apiUrl} from 'service/apiUrl';
import {GET_VENDOR, SEARCH_VENDOR, ADD_VENDOR, UPDATE_VENDOR, DELETE_VENDOR} from './action-types';

export const getVendor = createAsyncThunk(GET_VENDOR, async (id) => {
  const response = await axios.get(apiUrl.getVendor + '/' + id);
  return response.data;
});

export const searchVendor = createAsyncThunk(SEARCH_VENDOR, async (filter) => {
  if (!filter) filter = {};

  try {
    const response = await axios.post(apiUrl.searchVendor, filter);
    return response.data;
  } catch (error) {
    notification.error({
      message: error.response.data.error.message,
    });
  }
});

export const createVendor = createAsyncThunk(ADD_VENDOR, async (data) => {
  try {
    const response = await axios.post(apiUrl.addVendor, data);
    notification.success({message: 'Vendor Created'});
    return response.data;
  } catch (error) {
    notification.error({
      message: error.response.data.error.message,
    });
  }
});

export const updateVendor = createAsyncThunk(UPDATE_VENDOR, async (data) => {
  try {
    const response = await axios.put(apiUrl.updateVendor, data);
    notification.success({message: 'Vendor Updated'});
    return response.data;
  } catch (error) {
    notification.error({
      message: error.response.data.error.message,
    });
  }
});

export const deleteVendor = createAsyncThunk(DELETE_VENDOR, async (id) => {
  try {
    const response = await axios.delete(apiUrl.deleteVendor + '/' + id);
    notification.success({message: 'Vendor Deleted'});
    return response.data;
  } catch (error) {
    notification.error({
      message: error.response.data.error.message,
    });
  }
});
