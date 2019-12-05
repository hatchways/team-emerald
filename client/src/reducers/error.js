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
