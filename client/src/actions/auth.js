import axios from 'axios';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_SUCCESS,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';

// Authenticate user - determines whether or not the user is
// has an existing valid token
export const authenticateUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/auth');
    dispatch({
      type: AUTH_SUCCESS,
      payload: res.data.user,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = { name, email, password };

  try {
    const res = await axios.post('/api/v1/auth/register', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: {
        user: res.data.user,
      },
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: {
        error: err.response.data.error,
      },
    });
  }
};

// Login User
export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = { email, password };

  try {
    const res = await axios.post('/api/v1/auth/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user: res.data.user,
      },
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: {
        error: err.response.data.error,
      },
    });
  }
};

// Logout / Clear Profile
export const logout = () => async dispatch => {
  try {
    await axios.post('/api/v1/auth/logout');
    dispatch({ type: LOGOUT });
  } catch (err) {
    // To be worked on for the logout functionality
    console.log('err.response.data.error'); // eslint-disable-line
  }
};
