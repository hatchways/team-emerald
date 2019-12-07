import axios from 'axios';

import {
  PUT_USER_PROFILE_IMAGE_REQUEST,
  PUT_USER_PROFILE_IMAGE_SUCCESS,
  PUT_USER_PROFILE_IMAGE_FAILURE,
} from './types';

// eslint-disable-next-line import/prefer-default-export
export const updateProfileImage = (id, file) => async dispatch => {
  try {
    dispatch({
      type: PUT_USER_PROFILE_IMAGE_REQUEST,
    });

    const formData = new FormData();
    formData.append('file', file);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const res = await axios.put(
      `/api/v1/users/${id}/profile-image`,
      formData,
      config,
    );

    dispatch({
      type: PUT_USER_PROFILE_IMAGE_SUCCESS,
      payload: {
        photoUrl: res.data.photoUrl,
      },
    });
  } catch (err) {
    dispatch({
      type: PUT_USER_PROFILE_IMAGE_FAILURE,
      payload: {
        error: err.response.data.error,
      },
    });
  }
};
