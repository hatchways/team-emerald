import axios from 'axios';
import {
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_CLEAR,
} from './types';

export const removeProductFromList = (listId, productId) => async dispatch => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });
    const res = await axios.delete(
      `/api/v1/lists/${listId}/products/${productId}`,
    );

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: {
        list: res.data.list,
      },
    });
  } catch (err) {
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      payload: {
        error: err.response.data.error,
      },
    });
  }
};
export const clearDeleteProductErrors = () => async dispatch => {
  dispatch({ type: DELETE_PRODUCT_CLEAR });
};
