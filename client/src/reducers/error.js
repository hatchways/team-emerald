/**
 * A higher order function that returns the first error if there are many, and
 * an empty string otherwise.
 * @param {string[]} actions - list of API requests to check
 * @param {Object} state - the redux state
 * @returns {string} - the first error if there are any, empty string otherwise
 */
export const createErrorMessageSelector = actions => state => {
  const errors = actions.map(action => state.error[action]);
  if (errors && errors[0]) {
    return errors[0];
  }
  return '';
};

export default function errorReducer(state = {}, action) {
  const { type, payload } = action;
  const matches = /(.*)_(REQUEST|FAILURE|CLEAR)/.exec(type);

  // not a *_REQUEST / *_FAILURE actions / *_CLEAR, so we ignore them
  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    /* Store errorMessage
     * e.g. stores errorMessage when receiving GET_TODOS_FAILURE
     *      else clear errorMessage when receiving GET_TODOS_REQUEST or
     *      GET_TODOS_CLEAR
     */
    [requestName]: requestState === 'FAILURE' ? payload.error : '',
  };
}
