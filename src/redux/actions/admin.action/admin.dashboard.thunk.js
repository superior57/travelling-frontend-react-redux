import * as actions from "./admin.dashboard.action";
import axiosInstance from "../../../api";

export const getDashboardTotal = data => async dispatch => {
  try {
    const result = await axiosInstance.get("/api/admin/dashboard/total");
    dispatch(actions.adminDashboardTotalSuccess(result.data));
  } catch (error) {}
};

export const getAdminDashboard = data => async dispatch => {
  dispatch(actions.adminDashboardRequest());
  try {
    const result = await axiosInstance.post("/api/admin/dashboard", data);
    dispatch(actions.adminDashboardSuccess(result.data));
  } catch (error) {
    dispatch(actions.adminDashboardFailure({ message: error.message }));
  }
};

export const getAdminHosts = data => async dispatch => {
  try {
    const result = await axiosInstance.post(`/api/admin/user/role`, data);
    dispatch(actions.getAdminHostsSuccess(result.data));
  } catch (error) {
    dispatch(actions.adminDashboardFailure({ message: error.message }));
  }
};

export const getAdminGuests = data => async dispatch => {
  try {
    const result = await axiosInstance.post(`/api/admin/user/role`, data);
    dispatch(actions.getAdminGuestsSuccess(result.data));
  } catch (error) {
    dispatch(actions.adminDashboardFailure({ message: error.message }));
  }
};

export const getAdminVenues = data => async dispatch => {
  try {
    const result = await axiosInstance.post(`/api/admin/venues`, data);
    dispatch(actions.getAdminVenuesSuccess(result.data));
  } catch (error) {
    // dispatch(actions.adminDashboardFailure({ message: error.message }));
  }
};
export const removeVenue = (id, data) => async dispatch => {
  try {
    const result = await axiosInstance.post(
      `/api/buildings/${id}/remove`,
      data
    );
    dispatch(actions.getAdminVenuesSuccess(result.data.venues));
  } catch (error) {}
};
export const getAdminDashboardVenues = data => async dispatch => {
  try {
    const result = await axiosInstance.post(
      `/api/admin/dashboard/venues`,
      data
    );
    dispatch(actions.getAdminDashboardVenuesSuccess(result.data));
  } catch (error) {
    dispatch(actions.adminDashboardFailure({ message: error.message }));
  }
};
export const getAdminBooking = data => async dispatch => {
  try {
    const result = await axiosInstance.post(`/api/admin/reservations`, data);
    dispatch(actions.getAdminBookingSuccess(result.data));
  } catch (error) {
    // dispatch(actions.adminBookingFailure({ message: error.message }));
  }
};

export const getAdminFilterByUsers = data => async dispatch => {
  try {
    const result = await axiosInstance.get(`/api/admin/reservation/users`);
    dispatch(actions.getAdminFilterByUserSuccess(result.data));
  } catch (error) {
    // dispatch(actions.adminBookingFailure({ message: error.message }));
  }
};

export const getAdminFeedbackFilterByUsers = data => async dispatch => {
  try {
    const result = await axiosInstance.get(`/api/admin/feedback/users`);
    dispatch(actions.getAdminFilterByUserSuccess(result.data));
  } catch (error) {
    // dispatch(actions.adminBookingFailure({ message: error.message }));
  }
};

export const getAdminReviewsFilterByUsers = () => async dispatch => {
  try {
    const result = await axiosInstance.get(`/api/admin/reviews/users`);
    dispatch(actions.getAdminFilterByUserSuccess(result.data));
  } catch (error) {
    // dispatch(actions.adminBookingFailure({ message: error.message }));
  }
};

export const getAdminVenuesFilterByUsers = () => async dispatch => {
  try {
    const result = await axiosInstance.get(`/api/admin/venues/users`);
    dispatch(actions.getAdminFilterByUserSuccess(result.data));
  } catch (error) {
    // dispatch(actions.adminBookingFailure({ message: error.message }));
  }
};

export const getAdminFilterByVenue = data => async dispatch => {
  try {
    const result = await axiosInstance.get(`/api/buildings`);
    dispatch(actions.getAdminFilterByVenueSuccess(result.data));
  } catch (error) {
    // dispatch(actions.adminBookingFailure({ message: error.message }));
  }
};

export const getAdminReviewsFilterByVenue = data => async dispatch => {
  try {
    const result = await axiosInstance.get(`/api/admin/reviews/venues`);
    dispatch(actions.getAdminFilterByVenueSuccess(result.data));
  } catch (error) {
    // dispatch(actions.adminBookingFailure({ message: error.message }));
  }
};

export const getAdminReservationFilterByVenue = data => async dispatch => {
  try {
    const result = await axiosInstance.get(`/api/admin/reservation/venues`);
    dispatch(actions.getAdminFilterByVenueSuccess(result.data));
  } catch (error) {
    // dispatch(actions.adminBookingFailure({ message: error.message }));
  }
};

export const getAdminReviews = data => async dispatch => {
  try {
    const result = await axiosInstance.post(`/api/admin/reviews`, data);
    dispatch(actions.getAdminReviewsSuccess(result.data));
  } catch (error) {
    // dispatch(actions.adminBookingFailure({ message: error.message }));
  }
};

export const getAdminCountryFilterList = () => async dispatch => {
  try {
    const result = await axiosInstance.get(`/api/countries`);
    dispatch(actions.getAdminCountryFilterSuccess(result.data));
  } catch (error) {
    // dispatch(actions.adminBookingFailure({ message: error.message }));
  }
};

export const updateUserByAdmin = (id, user, filter) => async dispatch => {
  try {
    const result = await axiosInstance.put(`/admin/user/${id}`, {
      user,
      filter
    });
    dispatch(actions.getAdminHostsSuccess(result.data.users));
  } catch (e) {}
};

export const createNewUser = (user, filter) => async dispatch => {
  try {
    const result = await axiosInstance.post(`/admin/user`, { user, filter });
    dispatch(actions.getAdminHostsSuccess(result.data));
  } catch (error) {
    // dispatch(actions.adminBookingFailure({ message: error.message }));
  }
};
export const removeUser = (id, filter) => async dispatch => {
  try {
    const result = await axiosInstance.post(`/admin/user/${id}`, filter);
    dispatch(actions.getAdminHostsSuccess(result.data.users));
  } catch (error) {
    // dispatch(actions.adminBookingFailure({ message: error.message }));
  }
};

export const getUserById = id => async dispatch => {
  try {
    const result = await axiosInstance.get(`/admin/user/${id}`);
    dispatch(actions.getAdminUserSuccess(result.data.user));
  } catch (error) {}
};

export const getAdminFeedback = data => async dispatch => {
  try {
    const result = await axiosInstance.post(`/api/admin/feedbacks`, data);
    dispatch(actions.getAdminFeedbackSuccess(result.data));
  } catch (error) {}
};

export const getAdminTransactions = data => async dispatch => {
  try {
    const result = await axiosInstance.post(`/api/admin/transactions`, data);
    dispatch(actions.getTransactionsSuccess(result.data));
  } catch (error) {}
};
