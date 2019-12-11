import { GET_NOTIFICATIONS_SUCCESS } from '../actions/types';

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
    default:
      return state;
  }
}
