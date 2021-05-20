import * as actions from "../../actionPlacesTypes";

export const createPlaceRequest = () => ({
  type: actions.CREATE_PLACE_REQUEST
});

export const createPlaceSuccess = data => ({
  type: actions.CREATE_PLACE_SUCCESS,
  payload: data
});

export const getLatestExchangeRateFailure = err => ({
  type: actions.CREATE_LATEST_EXC_RATE_FAILURE,
  payload: err
});

export const getLatestExchangeRateSuccess = data => ({
  type: actions.CREATE_LATEST_EXC_RATE_SUCCESS,
  payload: data
});

export const createPlaceFailure = err => ({
  type: actions.CREATE_PLACE_FAILURE,
  payload: err
});

export const uploadFilesRequest = () => ({
  type: actions.UPLOAD_FILES_REQUEST
});

export const uploadFilesSuccess = data => ({
  type: actions.UPLOAD_FILES_SUCCESS,
  payload: data
});

export const uploadFilesFailure = err => ({
  type: actions.UPLOAD_FILES_FAILURE,
  payload: err
});

export const getPlaceRequest = () => ({
  type: actions.GET_PLACE_REQUEST
});

export const getPlaceSuccess = data => ({
  type: actions.GET_PLACE_SUCCESS,
  payload: data
});

export const getPlaceFailure = err => ({
  type: actions.GET_PLACE_FAILURE,
  payload: err
});

export const getFavoriteBuildingRequest = () => ({
  type: actions.GET_FAVORITE_BUILDING_REQUEST
});

export const getFavoriteBuildingSuccess = data => ({
  type: actions.GET_FAVORITE_BUILDING_SUCCESS,
  payload: data
});

export const getFavoriteBuildingFailure = err => ({
  type: actions.GET_FAVORITE_BUILDING_FAILURE,
  payload: err
});

export const addFavoriteBuildingRequest = () => ({
  type: actions.ADD_FAVORITE_BUILDING_REQUEST
});

export const addFavoriteBuildingSuccess = data => ({
  type: actions.ADD_FAVORITE_BUILDING_SUCCESS,
  payload: data
});

export const addFavoriteBuildingFailure = err => ({
  type: actions.ADD_FAVORITE_BUILDING_FAILURE,
  payload: err
});

export const removeFavoriteBuildingRequest = () => ({
  type: actions.REMOVE_FAVORITE_BUILDING_REQUEST
});

export const removeFavoriteBuildingSuccess = data => ({
  type: actions.REMOVE_FAVORITE_BUILDING_SUCCESS,
  payload: data
});

export const removeFavoriteBuildingFailure = err => ({
  type: actions.REMOVE_FAVORITE_BUILDING_FAILURE,
  payload: err
});

export const getPlaceDetailsRequest = () => ({
  type: actions.GET_PLACE_DETAILS_REQUEST
});

export const getPlaceDetailsSuccess = data => ({
  type: actions.GET_PLACE_DETAILS_SUCCESS,
  payload: data
});

export const getPlaceDetailsFailure = err => ({
  type: actions.GET_PLACE_DETAILS_FAILURE,
  payload: err
});

export const eventsRequest = () => ({
  type: actions.EVENTS_REQUEST
});

export const eventsSuccess = data => ({
  type: actions.EVENTS_SUCCESS,
  payload: data
});

export const eventsFailure = err => ({
  type: actions.EVENTS_FAILURE,
  payload: err
});

export const checkEvents = data => ({
  type: actions.CHECK_EVENTS,
  payload: data
});

export const checkRadioCategories = data => ({
  type: actions.RADIO_CATEGORIES,
  payload: data
});

export const amenitiesRequest = () => ({
  type: actions.AMENITIES_REQUEST
});

export const amenitiesSuccess = data => ({
  type: actions.AMENITIES_SUCCESS,
  payload: data
});

export const amenitiesFailure = err => ({
  type: actions.AMENITIES_FAILURE,
  payload: err
});

export const locationRequest = () => ({
  type: actions.LOCATION_REQUEST
});

export const locationSuccess = data => ({
  type: actions.LOCATION_SUCCESS,
  payload: data
});

export const locationFailure = err => ({
  type: actions.LOCATION_FAILURE,
  payload: err
});

export const featuresRequest = () => ({
  type: actions.FEATURES_REQUEST
});

export const featuresSuccess = data => ({
  type: actions.FEATURES_SUCCESS,
  payload: data
});

export const featuresFailure = err => ({
  type: actions.FEATURES_FAILURE,
  payload: err
});

export const categoriesRequest = () => ({
  type: actions.CATEGORIES_REQUEST
});

export const categoriesSuccess = data => ({
  type: actions.CATEGORIES_SUCCESS,
  payload: data
});

export const categoriesFailure = err => ({
  type: actions.CATEGORIES_FAILURE,
  payload: err
});

export const venueCapacitiesRequest = () => ({
  type: actions.CAPACITIES_REQUEST
});

export const venueCapacitiesSuccess = data => ({
  type: actions.CAPACITIES_SUCCESS,
  payload: data
});

export const venueCapacitiesFailure = err => ({
  type: actions.CAPACITIES_FAILURE,
  payload: err
});

export const venueAreasRequest = () => ({
  type: actions.AREAS_REQUEST
});

export const venueAreasSuccess = data => ({
  type: actions.AREAS_SUCCESS,
  payload: data
});

export const venueAreasFailure = err => ({
  type: actions.AREAS_FAILURE,
  payload: err
});

export const checkAmenities = data => ({
  type: actions.CHECK_AMENITIES,
  payload: data
});

export const getSimilarPlacesRequest = () => ({
  type: actions.GET_SIMILAR_PLACE_REQUEST
});

export const getSimilarPlacesSuccess = data => ({
  type: actions.GET_SIMILAR_PLACE_SUCCESS,
  payload: data
});

export const getSimilarPlacesFailure = err => ({
  type: actions.GET_SIMILAR_PLACE_FAILURE,
  payload: err
});

export const getRatedPlacesSuccess = data => ({
  type: actions.GET_RATED_PLACES_SUCCESS,
  payload: data
});

export const getRatedPlacesFailure = err => ({
  type: actions.GET_RATED_PLACES_FAILURE,
  payload: err
});

export const getLastPlacesSuccess = data => ({
  type: actions.GET_LAST_PLACES_SUCCESS,
  payload: data
});

export const getLastPlacesFailure = err => ({
  type: actions.GET_LAST_PLACES_FAILURE,
  payload: err
});

export const validationError = data => {
  return {
    type: actions.VALIDATION_ERROR,
    payload: data
  };
};

export const changeStep = data => {
  return {
    type: actions.SET_CURRENT_STEP,
    payload: data
  };
};

export const getPopularEventTypeSuccess = data => {
  return {
    type: actions.GET_POPULAR_EVENT_TYPE_SUCCESS,
    payload: data
  };
};

export const sendUserLocationSuccess = data => {
  return {
    type: actions.SEND_USER_LOCATION_SUCCESS,
    payload: data
  };
};

export const getVenueListingsSuccess = data => {
  return {
    type: actions.GET_VENUE_listings_SUCCESS,
    payload: data
  };
};

export const getCronofyEventsSuccess = data => {
  return {
    type: actions.GET_CRONOFY_EVENTS_SUCCESS,
    payload: data
  };
};

export const sendCronofySuccess = data => {
  return {
    type: actions.SEND_CRONOFY_SUCCESS,
    payload: data
  };
};
