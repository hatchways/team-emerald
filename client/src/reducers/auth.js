import {
  PUT_USER_PROFILE_IMAGE_SUCCESS,
  POST_REGISTER_SUCCESS,
  POST_REGISTER_FAILURE,
  POST_AUTH_SUCCESS,
  POST_AUTH_FAILURE,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE,
  LOGOUT,
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PUT_USER_PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        user: { ...state.user, ...payload },
      };
    case POST_REGISTER_SUCCESS:
    case POST_AUTH_SUCCESS:
    case POST_LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
      };
    case POST_REGISTER_FAILURE:
    case POST_AUTH_FAILURE:
    case POST_LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}
