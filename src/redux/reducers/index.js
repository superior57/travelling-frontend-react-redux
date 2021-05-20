import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducers from "./usersReducers/authReducers";
import profileReducers from "./usersReducers/profileReducers";
import adminReducer from "./usersReducers/adminReducers";
import resetPasswordReducers from "./usersReducers/resetPasswordReducers";
import placesReducer from "./placesReducers/placesReducers";
import editPlaceReducers from "./placesReducers/editPlaceReducers";
import searchPlaceReducers from "./placesReducers/searchPlaceReducers";
import reviewsReducers from "./reviews/reviewsReducers";
import bookingReducer from "./booking/bookingReducers";
import adminLoginReducer from "./usersReducers/adminLoginReducer";
import updatePasswordReducers from "./usersReducers/updatePasswordReducers";
import { reducer as toastrReducer } from "react-redux-toastr";
import adminDashboardReducer from "./adminReducers/adminDashboardReducer";
import exchangeRateReducer from "./placesReducers/exchangeRateReducer";

export default combineReducers({
  auth: authReducers,
  form: formReducer,
  profile: profileReducers,
  admin: adminReducer,
  place: placesReducer,
  editPlace: editPlaceReducers,
  searchPlace: searchPlaceReducers,
  resetPassword: resetPasswordReducers,
  reviews: reviewsReducers,
  booking: bookingReducer,
  adminLogin: adminLoginReducer,
  updatePassword: updatePasswordReducers,
  toastr: toastrReducer,
  dashboard: adminDashboardReducer,
  allCurrencies: exchangeRateReducer
});
