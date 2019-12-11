import axios from 'axios';

import {
  GET_PUBLICPROFILE_LISTS_REQUEST,
  GET_PUBLICPROFILE_LISTS_SUCCESS,
  GET_PUBLICPROFILE_LISTS_FAILURE,
  GET_PUBLICPROFILE_LISTS_CLEAR,
  GET_PUBLICPROFILE_USER_REQUEST,
  GET_PUBLICPROFILE_USER_SUCCESS,
  GET_PUBLICPROFILE_USER_FAILURE,
  GET_PUBLICPROFILE_USER_CLEAR,
} from './types';

// eslint-disable-next-line import/prefer-default-export
export const getPublicProfile = userId => async dispatch => {
  try {
    dispatch({ type: GET_PUBLICPROFILE_USER_REQUEST });
    const res = await axios.get(`/api/v1/public/${userId}`);

    dispatch({
      type: GET_PUBLICPROFILE_USER_SUCCESS,
      payload: {
        ...res.data.user,
      },
    });
  } catch (err) {
    dispatch({
      type: GET_PUBLICPROFILE_USER_FAILURE,
      payload: {
        error: err.response ? err.response.data.error : {},
      },
    });
  }

  try {
    dispatch({
      type: GET_PUBLICPROFILE_LISTS_REQUEST,
    });
    const res = await axios.get(`/api/v1/users/${userId}/lists`);

    dispatch({
      type: GET_PUBLICPROFILE_LISTS_SUCCESS,
      payload: {
        lists: res.data.lists,
      },
    });
  } catch (err) {
    dispatch({
      type: GET_PUBLICPROFILE_LISTS_FAILURE,
      payload: {
        error: err.response ? err.response.data.error : {},
      },
    });
  }
};

export const clearGetPublicListsErrors = () => async dispatch => {
  dispatch({ type: GET_PUBLICPROFILE_LISTS_CLEAR });
};

export const clearGetPublicUserErrors = () => async dispatch => {
  dispatch({ type: GET_PUBLICPROFILE_USER_CLEAR });
};
