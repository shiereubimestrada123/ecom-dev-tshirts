import axios from 'axios';
import { setAlertPrompt } from './alertPrompt';
import { CATEGORY_SUCCESS, CATEGORY_FAIL } from './constants';
import CreateCategory from '../../pages/dashboard/admin/CreateCategory';

export const CreateCategory = ({ name }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, userId });

  try {
    const res = await axios.post(`/api/category/create/${userId}`);

    dispatch({
      type: CATEGORY_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
