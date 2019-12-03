/* eslint-disable import/prefer-default-export */
export const createLoadingSelector = actions => state => {
  // returns true only when all actions is not loading
  return actions.some(action => state.loading[action]);
};
