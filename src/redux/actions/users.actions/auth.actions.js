import {
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
    LOGIN_ADMIN_REQUEST,
    LOGIN_ADMIN_SUCCESS,
    LOGIN_ADMIN_FAILURE,
    LOADING,
    ADMIN_SIGNUP_SUCCESS,
    ADMIN_SIGNUP_FAILURE,
    GET_ADMIN_ROLES,
    APPROVAL_SUCCESS,
    APPROVAL_FAILURE
} from '../../actionUserTypes';

export const signupRequest = () => ({
    type: SIGNUP_REQUEST
});

export const signupSuccess = (data) => ({
    type: SIGNUP_SUCCESS,
    payload: data
});

export const signupFailure = (err) => ({
    type: SIGNUP_FAILURE,
    payload: err
});

export const loginRequest = () => ({
    type: LOGIN_REQUEST
});

export const loginSuccess = (data) => ({
    type: LOGIN_SUCCESS,
    payload: data
});

export const loginFailure = (err) => ({
    type: LOGIN_FAILURE,
    payload: err
});

export const checkauthRequest = () => ({
    type: CHECKAUTH_REQUEST
});

export const checkauthSuccess = (data) => ({
    type: CHECKAUTH_SUCCESS,
    payload: data
});

export const checkauthFailure = (err) => ({
    type: CHECKAUTH_FAILURE,
    payload: err
});

export const activeRequest = () => ({
    type: ACTIVATE_REQUEST
});

export const activeSuccess = (data) => ({
    type: ACTIVATE_SUCCESS
});

export const activeFailure = (err) => ({
    type: ACTIVATE_FAILURE,
    payload: err
});

export const logOut = () => ({
    type: LOGOUT
});

export const loginAdminRequest = () => ({
    type: LOGIN_ADMIN_REQUEST
});

export const loginAdminSuccess = (data) => ({
    type: LOGIN_ADMIN_SUCCESS,
    payload: data
});

export const loginAdminFailure = (err) => ({
    type: LOGIN_ADMIN_FAILURE,
    payload: err
});

//Loading Action
export const setLoading = () => ({
    type: LOADING
});

//Signup Admin Actions
export const adminSignupAction = (data) => ({
    type: ADMIN_SIGNUP_SUCCESS,
    payload: data
});

export const adminSignupFailure = (err) => ({
    type: ADMIN_SIGNUP_FAILURE,
    payload: err
});

//Admin Roles Action
export const adminRoles = (data) => ({
    type: GET_ADMIN_ROLES,
    payload: data
});

//Approval Status
export const approvalStatus = (data) => ({
    type: APPROVAL_SUCCESS,
    payload: data
});

//Approval Failure
export const approvalFailure = (err) => ({
    type: APPROVAL_FAILURE,
    payload: err
});