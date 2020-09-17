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
  GET_BRAINTREE_CLIENT_TOKEN,
  DELETE_PRODUCT_CART,
  REMOVE_CART,
  CREATE_ORDER,
} from './constants';

export const createOrder = (userId, createOrderData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ order: createOrderData });

  try {
    const res = await axios.post(`/api/order/create/${userId}`, body, config);
    console.log(res.data);
    dispatch({
      type: CREATE_ORDER,
      payload: res.data,
    });

    localStorage.removeItem('cartProducts');
  } catch (error) {
    console.log(error);
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
