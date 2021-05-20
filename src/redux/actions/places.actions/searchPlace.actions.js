import {
  SEARCH_PLACE_REQUEST,
  SEARCH_PLACE_SUCCESS,
  SEARCH_PLACE_FAILURE,
  SEARCH_CITY_REQUEST,
  SEARCH_CITY_SUCCESS,
  SEARCH_CITY_FAILURE,
  SEARCH_FILTER_REQUEST,
  SEARCH_FILTER_SUCCESS,
  SEARCH_FILTER_FAILURE,
  GET_CITIES_REQUEST,
  GET_CITIES_SUCCESS,
  GET_CITY_SUCCESS,
  GET_CITIES_FAILURE,
  SEARCH_CITY_RESET,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILURE
} from "../../actionPlacesTypes";

export const getCitySuccess = cities => {
  return {
    type: GET_CITY_SUCCESS,
    payload: cities
  };
};
export const getEventsSuccess = events => ({
  type: GET_EVENTS_SUCCESS,
  payload: events
});
export const getEventsFailure = () => ({
  type: GET_EVENTS_FAILURE
});
export const searchCityReset = () => ({
  type: SEARCH_CITY_RESET
});

export const getCitiesRequest = () => ({
  type: GET_CITIES_REQUEST
});

export const getCitiesSuccess = city => ({
  type: GET_CITIES_SUCCESS,
  payload: city
});

export const getCitiesFailure = err => ({
  type: GET_CITIES_FAILURE,
  payload: err
});

export const searchFilterRequest = () => ({
  type: SEARCH_FILTER_REQUEST
});

export const searchFilterSuccess = data => ({
  type: SEARCH_FILTER_SUCCESS,
  payload: data
});

export const searchFilterFailure = err => ({
  type: SEARCH_FILTER_FAILURE,
  payload: err
});

export const searchCityRequest = () => ({
  type: SEARCH_CITY_REQUEST
});

export const searchCitySuccess = city => ({
  type: SEARCH_CITY_SUCCESS,
  payload: city
});

export const searchCityFailure = err => ({
  type: SEARCH_CITY_FAILURE,
  payload: err
});

export const searchPlaceRequest = () => ({
  type: SEARCH_PLACE_REQUEST
});

export const searchPlaceSuccess = data => ({
  type: SEARCH_PLACE_SUCCESS,
  payload: data
});

export const searchPlaceFailure = err => ({
  type: SEARCH_PLACE_FAILURE,
  payload: err
});
