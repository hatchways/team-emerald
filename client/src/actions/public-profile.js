import axios from 'axios';

import {
  GET_PUBLIC_LISTS_REQUEST,
  GET_PUBLIC_LISTS_SUCCESS,
  GET_PUBLIC_LISTS_FAILURE,
  GET_PUBLIC_LISTS_CLEAR,
  GET_PUBLIC_USER_REQUEST,
  GET_PUBLIC_USER_SUCCESS,
  GET_PUBLIC_USER_FAILURE,
  GET_PUBLIC_USER_CLEAR,
} from './types';

// eslint-disable-next-line import/prefer-default-export
export const getPublicProfile = userId => async dispatch => {
  try {
    dispatch({ type: GET_PUBLIC_USER_REQUEST });

    const res = await axios.get(`api/v1/public/${userId}`);

    dispatch({
      type: GET_PUBLIC_USER_SUCCESS,
      payload: {
        user: res.data.user,
      },
    });
  } catch (err) {
    return dispatch({
      type: GET_PUBLIC_USER_FAILURE,
      payload: {
        error: err.response.data.error,
      },
    });
  }

  try {
    dispatch({
      type: GET_PUBLIC_LISTS_REQUEST,
    });

    const res = await axios.get(`api/v1/public/${userId}/lists`);

    dispatch({
      type: GET_PUBLIC_LISTS_SUCCESS,
      payload: {
        lists: res.data.lists,
      },
    });
  } catch (err) {
    dispatch({
      type: GET_PUBLIC_LISTS_FAILURE,
      payload: {
        error: err.response.data.error,
      },
    });
  }
};

export const clearGetPublicListsErrors = () => async dispatch => {
  dispatch({ type: GET_PUBLIC_LISTS_CLEAR });
};

export const clearGetPublicUserErrors = () => async dispatch => {
  dispatch({ type: GET_PUBLIC_USER_CLEAR });
};
