import {
  PRODUCT_SUCCESS,
  FILTERED_PRODUCTS,
  GET_PRODUCTS,
  GET_SINGLE_PRODUCT,
  ADD_PRODUCT_CART,
  CLEAR_PRODUCT_CART,
  GET_BRAINTREE_CLIENT_TOKEN,
} from '../actions/constants';

import { addItemToCart } from './utils';

const initialState = {
  product: null,
  clientToken: null,
  instance: {},
  results: [],
  products: [],
  filteredProducts: [],
  cartProducts: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BRAINTREE_CLIENT_TOKEN:
      return {
        ...state,
        clientToken: payload,
        loading: false,
      };
    case ADD_PRODUCT_CART:
      return {
        ...state,
        cartProducts: addItemToCart(state.cartProducts, payload),
        loading: false,
      };
    case CLEAR_PRODUCT_CART:
      return {
        ...state,
        cartProducts: state.cartProducts.filter(
          (cartProduct) => cartProduct._id !== payload._id
        ),
      };
    case GET_SINGLE_PRODUCT:
      return {
        ...state,
        product: payload,
        loading: false,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false,
      };
    case FILTERED_PRODUCTS:
      return {
        ...state,
        filteredProducts: payload,
        loading: false,
      };
    case PRODUCT_SUCCESS:
      return {
        ...state,
        product: payload,
        loading: false,
      };
    default:
      return state;
  }
}
