import {
  PRODUCT_SUCCESS,
  FILTERED_PRODUCTS,
  GET_PRODUCTS,
  // SEARCH_PRODUCTS,
} from '../actions/constants';

const initialState = {
  product: null,
  results: [],
  products: [],
  filteredProducts: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // case SEARCH_PRODUCTS: {
    //   return {
    //     ...state,
    //     results: payload,
    //     loading: false,
    //   };
    // }
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
