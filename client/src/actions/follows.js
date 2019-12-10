import axios from 'axios';

import {
  GET_FOLLOWS_REQUEST,
  GET_FOLLOWS_SUCCESS,
  GET_FOLLOWS_FAILURE,
  GET_FOLLOWS_CLEAR,
  CREATE_FOLLOW_REQUEST,
  CREATE_FOLLOW_SUCCESS,
  CREATE_FOLLOW_FAILURE,
  CREATE_FOLLOW_CLEAR,
  DELETE_FOLLOW_REQUEST,
  DELETE_FOLLOW_SUCCESS,
  DELETE_FOLLOW_FAILURE,
  DELETE_FOLLOW_CLEAR,
  GET_PUBLIC_FOLLOWS_REQUEST,
  GET_PUBLIC_FOLLOWS_SUCCESS,
  GET_PUBLIC_FOLLOWS_FAILURE,
  GET_PUBLIC_FOLLOWS_CLEAR,
} from './types';

export const getFollows = (userId, options = {}) => async dispatch => {
  const { publicProfile } = options;

  try {
    dispatch({
      type: publicProfile ? GET_PUBLIC_FOLLOWS_REQUEST : GET_FOLLOWS_REQUEST,
    });

    const res = await axios.get(`/api/v1/users/${userId}/follows`);

    dispatch({
      type: publicProfile ? GET_PUBLIC_FOLLOWS_SUCCESS : GET_FOLLOWS_SUCCESS,
      payload: {
        follows: res.data,
      },
    });
  } catch (err) {
    dispatch({
      type: publicProfile ? GET_PUBLIC_FOLLOWS_FAILURE : GET_FOLLOWS_FAILURE,
      payload: {
        error: err.response.data.error,
      },
    });
  }
};

export const createFollow = userId => async dispatch => {
  try {
    dispatch({
      type: CREATE_FOLLOW_REQUEST,
    });

    const res = await axios.post(`/api/v1/follows/${userId}`);

    if (res.success && res.data.id === userId) {
      dispatch({
        type: CREATE_FOLLOW_SUCCESS,
        payload: {
          followee: res.data,
        },
      });
    }
  } catch (err) {
    if (err) {
      dispatch({
        type: CREATE_FOLLOW_FAILURE,
        payload: {
          error: err.response.data.error,
        },
      });
    }
  }
};

export const deleteFollow = userId => async dispatch => {
  try {
    dispatch({
      type: DELETE_FOLLOW_REQUEST,
    });

    const res = await axios.delete(`/api/v1/follows/${userId}`);

    if (res.success && res.data.id === userId) {
      dispatch({
        type: DELETE_FOLLOW_SUCCESS,
        payload: {
          followee: res.data,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: DELETE_FOLLOW_FAILURE,
      payload: {
        error: err.response.data.error,
      },
    });
  }
};

export const clearGetFollowsErrors = (options = {}) => async dispatch => {
  if (options.publicProfile) {
    return dispatch({
      type: GET_PUBLIC_FOLLOWS_CLEAR,
    });
  }

  return dispatch({
    type: GET_FOLLOWS_CLEAR,
  });
};

export const clearCreateFollowsError = () => async dispatch => {
  return dispatch({
    type: CREATE_FOLLOW_CLEAR,
  });
};

export const deleteCreateFollowsError = () => async dispatch => {
  return dispatch({
    type: DELETE_FOLLOW_CLEAR,
  });
};
