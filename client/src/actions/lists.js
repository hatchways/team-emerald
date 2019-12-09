import axios from 'axios';

import {
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAILURE,
  POST_LIST_CLEAR,
} from './types';

export const createList = (name, file) => async dispatch => {
  try {
    dispatch({
      type: POST_LIST_REQUEST,
    });

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('name', name);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const res = await axios.post(`/api/v1/lists`, formData, config);

    dispatch({
      type: POST_LIST_SUCCESS,
      payload: {
        list: res.data.list,
      },
    });
  } catch (err) {
    dispatch({
      type: POST_LIST_FAILURE,
      payload: {
        error: err.response.data.error,
      },
    });
  }
};

export const clearPostListErrors = () => async dispatch => {
  dispatch({ type: POST_LIST_CLEAR });
};
