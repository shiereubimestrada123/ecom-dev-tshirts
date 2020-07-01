import axios from 'axios';
import { setAlertPrompt } from './alertPrompt';
import { PRODUCT_SUCCESS, PRODUCT_FAIL } from './constants';

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
