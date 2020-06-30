import axios from 'axios';
import { setAlertPrompt } from './alertPrompt';
import { PRODUCT_SUCCESS, PRODUCT_FAIL } from './constants';

export const createProduct = ({
  name,
  description,
  price,
  shipping,
  quantity,
  photo,
  userId,
}) => async (dispatch) => {
  const body = JSON.stringify({
    name,
    description,
    price,
    shipping,
    quantity,
    photo,
  });

  try {
    const res = await axios.post(`/api/product/create/${userId}`, body);

    dispatch({
      type: PRODUCT_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlertPrompt('Product added successfully', 'success'));
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlertPrompt(error.msg, 'danger')));
    }
  }
};
