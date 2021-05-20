import {
  LOGIN_ADMIN_REQUEST,
  LOGIN_ADMIN_SUCCESS,
  LOGIN_ADMIN_FAILURE
} from '../../actionUserTypes';

const initialState = {
  loginLoading: false,
  loginError: false,
  isAuthenticated: true,

  user: {
    id: '',
    email: '',
    first_name: '',
    last_name: '',
    role: {
      role_type: ''
    },
    password: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ADMIN_REQUEST: {
      return {
        ...state,
        loginLoading: true
      };
    }
    case LOGIN_ADMIN_SUCCESS: {
      return {
        ...state,
        loginLoading: false,
        isAuthenticated: true,
        loginError: false,
        user: action.payload.user
      };
    }
    case LOGIN_ADMIN_FAILURE: {
      return {
        ...state,
        loginLoading: false,
        loginError: true,
        isAuthenticated: false
      };
    }

    default:
      return state;
  }
};
