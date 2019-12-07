/**
 * A higher order function that returns a single loading status for a single or
 * multiple API requests (actions). The function returns true if some of the
 * actions are still pending, and false otherwise.
 * @param {string[]} actions - list of API requests to check
 * @param {Object} state - the redux state
 * @returns {boolean} - true if some API request not complete, false otherwise
 */
export const createLoadingSelector = actions => state => {
  return actions.some(action => state.loading[action]);
};

export default function loadingReducer(state = {}, action) {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  // not a *_REQUEST / *_SUCCESS / *_FAILURE actions, so we ignore them
  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    /* Store whether a request is happening at the moment or not
     * e.g. will be true when receiving GET_TODOS_REQUEST
     *      and false when receiving GET_TODOS_SUCCESS / GET_TODOS_FAILURE
     */
    [requestName]: requestState === 'REQUEST',
  };
}
