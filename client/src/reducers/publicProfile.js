import {
  GET_PUBLIC_LISTS_SUCCESS,
  GET_PUBLIC_USER_SUCCESS,
  GET_PUBLIC_FOLLOWS_SUCCESS,
} from '../actions/types';

const initialState = {
  user: null,
  lists: [],
  follows: [],
};

export default function publicProfileReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PUBLIC_USER_SUCCESS:
      return {
        ...state,
        user: payload.user,
      };
    case GET_PUBLIC_LISTS_SUCCESS:
      return {
        ...state,
        lists: payload.lists,
      };
    case GET_PUBLIC_FOLLOWS_SUCCESS:
      return {
        ...state,
        follows: payload.follows,
      };
    default:
      return state;
  }
}
