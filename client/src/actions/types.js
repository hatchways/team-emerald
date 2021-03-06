// Single source of truth for action types
function createLoadingActionType(suffix) {
  return actionName => {
    return `${actionName}_${suffix}`;
  };
}

const createRequestActionType = createLoadingActionType('REQUEST');
const createSuccessActionType = createLoadingActionType('SUCCESS');
const createFailureActionType = createLoadingActionType('FAILURE');
const createClearActionType = createLoadingActionType('CLEAR');

// authentication

export const POST_REGISTER = 'POST_REGISTER';
export const POST_REGISTER_REQUEST = createRequestActionType(POST_REGISTER);
export const POST_REGISTER_SUCCESS = createSuccessActionType(POST_REGISTER);
export const POST_REGISTER_FAILURE = createFailureActionType(POST_REGISTER);
export const POST_REGISTER_CLEAR = createClearActionType(POST_REGISTER);

export const POST_AUTH = 'POST_AUTH';
export const POST_AUTH_REQUEST = createRequestActionType(POST_AUTH);
export const POST_AUTH_SUCCESS = createSuccessActionType(POST_AUTH);
export const POST_AUTH_FAILURE = createFailureActionType(POST_AUTH);

export const POST_LOGIN = 'POST_LOGIN';
export const POST_LOGIN_REQUEST = createRequestActionType(POST_LOGIN);
export const POST_LOGIN_SUCCESS = createSuccessActionType(POST_LOGIN);
export const POST_LOGIN_FAILURE = createFailureActionType(POST_LOGIN);
export const POST_LOGIN_CLEAR = createClearActionType(POST_LOGIN);

export const LOGOUT = 'LOGOUT';

// user

export const PUT_USER_PROFILE_IMAGE = 'PUT_USER_PROFILE_IMAGE';
export const PUT_USER_PROFILE_IMAGE_REQUEST = createRequestActionType(
  PUT_USER_PROFILE_IMAGE,
);
export const PUT_USER_PROFILE_IMAGE_SUCCESS = createSuccessActionType(
  PUT_USER_PROFILE_IMAGE,
);
export const PUT_USER_PROFILE_IMAGE_FAILURE = createFailureActionType(
  PUT_USER_PROFILE_IMAGE,
);
export const PUT_USER_PROFILE_IMAGE_CLEAR = createClearActionType(
  PUT_USER_PROFILE_IMAGE,
);

// list

export const GET_LISTS = 'GET_LISTS';
export const GET_LISTS_REQUEST = createRequestActionType(GET_LISTS);
export const GET_LISTS_SUCCESS = createSuccessActionType(GET_LISTS);
export const GET_LISTS_FAILURE = createFailureActionType(GET_LISTS);
export const GET_LISTS_CLEAR = createClearActionType(GET_LISTS);

export const POST_LIST = 'POST_LIST';
export const POST_LIST_REQUEST = createRequestActionType(POST_LIST);
export const POST_LIST_SUCCESS = createSuccessActionType(POST_LIST);
export const POST_LIST_FAILURE = createFailureActionType(POST_LIST);
export const POST_LIST_CLEAR = createClearActionType(POST_LIST);

// notification

export const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS';
export const GET_NOTIFICATIONS_REQUEST = createRequestActionType(
  GET_NOTIFICATIONS,
);
export const GET_NOTIFICATIONS_SUCCESS = createSuccessActionType(
  GET_NOTIFICATIONS,
);
export const GET_NOTIFICATIONS_FAILURE = createFailureActionType(
  GET_NOTIFICATIONS,
);
export const GET_NOTIFICATIONS_CLEAR = createClearActionType(GET_NOTIFICATIONS);

export const PUT_NOTIFICATIONS = 'PUT_NOTIFICATIONS';
export const PUT_NOTIFICATIONS_REQUEST = createRequestActionType(
  PUT_NOTIFICATIONS,
);
export const PUT_NOTIFICATIONS_SUCCESS = createSuccessActionType(
  PUT_NOTIFICATIONS,
);
export const PUT_NOTIFICATIONS_FAILURE = createFailureActionType(
  PUT_NOTIFICATIONS,
);
export const PUT_NOTIFICATIONS_CLEAR = createClearActionType(PUT_NOTIFICATIONS);

export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';

// product

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCT_REQUEST = createRequestActionType(ADD_PRODUCT);
export const ADD_PRODUCT_SUCCESS = createSuccessActionType(ADD_PRODUCT);
export const ADD_PRODUCT_FAILURE = createFailureActionType(ADD_PRODUCT);
export const ADD_PRODUCT_CLEAR = createClearActionType(ADD_PRODUCT);

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const DELETE_PRODUCT_REQUEST = createRequestActionType(DELETE_PRODUCT);
export const DELETE_PRODUCT_SUCCESS = createSuccessActionType(DELETE_PRODUCT);
export const DELETE_PRODUCT_FAILURE = createFailureActionType(DELETE_PRODUCT);
export const DELETE_PRODUCT_CLEAR = createClearActionType(DELETE_PRODUCT);

