import axios from 'axios';
// import queryString from 'query-string';
import setAuthToken from '../../utils/setAuthToken';
import { setAlertPrompt } from './alertPrompt';
import {
  PRODUCT_SUCCESS,
  // PRODUCT_FAIL,
  FILTERED_PRODUCTS,
  GET_PRODUCTS,
  GET_SINGLE_PRODUCT,
  ADD_PRODUCT_CART,
  DELETE_PRODUCT_CART,
  CREATE_ORDER,
  LIST_ORDERS,
  CAROUSEL_PRODUCTS,
  SOLD_PRODUCTS,
  DELETE_PRODUCT,
} from './constants';

export const deleteProduct = (productId, userId) => async (
  dispatch,
  getState
) => {
  try {
    const cartProducts = getState()
      .product.cartProducts.slice()
      .filter((cartProduct) => productId !== cartProduct._id);

    await axios.delete(`/api/product/${productId}/user/${userId}`);

    dispatch({
      type: DELETE_PRODUCT,
      payload: { productId, cartProducts },
    });

    dispatch(setAlertPrompt('Deleted product Successfully', 'success'));

    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  } catch (error) {
    console.log(error);
  }
};

export const showCarouselProducts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/product/carousel');

    dispatch({
      type: CAROUSEL_PRODUCTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const listOrders = (userId) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`/api/order/list/${userId}`);

    dispatch({
      type: LIST_ORDERS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = (userId, createOrderData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ order: createOrderData });

  try {
    const res = await axios.post(`/api/order/create/${userId}`, body, config);

    dispatch({
      type: CREATE_ORDER,
      payload: res.data,
    });

    dispatch(setAlertPrompt('Checkout Successfully', 'success'));

    localStorage.removeItem('cartProducts');
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);

    if (errors) {
      errors.forEach((error) => dispatch(setAlertPrompt(error.msg, 'danger')));
    }
  }
};

export const addProductCart = (product) => async (dispatch, getState) => {
  try {
    const cartProducts = getState().product.cartProducts.slice();
    let alreadyExists = false;
    cartProducts.forEach((x) => {
      if (x._id === product._id) {
        alreadyExists = true;
        x.count++;
      }
    });
    if (!alreadyExists) {
      cartProducts.push({ ...product, count: 1 });
    }
    dispatch({
      type: ADD_PRODUCT_CART,
      payload: { cartProducts },
    });
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  } catch (error) {
    console.log(error);
  }
};

export const clearProductCart = (product) => async (dispatch, getState) => {
  try {
    const cartProducts = getState()
      .product.cartProducts.slice()
      .filter((x) => x._id !== product._id);

    dispatch({
      type: DELETE_PRODUCT_CART,
      payload: { cartProducts },
    });

    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
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
export const getSoldProducts = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/product?sortBy=sold&order=desc&limit=9`);
    dispatch({
      type: SOLD_PRODUCTS,
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
