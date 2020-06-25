import { CATEGORY_SUCCESS, CATEGORY_FAIL } from '../actions/constants';

const initialState = {
  category: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CATEGORY_SUCCESS:
      return {
        ...state,
        category: payload,
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
