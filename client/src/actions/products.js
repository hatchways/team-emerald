import axios from 'axios';

import {
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  ADD_PRODUCT_CLEAR,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_CLEAR,
} from './types';

export const addProductToList = (listId, link) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = { link };

  try {
    dispatch({
      type: ADD_PRODUCT_REQUEST,
    });

    await axios.post(`/api/v1/lists/${listId}/products`, body, config);

    dispatch({
      type: ADD_PRODUCT_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: ADD_PRODUCT_FAILURE,
      payload: {
        error: err.response.data.error,
      },
    });
  }
};

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

export const clearAddProductErrors = () => async dispatch => {
  dispatch({ type: ADD_PRODUCT_CLEAR });
};

export const clearDeleteProductErrors = () => async dispatch => {
  dispatch({ type: DELETE_PRODUCT_CLEAR });
};
