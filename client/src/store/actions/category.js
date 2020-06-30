import axios from 'axios';
import { setAlertPrompt } from './alertPrompt';
import { CATEGORY_SUCCESS, CATEGORY_FAIL, GET_CATEGORIES } from './constants';

export const createCategory = (name, userId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name });

  try {
    const res = await axios.post(
      `/api/category/create/${userId}`,
      body,
      config
    );

    dispatch({
      type: CATEGORY_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlertPrompt('Category name added successfully', 'success'));
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlertPrompt(error.msg, 'danger')));
    }

    // dispatch({
    //   type: CATEGORY_FAIL,
    //   payload: {
    //     msg: error.response.statusText,
    //     status: error.response.status,
    //   },
    // });
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/category');

    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
