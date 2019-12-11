import axios from 'axios';

import {
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
  GET_NOTIFICATIONS_CLEAR,
} from './types';

export const getNotifications = () => async (dispatch, getState) => {
  const { auth } = getState();
  try {
    dispatch({
      type: GET_NOTIFICATIONS_REQUEST,
    });

    const res = await axios.get(`api/v1/users/${auth.user.id}/notifications`);

    dispatch({
      type: GET_NOTIFICATIONS_SUCCESS,
      payload: {
        notifications: res.data.notifications,
      },
    });
  } catch (err) {
    dispatch({
      type: GET_NOTIFICATIONS_FAILURE,
      payload: {
        error: err.response.data.error,
      },
    });
  }
};

export const clearGetNotificationsErrors = () => async dispatch => {
  dispatch({ type: GET_NOTIFICATIONS_CLEAR });
};
