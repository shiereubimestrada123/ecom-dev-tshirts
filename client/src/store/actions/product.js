import axios from 'axios';
// import queryString from 'query-string';
import { setAlertPrompt } from './alertPrompt';
import {
  PRODUCT_SUCCESS,
  // PRODUCT_FAIL,
  FILTERED_PRODUCTS,
  GET_PRODUCTS,
  GET_SINGLE_PRODUCT,
  ADD_PRODUCT_CART,
  CLEAR_PRODUCT_CART,
  // SEARCH_PRODUCTS,
} from './constants';

export const addProductCart = (product) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_PRODUCT_CART,
      payload: product,
    });
  } catch (error) {
    console.log(error);
  }
};

export const clearProductCart = (product) => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_PRODUCT_CART,
      payload: product,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleProduct = (productId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/product/${productId}`);

    dispatch({
      type: GET_SINGLE_PRODUCT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/product?sortBy=createdAt&order=desc`);
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getFilteredProducts = (skip, limit, selectedCategoryId) => async (
  dispatch
) => {
  try {
    const data = {
      limit,
      skip,
      selectedCategoryId,
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

// export const createSearch = (search) => async (dispatch) => {
//   try {
//     const query = queryString.stringify({ search: search });

//     const res = await axios.get(`/api/product/search?${query}`);

//     dispatch({
//       type: SEARCH_PRODUCTS,
//       payload: res.data,
//     });
//   } catch (error) {
//     console.log('search errorrrrrrrrrrr');
//     console.log(error);
//   }
// };
