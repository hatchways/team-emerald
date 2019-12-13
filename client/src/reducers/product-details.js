import {
  OPEN_PRODUCT_DETAILS_DIALOG,
  CLOSE_PRODUCT_DETAILS_DIALOG,
  SET_PRODUCT_DETAILS,
  CLEAR_PRODUCT_DETAILS,
} from '../actions/types';

const initialState = {
  open: false,
  product: null,
};

export default function productDetails(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case OPEN_PRODUCT_DETAILS_DIALOG:
      return {
        ...state,
        open: true,
      };
    case CLOSE_PRODUCT_DETAILS_DIALOG:
      return {
        ...state,
        open: false,
      };
    case SET_PRODUCT_DETAILS:
      return {
        ...state,
        product: payload.product,
      };
    case CLEAR_PRODUCT_DETAILS:
      return {
        ...state,
        product: null,
      };
    default:
      return state;
  }
}
