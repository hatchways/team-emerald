import {
  GET_FOLLOWS_SUCCESS,
  CREATE_FOLLOW_SUCCESS,
  DELETE_FOLLOW_SUCCESS,
} from '../actions/types';

const initialState = {
  follows: [],
};

export default function followReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_FOLLOWS_SUCCESS:
      return { follows: payload.follows };
    case CREATE_FOLLOW_SUCCESS:
      return {
        follows: [...state.follows, payload],
      };
    case DELETE_FOLLOW_SUCCESS:
      return {
        follows: state.follows.filter(entry => {
          if (entry.followee.id === payload.followee.id) {
            return false;
          }
          return true;
        }),
      };
    default:
      return state;
  }
}
