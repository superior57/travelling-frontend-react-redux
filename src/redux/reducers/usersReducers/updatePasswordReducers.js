import {
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE
} from '../../actionUserTypes';

const initialState = {
  updatePasswordLoading: false,
  updatePasswordError: false,
  user: {
    email: ''
    // password: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PASSWORD_REQUEST: {
      return {
        ...state,
        updatePasswordLoading: true
      };
    }
    case UPDATE_PASSWORD_SUCCESS: {
      return {
        ...state,
        // user: action.payload,
        updatePasswordLoading: false
      };
    }
    case UPDATE_PASSWORD_FAILURE: {
      return {
        ...state,
        updatePasswordLoading: false,
        updatePasswordError: action.payload
      };
    }
    default:
      return state;
  }
};
