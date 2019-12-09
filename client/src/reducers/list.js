import { POST_LIST_SUCCESS } from '../actions/types';

const initialState = {
  lists: [],
};

export default function listReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case POST_LIST_SUCCESS:
      return {
        ...state,
        lists: [...state.lists, payload.list],
      };
    default:
      return state;
  }
}
