import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
  error: '',
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        error: '',
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        ...payload,
        isAuthenticated: false,
        loading: true,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
        user: null,
        error: '',
      };
    default:
      return state;
  }
}
