import {
  CATEGORY_SUCCESS,
  CATEGORY_FAIL,
  GET_CATEGORIES,
  GET_CATEGORY,
} from '../actions/constants';

const initialState = {
  category: null,
  categories: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CATEGORY_SUCCESS:
    case GET_CATEGORY:
      return {
        ...state,
        category: payload,
        loading: false,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
        loading: false,
      };
    case CATEGORY_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
