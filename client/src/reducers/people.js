/* eslint-disable prefer-object-spread */
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

function normalizePeopleAndApplyFollows(people, follows) {
  return Object.assign(
    {},
    ...people.map(person => ({
      [person.id]: {
        ...person,
        isFollowed: Boolean(follows[person.id]),
      },
    })),
  );
}

function mergeFolloweesArrayToPeople(people, follows) {
  return Object.assign(
    {},
    people,
    ...follows.map(entry => ({
      [entry.followee.id]: { ...entry.followee, isFollowed: true },
    })),
  );
}

export default function peopleReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PEOPLE_SUCCESS:
      return normalizePeopleAndApplyFollows(
        payload.users,
        normalizeFollowees(payload.follows),
      );
    case GET_FOLLOWS_SUCCESS:
      return mergeFolloweesArrayToPeople(state, payload);
    case CREATE_FOLLOW_SUCCESS:
      return Object.assign({}, state, {
        [payload.id]: { ...state[payload.id], isFollowed: true },
      });
    case DELETE_FOLLOW_SUCCESS:
      return Object.assign({}, state, {
        [payload.id]: { ...state[payload.id], isFollowed: false },
      });
    case GET_PUBLICPROFILE_USER_SUCCESS:
      return Object.assign({}, state, {
        [payload.id]: {
          ...payload,
        },
      });
    default:
      return state;
  }
}
