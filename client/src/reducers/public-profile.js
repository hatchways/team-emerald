import { GET_PUBLICPROFILE_LISTS_SUCCESS } from '../actions/types';

const initialState = {
  lists: [],
  follows: [],
};

export default function publicProfileReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PUBLICPROFILE_LISTS_SUCCESS:
      return {
        ...state,
        lists: payload.lists,
      };
    default:
      return state;
  }
}
