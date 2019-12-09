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

// product
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const DELETE_PRODUCT_REQUEST = createRequestActionType(DELETE_PRODUCT);
export const DELETE_PRODUCT_SUCCESS = createSuccessActionType(DELETE_PRODUCT);
export const DELETE_PRODUCT_FAILURE = createFailureActionType(DELETE_PRODUCT);
export const DELETE_PRODUCT_CLEAR = createClearActionType(DELETE_PRODUCT);
