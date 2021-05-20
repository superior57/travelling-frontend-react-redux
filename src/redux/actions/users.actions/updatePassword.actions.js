import {
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE
} from '../../actionUserTypes';
export const updatePasswordRequest = () => ({
  type: UPDATE_PASSWORD_REQUEST
});

export const updatePasswordSuccess = (data) => ({
  type: UPDATE_PASSWORD_SUCCESS,
  payload: data
});

export const updatePasswordFailure = (err) => ({
  type: UPDATE_PASSWORD_FAILURE,
  payload: err
});
