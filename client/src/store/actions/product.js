import axios from 'axios';
import { setAlertPrompt } from './alertPrompt';
import {
  PRODUCT_SUCCESS,
  PRODUCT_FAIL,
  PRODUCT_BY_SELL,
  PRODUCT_BY_ARRIVAL,
} from './constants';

export const createProduct = (formData, userId) => async (dispatch) => {
  const body = formData;

  try {
    const config = {
      headers: {
        Accept: 'application/json',
      },
    };

    const res = await axios.post(`/api/product/create/${userId}`, body, config);

    dispatch({
      type: PRODUCT_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlertPrompt('Product added successfully', 'success'));
  } catch (error) {
    dispatch(setAlertPrompt(error.response.data.error, 'danger'));
  }
};

export const loadProductsBySell = (sortBy) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/product?sortBy=${sortBy}&order=desc&limit=6`
    );

    dispatch({
      type: PRODUCT_BY_SELL,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const loadProductsByArrival = (sortBy) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/product?sortBy=${sortBy}&order=desc&limit=6`
    );

    dispatch({
      type: PRODUCT_BY_ARRIVAL,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
