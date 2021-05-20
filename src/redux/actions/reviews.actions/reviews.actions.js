import {
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAILURE,
  GET_MORE_REVIEWS_REQUEST,
  GET_MORE_REVIEWS_SUCCESS,
  GET_MORE_REVIEWS_FAILURE,
  CLEANUP_MORE_REVIEWS,
  ADD_REVIEW_FOR_VENUE_SUCCESS,
  ADD_REVIEW_FOR_VENUE_FAILURE,
  ADD_REVIEW_FOR_BUILDING_SUCCESS,
  ADD_REVIEW_FOR_BUILDING_FAILURE,
  ADD_REVIEW_FOR_USER_SUCCESS,
  ADD_REVIEW_FOR_USER_FAILURE,
  ADD_MEDIA_FOR_BUILDING_REVIEW_REQUEST,
  ADD_MEDIA_FOR_BUILDING_REVIEW_SUCCES,
  ADD_MEDIA_FOR_BUILDING_REVIEW_FAILURE
} from "../../actionReviewsTypes";

export const reviewsRequest = () => ({
  type: GET_REVIEWS_REQUEST
});

export const reviewsSuccess = data => ({
  type: GET_REVIEWS_SUCCESS,
  payload: data
});

export const reviewsFailure = err => ({
  type: GET_REVIEWS_FAILURE,
  payload: err
});

export const moreReviewsRequest = () => ({
  type: GET_MORE_REVIEWS_REQUEST
});

export const moreReviewsSuccess = data => ({
  type: GET_MORE_REVIEWS_SUCCESS,
  payload: data
});

export const moreReviewsFailure = err => ({
  type: GET_MORE_REVIEWS_FAILURE,
  payload: err
});

export const cleanUpMoreReview = () => ({
  type: CLEANUP_MORE_REVIEWS
});

export const addReviewForBuildingSuccess = data => ({
  type: ADD_REVIEW_FOR_BUILDING_SUCCESS,
  payload: data
});

//TODO add error handler
export const addReviewForBuildingFailure = err => ({
  type: ADD_REVIEW_FOR_BUILDING_FAILURE,
  payload: err
});

export const addReviewForVenueSuccess = data => ({
  type: ADD_REVIEW_FOR_VENUE_SUCCESS,
  payload: data
});

//TODO add error handler
export const addReviewForVenueFailure = err => ({
  type: ADD_REVIEW_FOR_VENUE_FAILURE,
  payload: err
});

export const addReviewForUserSuccess = data => ({
  type: ADD_REVIEW_FOR_USER_SUCCESS,
  payload: data
});

//TODO add error handler
export const addReviewForUserFailure = err => ({
  type: ADD_REVIEW_FOR_USER_FAILURE,
  payload: err
});

export const addNewMediaForBuildingReviewRequest = () => ({
  type: ADD_MEDIA_FOR_BUILDING_REVIEW_REQUEST
});

export const addNewMediaForBuildingReviewSuccess = data => ({
  type: ADD_MEDIA_FOR_BUILDING_REVIEW_SUCCES,
  payload: data
});

export const addNewMediaForBuildingReviewFailure = err => ({
  type: ADD_MEDIA_FOR_BUILDING_REVIEW_FAILURE,
  payload: err
});
