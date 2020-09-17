import {
  PRODUCT_SUCCESS,
  FILTERED_PRODUCTS,
  GET_PRODUCTS,
  GET_SINGLE_PRODUCT,
  ADD_PRODUCT_CART,
  DELETE_PRODUCT_CART,
  REMOVE_CART,
  CREATE_ORDER,
} from '../actions/constants';

const initialState = {
  product: null,
  results: [],
  products: [],
  filteredProducts: [],
  loading: true,
  error: {},
  cartProducts: JSON.parse(localStorage.getItem('cartProducts') || '[]'),
  order: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_ORDER: {
      return {
        ...state,
        cartProducts: [],
        order: payload,
      };
    }
    case REMOVE_CART:
      return {
        ...state,
        cartProducts: [],
      };
    case ADD_PRODUCT_CART:
      return {
        ...state,
        cartProducts: payload.cartProducts,
        loading: false,
      };
    case DELETE_PRODUCT_CART:
      return {
        ...state,
        cartProducts: payload.cartProducts,
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