// follow

export const GET_FOLLOWS = 'GET_FOLLOWS';
export const GET_FOLLOWS_REQUEST = createRequestActionType(GET_FOLLOWS);
export const GET_FOLLOWS_SUCCESS = createSuccessActionType(GET_FOLLOWS);
export const GET_FOLLOWS_FAILURE = createFailureActionType(GET_FOLLOWS);
export const GET_FOLLOWS_CLEAR = createClearActionType(GET_FOLLOWS);

export const CREATE_FOLLOW = 'CREATE_FOLLOW';
export const CREATE_FOLLOW_REQUEST = createRequestActionType(CREATE_FOLLOW);
export const CREATE_FOLLOW_SUCCESS = createSuccessActionType(CREATE_FOLLOW);
export const CREATE_FOLLOW_FAILURE = createFailureActionType(CREATE_FOLLOW);
export const CREATE_FOLLOW_CLEAR = createClearActionType(CREATE_FOLLOW);

export const DELETE_FOLLOW = 'DELETE_FOLLOW';
export const DELETE_FOLLOW_REQUEST = createRequestActionType(DELETE_FOLLOW);
export const DELETE_FOLLOW_SUCCESS = createSuccessActionType(DELETE_FOLLOW);
export const DELETE_FOLLOW_FAILURE = createFailureActionType(DELETE_FOLLOW);
export const DELETE_FOLLOW_CLEAR = createClearActionType(DELETE_FOLLOW);

// public-profile

export const GET_PUBLICPROFILE_LISTS = 'GET_PUBLICPROFILE_LISTS';
export const GET_PUBLICPROFILE_LISTS_REQUEST = createRequestActionType(
  GET_PUBLICPROFILE_LISTS,
);
export const GET_PUBLICPROFILE_LISTS_SUCCESS = createSuccessActionType(
  GET_PUBLICPROFILE_LISTS,
);
export const GET_PUBLICPROFILE_LISTS_FAILURE = createFailureActionType(
  GET_PUBLICPROFILE_LISTS,
);
export const GET_PUBLICPROFILE_LISTS_CLEAR = createClearActionType(
  GET_PUBLICPROFILE_LISTS,
);

export const GET_PUBLICPROFILE_USER = 'GET_PUBLICPROFILE_USER';
export const GET_PUBLICPROFILE_USER_REQUEST = createRequestActionType(
  GET_PUBLICPROFILE_USER,
);
export const GET_PUBLICPROFILE_USER_SUCCESS = createSuccessActionType(
  GET_PUBLICPROFILE_USER,
);
export const GET_PUBLICPROFILE_USER_FAILURE = createFailureActionType(
  GET_PUBLICPROFILE_USER,
);
export const GET_PUBLICPROFILE_USER_CLEAR = createClearActionType(
  GET_PUBLICPROFILE_USER,
);

export const GET_PUBLICPROFILE_FOLLOWS = 'GET_PUBLICPROFILE_FOLLOWS';
export const GET_PUBLICPROFILE_FOLLOWS_REQUEST = createRequestActionType(
  GET_PUBLICPROFILE_FOLLOWS,
);
export const GET_PUBLICPROFILE_FOLLOWS_SUCCESS = createSuccessActionType(
  GET_PUBLICPROFILE_FOLLOWS,
);
export const GET_PUBLICPROFILE_FOLLOWS_FAILURE = createFailureActionType(
  GET_PUBLICPROFILE_FOLLOWS,
);
export const GET_PUBLICPROFILE_FOLLOWS_CLEAR = createClearActionType(
  GET_PUBLICPROFILE_FOLLOWS,
);

// people
export const GET_PEOPLE = 'GET_PEOPLE';
export const GET_PEOPLE_REQUEST = createRequestActionType(GET_PEOPLE);
export const GET_PEOPLE_SUCCESS = createSuccessActionType(GET_PEOPLE);
export const GET_PEOPLE_FAILURE = createFailureActionType(GET_PEOPLE);
export const GET_PEOPLE_CLEAR = createClearActionType(GET_PEOPLE);

// product details dialog

export const OPEN_PRODUCT_DETAILS_DIALOG = 'OPEN_PRODUCT_DETAILS_DIALOG';
export const CLOSE_PRODUCT_DETAILS_DIALOG = 'CLOSE_PRODUCT_DETAILS_DIALOG';
export const SET_PRODUCT_DETAILS = 'SET_PRODUCT_DETAILS';
export const CLEAR_PRODUCT_DETAILS = 'CLEAR_PRODUCT_DETAILS';
