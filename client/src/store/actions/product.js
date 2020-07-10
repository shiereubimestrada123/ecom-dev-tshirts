import axios from 'axios';
import { setAlertPrompt } from './alertPrompt';
import {
  PRODUCT_SUCCESS,
  PRODUCT_FAIL,
  PRODUCT_BY_SELL,
  PRODUCT_BY_ARRIVAL,
  FILTERED_PRODUCTS,
} from './constants';

export const getFilteredProducts = (skip, limit, filters = {}) => async (
  dispatch
) => {
  try {
    const data = {
      limit,
      skip,
      filters,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(data);

    const res = await axios.post(`/api/product/by/search`, body, config);

    dispatch({
      type: FILTERED_PRODUCTS,
      payload: res.data.products,
    });
  } catch (error) {
    console.log('123');
    console.log(error);
  }
};

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

// export const loadProductsBySell = (sortBy) => async (dispatch) => {
//   try {
//     const res = await axios.get(
//       `/api/product?sortBy=${sortBy}&order=desc&limit=7`
//     );

//     dispatch({
//       type: PRODUCT_BY_SELL,
//       payload: res.data,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const loadProductsByArrival = (sortBy) => async (dispatch) => {
//   try {
//     const res = await axios.get(
//       `/api/product?sortBy=${sortBy}&order=desc&limit=4`
//     );

//     dispatch({
//       type: PRODUCT_BY_ARRIVAL,
//       payload: res.data,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
