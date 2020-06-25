import { CATEGORY_SUCCESS, CATEGORY_FAIL } from '../actions/constants';

const initialState = {
  category: null,
  loading: false,
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
    default:
      return state;
  }
}
