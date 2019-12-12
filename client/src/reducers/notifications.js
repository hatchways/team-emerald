import {
  GET_NOTIFICATIONS_SUCCESS,
  PUT_NOTIFICATIONS_SUCCESS,
  CLEAR_NOTIFICATIONS,
} from '../actions/types';

const initialState = {
  notifications: [],
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: payload.notifications,
      };
    case PUT_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== payload.notificationId,
        ),
      };
    case CLEAR_NOTIFICATIONS:
      return initialState;
    default:
      return state;
  }
}
