import {
  CHECK_EMAIL_REQUEST,
  CHECK_EMAIL_SUCCESS,
  CHECK_EMAIL_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE
} from '../../actionUserTypes';

export const checkEmailRequest = () => ({
  type: CHECK_EMAIL_REQUEST
});

export const checkEmailSuccess = (data) => ({
  type: CHECK_EMAIL_SUCCESS,
  payload: data
});

export const checkEmailFailure = (err) => ({
  type: CHECK_EMAIL_FAILURE,
  payload: err
});

export const resetPasswordRequest = () => ({
  type: RESET_PASSWORD_REQUEST
});

export const resetPasswordSuccess = (data) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: data
});

export const resetPasswordFailure = (err) => ({
  type: RESET_PASSWORD_FAILURE,
  payload: err
});
