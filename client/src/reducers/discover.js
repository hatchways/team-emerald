import {
  GET_PEOPLE_SUCCESS,
  GET_FOLLOWS_SUCCESS,
  CREATE_FOLLOW_SUCCESS,
  DELETE_FOLLOW_SUCCESS,
  GET_PUBLICPROFILE_USER_SUCCESS,
} from '../actions/types';

const initialState = {};

function normalizeFollowees(follows) {
  return Object.assign(
    {},
    ...follows.map(follow => ({
      [follow.followee]: follow,
    })),
  );
}

function normalizePeopleAndApplyFollows(discover, follows) {
  return Object.assign(
    {},
    ...discover.map(person => ({
      [person.id]: {
        ...person,
        isFollowed: Boolean(follows[person.id]),
      },
    })),
  );
}

function mergeFolloweesArrayToPeople(discover, follows) {
  return Object.assign(
    {},
    discover,
    ...follows.map(entry => ({
      [entry.followee.id]: { ...entry.followee, isFollowed: true },
    })),
  );
}

export default function discoverReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PEOPLE_SUCCESS:
      return normalizePeopleAndApplyFollows(
        payload.users,
        normalizeFollowees(payload.follows),
      );
    case GET_FOLLOWS_SUCCESS:
      return mergeFolloweesArrayToPeople(state, payload.follows);
    case CREATE_FOLLOW_SUCCESS:
      // eslint-disable-next-line prefer-object-spread
      return Object.assign({}, state, {
        [payload.followee.id]: {
          ...state[payload.followee.id],
          isFollowed: true,
        },
      });
    case DELETE_FOLLOW_SUCCESS:
      // eslint-disable-next-line prefer-object-spread
      return Object.assign({}, state, {
        [payload.followee.id]: {
          ...state[payload.followee.id],
          isFollowed: false,
        },
      });
    case GET_PUBLICPROFILE_USER_SUCCESS:
      // eslint-disable-next-line prefer-object-spread
      return Object.assign({}, state, {
        [payload.user.id]: {
          ...payload.user,
        },
      });
    default:
      return state;
  }
}
