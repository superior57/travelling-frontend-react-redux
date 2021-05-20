import {
  ADMIN_REQUEST,
  ADMIN_SUCCESS,
  ADMIN_FAILURE,
  GET_CURRENT_CHAT_SUCCESS,
  GET_CHATTING_USERS_SUCCESS,
  SEND_CURRENT_MESSAGE_SUCCESS
} from "../../actionUserTypes";

export const adminRequest = () => ({
  type: ADMIN_REQUEST
});

export const adminSuccess = data => ({
  type: ADMIN_SUCCESS,
  payload: data
});

export const adminFailure = err => ({
  type: ADMIN_FAILURE,
  payload: err
});

export const getCurrentChatSuccess = data => ({
  type: GET_CURRENT_CHAT_SUCCESS,
  payload: data
});

export const getChattingUsersSuccess = data => ({
  type: GET_CHATTING_USERS_SUCCESS,
  payload: data
});

export const sendCurrentMessageSuccess = data => ({
  type: SEND_CURRENT_MESSAGE_SUCCESS,
  payload: data
});
