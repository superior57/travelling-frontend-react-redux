import {
  CHECK_EMAIL_REQUEST,
  CHECK_EMAIL_SUCCESS,
  CHECK_EMAIL_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE
} from '../../actionUserTypes';

const initialState = {
  checkEmailLoading: false,
  checkEmailError: false,
  resetPasswordLoading: false,
  resetPasswordError: false,
  user: {
    email: ''
    // password: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECK_EMAIL_REQUEST: {
      return {
        ...state,
        checkEmailLoading: true
      };
    }
    case CHECK_EMAIL_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        checkEmailLoading: false
      };
    }
    case CHECK_EMAIL_FAILURE: {
      return {
        ...state,
        checkEmailLoading: false,
        checkEmailError: action.payload
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordLoading: true
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        // user: action.payload,
        resetPasswordLoading: false
      };
    }
    case RESET_PASSWORD_FAILURE: {
      return {
        ...state,
        resetPasswordLoading: false,
        resetPasswordError: action.payload
      };
    }
    default:
      return state;
  }
};
