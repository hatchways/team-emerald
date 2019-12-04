export const createLoadingSelector = actions => state => {
  // returns true only when all actions is not loading
  return actions.some(action => state.loading[action]);
};

export const createErrorMessageSelector = actions => state => {
  const errors = actions.map(action => state.error[action]);
  if (errors && errors[0]) {
    return errors[0];
  }
  return '';
};
