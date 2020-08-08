import {
  PRODUCT_SUCCESS,
  FILTERED_PRODUCTS,
  GET_PRODUCTS,
  GET_SINGLE_PRODUCT,
  ADD_PRODUCT_CART,
} from '../actions/constants';

import { addItemToCart } from './utils';

const initialState = {
  product: null,
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
    case ADD_PRODUCT_CART:
      // const existingCartProduct = state.cartProducts.find(
      //   (cartProduct) => cartProduct._id === payload._id
      // );

      // console.log(existingCartProduct);

      // if (existingCartProduct) {
      //   return state.cartProducts.map((cartProduct) =>
      //     cartProduct._id === payload._id
      //       ? { ...cartProduct, count: cartProduct.count + 1 }
      //       : cartProduct
      //   );
      // }

      return {
        ...state,
        cartProducts: addItemToCart(state.cartProducts, payload),
        // cartProducts: [...state.cartProducts, { ...payload, count: 10 }],
        loading: false,
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
