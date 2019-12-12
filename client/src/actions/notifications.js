import axios from 'axios';

import {
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
  GET_NOTIFICATIONS_CLEAR,
  PUT_NOTIFICATIONS_REQUEST,
  PUT_NOTIFICATIONS_SUCCESS,
  PUT_NOTIFICATIONS_FAILURE,
  PUT_NOTIFICATIONS_CLEAR,
} from './types';

export const getNotifications = () => async (dispatch, getState) => {
  const { auth } = getState();
  try {
    dispatch({
      type: GET_NOTIFICATIONS_REQUEST,
    });

    if (!auth.user) {
      throw new Error('Not authenticated');
    }
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
        error: err.response ? err.response.data.error : err.message,
      },
    });
  }
};

export const putNotifications = notificationId => async (
  dispatch,
  getState,
) => {
  const { auth } = getState();
  try {
    dispatch({
      type: PUT_NOTIFICATIONS_REQUEST,
    });

    if (!auth.user) {
      throw new Error('Not authenticated');
    }
    const res = await axios.put(
      `/api/v1/users/${auth.user.id}/notifications/${notificationId}`,
    );

    dispatch({
      type: PUT_NOTIFICATIONS_SUCCESS,
      payload: {
        notificationId: res.data.notificationId,
      },
    });
  } catch (err) {
    dispatch({
      type: PUT_NOTIFICATIONS_FAILURE,
      payload: {
        error: err.response ? err.response.data.error : err.message,
      },
    });
  }
};

export const clearGetNotificationsErrors = () => async dispatch => {
  dispatch({ type: GET_NOTIFICATIONS_CLEAR });
};

export const clearPutNotificationsErrors = () => async dispatch => {
  dispatch({ type: PUT_NOTIFICATIONS_CLEAR });
};
