import {
  ADMIN_REQUEST,
  ADMIN_SUCCESS,
  ADMIN_FAILURE,
  GET_CURRENT_CHAT_SUCCESS,
  GET_CHATTING_USERS_SUCCESS,
  SEND_CURRENT_MESSAGE_SUCCESS
} from "../../actionUserTypes";

const initialState = {
  loading: false,
  error: null,
  data: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case ADMIN_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    }
    case GET_CURRENT_CHAT_SUCCESS: {
      return { ...state, currentMessages: action.payload };
    }
    case SEND_CURRENT_MESSAGE_SUCCESS: {
      return { ...state, message: action.payload };
    }
    case GET_CHATTING_USERS_SUCCESS: {
      return { ...state, chattingUsers: action.payload };
    }
    case ADMIN_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
};
