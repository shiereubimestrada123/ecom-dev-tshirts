import axios from 'axios';
import { setAlertPrompt } from './alertPrompt';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  UPDATE_USER,
  RESET_CART,
} from './constants';

// Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const updateUser = ({ name, password, email, userId }) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, password, email });

  try {
    const res = await axios.put(`/api/auth/${userId}`, body, config);

    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });

    dispatch(setAlertPrompt('Updated profile successfully', 'success'));
  } catch (error) {
    console.log(error);
  }
};

// Register user
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlertPrompt('Registered Successfully', 'success'));

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlertPrompt(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlertPrompt('Login Successfully', 'success'));

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlertPrompt(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout
export const logout = () => async (dispatch) => {
  localStorage.removeItem('cartProducts');
  dispatch({
    type: LOGOUT,
  });
  dispatch({
    type: RESET_CART,
  });
};
