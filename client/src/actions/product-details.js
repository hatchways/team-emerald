import {
  OPEN_PRODUCT_DETAILS_DIALOG,
  CLOSE_PRODUCT_DETAILS_DIALOG,
  SET_PRODUCT_DETAILS,
  CLEAR_PRODUCT_DETAILS,
} from './types';

export const openProductDetailsDialog = () => dispatch => {
  dispatch({
    type: OPEN_PRODUCT_DETAILS_DIALOG,
  });
};

export const closeProductDetailsDialog = () => dispatch => {
  dispatch({
    type: CLOSE_PRODUCT_DETAILS_DIALOG,
  });
};

export const setProductDetails = product => dispatch => {
  dispatch({
    type: SET_PRODUCT_DETAILS,
    payload: {
      product,
    },
  });
};

export const clearProductDetails = () => dispatch => {
  dispatch({
    type: CLEAR_PRODUCT_DETAILS,
  });
};
