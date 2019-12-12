import axios from 'axios';

import {
  GET_PEOPLE_REQUEST,
  GET_PEOPLE_SUCCESS,
  GET_PEOPLE_FAILURE,
  GET_PEOPLE_CLEAR,
} from './types';

export const getPeople = () => async dispatch => {
  try {
    dispatch({
      type: GET_PEOPLE_REQUEST,
    });

    const res = await axios('/api/v1/users');

    dispatch({
      type: GET_PEOPLE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PEOPLE_FAILURE,
      payload: {
        error: err.response.data.error,
      },
    });
  }
};

export const clearGetPeopleErrors = () => async dispatch => {
  dispatch({ type: GET_PEOPLE_CLEAR });
};
