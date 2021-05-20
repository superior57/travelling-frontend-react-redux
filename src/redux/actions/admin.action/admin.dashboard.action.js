import {
  ADMIN_DASHBOARD_REQUEST,
  ADMIN_DASHBOARD_SUCCESS,
  ADMIN_DASHBOARD_FAILURE,
  GET_ADMIN_HOSTS_SUCCESS,
  GET_ADMIN_GUESTS_SUCCESS,
  GET_ADMIN_VENUES_SUCCESS,
  GET_ADMIN_BOOKING_SUCCESS,
  GET_ADMIN_FILTER_VENUE_SUCCESS,
  GET_ADMIN_FILTER_USER_SUCCESS,
  UPDATE_USER_BY_ADMIN,
  GET_ADMIN_REVIEWS_SUCCESS,
  GET_ADMIN_COUNTRY_FILTER_SUCCESS,
  GET_ADMIN_DASHBOARD_VENUES_SUCCESS,
  GET_ADMIN_USER_SUCCESS,
  SET_STORE_MODAL_TYPE,
  GET_ADMIN_FEEDBACK_SUCCESS,
  GET_TRANSACTIONS_SUCCESS,
  ADMIN_DASHBOARD_TOTAL_SUCCESS
} from "../../adminActionTypes";

export const adminDashboardRequest = () => ({
  type: ADMIN_DASHBOARD_REQUEST
});

export const updateUserByAdmin = data => ({
  type: UPDATE_USER_BY_ADMIN,
  payload: data
});

export const adminDashboardSuccess = data => ({
  type: ADMIN_DASHBOARD_SUCCESS,
  payload: data
});

export const adminDashboardTotalSuccess = data => ({
  type: ADMIN_DASHBOARD_TOTAL_SUCCESS,
  payload: data
});

export const adminDashboardFailure = err => ({
  type: ADMIN_DASHBOARD_FAILURE,
  payload: err
});

export const getAdminHostsSuccess = data => ({
  type: GET_ADMIN_HOSTS_SUCCESS,
  payload: data
});

export const getAdminGuestsSuccess = data => ({
  type: GET_ADMIN_GUESTS_SUCCESS,
  payload: data
});

export const getAdminVenuesSuccess = data => ({
  type: GET_ADMIN_VENUES_SUCCESS,
  payload: data
});
export const getAdminDashboardVenuesSuccess = data => ({
  type: GET_ADMIN_DASHBOARD_VENUES_SUCCESS,
  payload: data
});
export const getAdminBookingSuccess = data => ({
  type: GET_ADMIN_BOOKING_SUCCESS,
  payload: data
});

export const getAdminFilterByVenueSuccess = data => ({
  type: GET_ADMIN_FILTER_VENUE_SUCCESS,
  payload: data
});
export const getAdminFilterByUserSuccess = data => ({
  type: GET_ADMIN_FILTER_USER_SUCCESS,
  payload: data
});
export const getAdminReviewsSuccess = data => ({
  type: GET_ADMIN_REVIEWS_SUCCESS,
  payload: data
});

export const getAdminCountryFilterSuccess = data => ({
  type: GET_ADMIN_COUNTRY_FILTER_SUCCESS,
  payload: data
});

export const getAdminUserSuccess = data => ({
  type: GET_ADMIN_USER_SUCCESS,
  payload: data
});

export const setStoreModalType = data => ({
  type: SET_STORE_MODAL_TYPE,
  payload: data
});

export const getAdminFeedbackSuccess = data => ({
  type: GET_ADMIN_FEEDBACK_SUCCESS,
  payload: data
});

export const getTransactionsSuccess = data => ({
  type: GET_TRANSACTIONS_SUCCESS,
  payload: data
});
