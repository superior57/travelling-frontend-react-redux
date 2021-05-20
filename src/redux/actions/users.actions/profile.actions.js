import {
  EDIT_REQUEST,
  EDIT_SUCCESS,
  EDIT_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  CHECK_USER_EXISTENCE_REQUEST,
  CHECK_USER_EXISTENCE_SUCCESS,
  CHECK_USER_EXISTENCE_FAILURE,
  SEND_CONTACTS_SUCCESS,
  SEND_CONTACTS_FAILURE,
  SET_BTN_MY_PROFILE,
  EDIT_AVATAR_SUCCESS,
  GET_SUCCESS_REVIEWS,
  USER_BY_ID_SUCCESS,
  EDIT_UPLOAD_ID_SUCCESS,
  ERROR_SAVE_USER,
  GET_REFERRAL_USAGES_SUCCESS,
  GET_REFERRAL_USAGES_FAILURE,
  VERIFY_MODAL_PHONE,
  CHECK_PHONE_SUCCESS,
  CHECK_PHONE_FAIL,
  SET_URL,
  SEND_MESSAGE_SUCCESS,
  SET_VALID_SUCCESS,
  VERIFY_MODAL_PHONE_SUCCESS,
  VERIFY_PHONE_SUCCESS
} from "../../actionUserTypes";
import { GET_REVIEWS_SUCCESS } from "../../actionReviewsTypes";

export const getUserRequest = () => ({
  type: CHECK_USER_EXISTENCE_REQUEST
});

export const getUserSuccess = data => ({
  type: CHECK_USER_EXISTENCE_SUCCESS,
  payload: data
});

export const getReferralUsagesSuccess = data => ({
  type: GET_REFERRAL_USAGES_SUCCESS,
  payload: data
});

export const getReferralUsagesFailure = data => ({
  type: GET_REFERRAL_USAGES_FAILURE,
  payload: data
});

export const getUserFailure = err => ({
  type: CHECK_USER_EXISTENCE_FAILURE,
  payload: err
});

export const editRequest = () => ({
  type: EDIT_REQUEST
});

export const editSuccess = data => ({
  type: EDIT_SUCCESS,
  payload: data
});

export const setValid = data => ({
  type: SET_VALID_SUCCESS,
  payload: data
});

export const errorSaveUser = data => {
  return {
    type: ERROR_SAVE_USER,
    payload: data
  };
};

export const editAvatarSuccess = data => ({
  type: EDIT_AVATAR_SUCCESS,
  payload: data
});

export const editUploadIdSuccess = data => ({
  type: EDIT_UPLOAD_ID_SUCCESS,
  payload: data
});

export const editFailure = err => ({
  type: EDIT_FAILURE,
  payload: err
});

export const deleteUserRequest = () => ({
  type: DELETE_USER_REQUEST
});

export const deleteUserSuccess = user => ({
  type: DELETE_USER_SUCCESS,
  payload: user
});

export const deleteUserFailure = err => ({
  type: DELETE_USER_FAILURE,
  payload: err
});

export const sendContactsSuccess = () => ({
  type: SEND_CONTACTS_SUCCESS
});

export const sendContactsFailure = err => ({
  type: SEND_CONTACTS_FAILURE,
  payload: err
});

export const getReviewsSuccess = data => ({
  type: GET_SUCCESS_REVIEWS,
  payload: data
});

export const userByIdSuccess = data => ({
  type: USER_BY_ID_SUCCESS,
  payload: data
});

export const verifyModalPhoneRequest = data => ({
  type: VERIFY_MODAL_PHONE,
  payload: data
});
export const verifyPhoneSuccess = data => ({
  type: VERIFY_PHONE_SUCCESS,
  payload: data
});
export const checkPhoneCodeSuccess = data => ({
  type: CHECK_PHONE_SUCCESS,
  payload: data
});

export const checkPhoneCodeFail = data => ({
  type: CHECK_PHONE_FAIL,
  payload: data
});

export const setUrl = data => ({
  type: SET_URL,
  payload: data
});

export const sendMessageSuccess = data => ({
  type: SEND_MESSAGE_SUCCESS,
  payload: data
});
