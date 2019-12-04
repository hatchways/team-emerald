import axios from 'axios';

import {
  POST_REGISTER_REQUEST,
  POST_REGISTER_SUCCESS,
  POST_REGISTER_FAILURE,
  POST_AUTH_REQUEST,
  POST_AUTH_SUCCESS,
  POST_AUTH_FAILURE,
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE,
  LOGOUT,
} from './types';

// Authenticate user - determines whether or not the user is
// has an existing valid token
export const authenticateUser = () => async dispatch => {
  try {
    dispatch({
      type: POST_AUTH_REQUEST,
    });

    const res = await axios.get('/api/v1/auth');

    dispatch({
      type: POST_AUTH_SUCCESS,
      payload: {
        user: res.data.user,
      },
    });
  } catch (err) {
    dispatch({
      type: POST_AUTH_FAILURE,
      payload: {
        error: err.response.data.error,
      },
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
    dispatch({
      type: POST_REGISTER_REQUEST,
    });

    const res = await axios.post('/api/v1/auth/register', body, config);

    dispatch({
      type: POST_REGISTER_SUCCESS,
      payload: {
        user: res.data.user,
      },
    });
  } catch (err) {
    dispatch({
      type: POST_REGISTER_FAILURE,
      payload: {
        error: err.response.data.error,
      },
    });
  }
};

// Login User
export const login = ({ email, password }) => async dispatch => {
  dispatch({
    type: POST_LOGIN_REQUEST,
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = { email, password };

  try {
    const res = await axios.post('/api/v1/auth/login', body, config);

    dispatch({
      type: POST_LOGIN_SUCCESS,
      payload: {
        user: res.data.user,
      },
    });
  } catch (err) {
    dispatch({
      type: POST_LOGIN_FAILURE,
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
    // If a user deletes his/her token and attempts to logout, it should reset the state
    dispatch({ type: LOGOUT });
  }
};
