import {
  PRODUCT_SUCCESS,
  FILTERED_PRODUCTS,
  GET_PRODUCTS,
  GET_SINGLE_PRODUCT,
  ADD_PRODUCT_CART,
  DELETE_PRODUCT_CART,
  CREATE_ORDER,
  LIST_ORDERS,
  RESET_CART,
  CAROUSEL_PRODUCTS,
  SOLD_PRODUCTS,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
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
  orders: [],
  // carouselProducts: [],
  soldProducts: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_PRODUCT: {
      return {
        ...state,
        products: payload,
        loading: false,
      };
    }
    case DELETE_PRODUCT: {
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== payload.productId
        ),
        cartProducts: payload.cartProducts,
        loading: false,
      };
    }
    case SOLD_PRODUCTS: {
      return {
        ...state,
        soldProducts: payload,
        loading: false,
      };
    }
    // case CAROUSEL_PRODUCTS: {
    //   return {
    //     ...state,
    //     carouselProducts: payload,
    //     loading: false,
    //   };
    // }
    case LIST_ORDERS: {
      return {
        ...state,
        orders: payload,
        loading: false,
      };
    }
    case CREATE_ORDER: {
      return {
        ...state,
        cartProducts: [],
        order: payload,
        loading: false,
      };
    }
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
    case RESET_CART:
      return {
        ...state,
        cartProducts: [],
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
