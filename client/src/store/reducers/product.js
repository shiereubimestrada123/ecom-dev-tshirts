import {
  PRODUCT_SUCCESS,
  PRODUCT_FAIL,
  PRODUCT_BY_SELL,
  PRODUCT_BY_ARRIVAL,
  FILTERED_PRODUCTS,
} from '../actions/constants';

const initialState = {
  product: null,
  filteredProducts: [],
  productsSell: [],
  productsArrival: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
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
    case PRODUCT_BY_SELL:
      return {
        ...state,
        productsSell: payload,
        loading: false,
      };
    case PRODUCT_BY_ARRIVAL:
      return {
        ...state,
        productsArrival: payload,
        loading: false,
      };
    default:
      return state;
  }
}
