import {
  GET_PUBLIC_LISTS_SUCCESS,
  GET_PUBLIC_USER_SUCCESS,
} from '../actions/types';

const initialState = {
  user: null,
  lists: [],
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
    default:
      return state;
  }
}
