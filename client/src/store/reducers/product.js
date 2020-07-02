import {
  PRODUCT_SUCCESS,
  PRODUCT_FAIL,
  PRODUCT_BY_SELL,
  PRODUCT_BY_ARRIVAL,
} from '../actions/constants';

const initialState = {
  product: null,
  products: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_SUCCESS:
      return {
        ...state,
        product: payload,
        loading: false,
      };
    case PRODUCT_BY_SELL:
      return {
        ...state,
        products: payload,
        loading: false,
      };
    default:
      return state;
  }
}
