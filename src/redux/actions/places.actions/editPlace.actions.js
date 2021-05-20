import {
  EDIT_PLACE_REQUEST,
  EDIT_PLACE_SUCCESS,
  EDIT_PLACE_FAILURE,
  DELETE_PLACE_REQUEST,
  DELETE_PLACE_SUCCESS,
  DELETE_PLACE_FAILURE,
  GET_PLACE_DETAILS_REQUEST,
  GET_PLACE_DETAILS_SUCCESS,
  GET_PLACE_DETAILS_FAILURE
} from '../../actionPlacesTypes';

export const editPlaceRequest = () => ({
  type: EDIT_PLACE_REQUEST
});

export const editPlaceSuccess = (data) => ({
  type: EDIT_PLACE_SUCCESS,
  payload: data
});

export const editPlaceFailure = (err) => ({
  type: EDIT_PLACE_FAILURE,
  payload: err
});

export const deletePlaceRequest = () => ({
  type: DELETE_PLACE_REQUEST
});

export const deletePlaceSuccess = (place) => ({
  type: DELETE_PLACE_SUCCESS,
  payload: place
});

export const deletePlaceFailure = (err) => ({
  type: DELETE_PLACE_FAILURE,
  payload: err
});

export const getPlaceDetailsRequest = () => ({
  type: GET_PLACE_DETAILS_REQUEST
});

export const getPlaceDetailsSuccess = (place) => ({
  type: GET_PLACE_DETAILS_SUCCESS,
  payload: place
});

export const getPlaceDetailsFailure = (err) => ({
  type: GET_PLACE_DETAILS_FAILURE,
  payload: err
});
