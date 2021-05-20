import {
    GET_ADMIN_ROLES,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    CHECKAUTH_REQUEST,
    CHECKAUTH_SUCCESS,
    CHECKAUTH_FAILURE,
    ACTIVATE_REQUEST,
    ACTIVATE_SUCCESS,
    ACTIVATE_FAILURE,
    LOGOUT,
    ADMIN_SIGNUP_SUCCESS,
    ADMIN_SIGNUP_FAILURE,
    LOADING,
    APPROVAL_SUCCESS,
    APPROVAL_FAILURE
} from '../../actionUserTypes';

const initialState = {
    loading: false,
    approved: null,
    approvalError: null,
    adminSignupError: null,
    adminUser: null,
    signupLoading: false,
    signupError: false,
    loginLoading: false,
    loginError: false,
    isAuthenticated: true,
    editLoading: false,
    editError: null,
    checkAuthLoading: false,
    checkAuthError: false,
    activeLoading: false,
    activeError: false,
    user: {
        id: '',
        email: '',
        first_name: '',
        last_name: '',
        role: {
            role_type: ''
        },
        password: '',
        adminRoles: null
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING: {
            return {
                ...state,
                loading: true
            };
        }
        case ADMIN_SIGNUP_SUCCESS: {
            return {
                ...state,
                loading: false,
                adminUser: action.payload
            };
        }
        case ADMIN_SIGNUP_FAILURE: {
            return {
                ...state,
                loading: false,
                adminSignupError: action.payload
            };
        }
        case GET_ADMIN_ROLES: {
            return {
                ...state,
                adminRoles: action.payload
            };
        }
        case APPROVAL_SUCCESS: {
            return {
                ...state,
                approved: action.payload,
                loading: false
            };
        }
        case APPROVAL_FAILURE: {
            return {
                ...state,
                approvalError: action.payload,
                loading: false
            };
        }
        case SIGNUP_REQUEST: {
            return {
                ...state,
                signupLoading: true
            };
        }
        case SIGNUP_SUCCESS: {
            return {
                ...state,
                signupLoading: false,
                user: action.payload,
                signupError: true
            };
        }
        case SIGNUP_FAILURE: {
            return {
                ...state,
                signupLoading: false,
                signupError: action.payload
            };
        }

        case ACTIVATE_REQUEST: {
            return {
                ...state,
                activeLoading: true,
                activeError: false
            };
        }
        case ACTIVATE_SUCCESS: {
            return {
                ...state,
                activeLoading: false,
                activeError: false,
                user: action.payload
            };
        }
        case ACTIVATE_FAILURE: {
            return {
                ...state,
                activeLoading: false,
                activeError: true
            };
        }

        case LOGIN_REQUEST: {
            return {
                ...state,
                loginLoading: true
            };
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                loginLoading: false,
                isAuthenticated: true,
                loginError: false,
                user: action.payload.user
            };
        }
        case LOGIN_FAILURE: {
            return {
                ...state,
                loginLoading: false,
                loginError: true,
                isAuthenticated: false
            };
        }

        case CHECKAUTH_REQUEST: {
            return {
                ...state,
                checkAuthLoading: true,
                isAuthenticated: true,
                checkAuthError: false
            };
        }
        case CHECKAUTH_SUCCESS: {
            return {
                ...state,
                checkAuthLoading: false,
                isAuthenticated: true,
                checkAuthError: false,
                user: action.payload
            };
        }
        case CHECKAUTH_FAILURE: {
            return {
                ...state,
                checkAuthLoading: false,
                checkAuthError: true,
                isAuthenticated: false
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isAuthenticated: false
            };
        }

        default:
            return state;
    }
};
