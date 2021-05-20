import {
  ADMIN_DASHBOARD_REQUEST,
  ADMIN_DASHBOARD_SUCCESS,
  ADMIN_DASHBOARD_FAILURE,
  GET_ADMIN_HOSTS_SUCCESS,
  GET_ADMIN_VENUES_SUCCESS,
  GET_ADMIN_BOOKING_SUCCESS,
  GET_ADMIN_FILTER_VENUE_SUCCESS,
  GET_ADMIN_FILTER_USER_SUCCESS,
  UPDATE_USER_BY_ADMIN,
  DELETE_USER_BY_ADMIN,
  GET_ADMIN_REVIEWS_SUCCESS,
  GET_ADMIN_COUNTRY_FILTER_SUCCESS,
  GET_ADMIN_DASHBOARD_VENUES_SUCCESS,
  GET_TRANSACTIONS_SUCCESS,
  ADMIN_DASHBOARD_TOTAL_SUCCESS
} from "../../adminActionTypes";
import {
  GET_ADMIN_FEEDBACK_SUCCESS,
  GET_ADMIN_GUESTS_SUCCESS,
  GET_ADMIN_USER_SUCCESS,
  SET_STORE_MODAL_TYPE
} from "../../adminActionTypes";

const initialState = {
  dashboardLoading: false,
  dashboardError: null,
  dashboardData: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_BY_ADMIN:
      return { ...state, dashboardHosts: action.payload };
    case DELETE_USER_BY_ADMIN:
      return { ...state, dashboardHosts: action.payload };
    case GET_ADMIN_HOSTS_SUCCESS:
      return { ...state, dashboardHosts: action.payload };
    case GET_ADMIN_GUESTS_SUCCESS:
      return { ...state, dashboardGuests: action.payload };
    case GET_ADMIN_DASHBOARD_VENUES_SUCCESS:
      return { ...state, dashboardVenues: action.payload };
    case GET_ADMIN_VENUES_SUCCESS:
      return { ...state, adminVenueList: action.payload };
    case GET_ADMIN_BOOKING_SUCCESS:
      return { ...state, adminBookingList: action.payload };
    case GET_ADMIN_REVIEWS_SUCCESS:
      return { ...state, adminReviewsList: action.payload };
    case GET_ADMIN_COUNTRY_FILTER_SUCCESS:
      return { ...state, adminCountryFilterList: action.payload };
    case GET_ADMIN_FILTER_USER_SUCCESS:
      return { ...state, adminUserFilterList: action.payload };
    case GET_ADMIN_FILTER_VENUE_SUCCESS:
      return { ...state, adminVenueFilterList: action.payload };
    case GET_ADMIN_USER_SUCCESS:
      return { ...state, userDataById: action.payload };
    case GET_ADMIN_FEEDBACK_SUCCESS:
      return { ...state, adminFeedBackList: action.payload };
    case SET_STORE_MODAL_TYPE:
      return { ...state, getStoreModalType: action.payload };
    case GET_TRANSACTIONS_SUCCESS:
      return { ...state, adminTransactionsList: action.payload };

    case ADMIN_DASHBOARD_REQUEST: {
      return {
        ...state,
        dashboardLoading: true
      };
    }
    case ADMIN_DASHBOARD_TOTAL_SUCCESS: {
      return {
        ...state,
        dashboardTotalData: action.payload
      };
    }
    case ADMIN_DASHBOARD_SUCCESS: {
      return {
        ...state,
        dashboardData: action.payload,
        dashboardLoading: false
      };
    }
    case ADMIN_DASHBOARD_FAILURE: {
      return {
        ...state,
        dashboardLoading: false,
        dashboardError: action.payload
      };
    }
    default:
      return state;
  }
};
