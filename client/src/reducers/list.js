import {
  GET_LISTS_SUCCESS,
  POST_LIST_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
} from '../actions/types';

const initialState = {
  lists: [],
};
export default function listReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LISTS_SUCCESS:
      return {
        ...state,
        lists: payload.lists,
      };
    case POST_LIST_SUCCESS:
      return {
        ...state,
        lists: [...state.lists, payload.list],
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        lists: state.lists.filter(list => list.id !== payload.list.id),
      };
    default:
      return state;
  }
}
