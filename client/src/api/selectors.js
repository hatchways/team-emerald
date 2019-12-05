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
