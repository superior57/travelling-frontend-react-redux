import * as actions from "./searchPlace.actions";
// import history from '../../../history';
import axiosInstance from "../../../api";
import moment from "moment";

export const getCities = () => async dispatch => {
  dispatch(actions.getCitiesRequest());
  try {
    const result = await axiosInstance.get("/api/cities");
    dispatch(actions.getCitySuccess(result.data));
  } catch (error) {
    dispatch(actions.getCitiesFailure({ message: error.message }));
  }
};

export const getEvents = () => async dispatch => {
  // dispatch(actions.getEventsRequest());
  try {
    const result = await axiosInstance.get("/api/events");
    dispatch(actions.getEventsSuccess(result.data));
  } catch (error) {
    dispatch(actions.getEventsFailure({ message: error.message }));
  }
};

export const searchCity = city => async dispatch => {
  dispatch(actions.searchCityRequest());
  try {
    const result = await axiosInstance.post("/api/buildings/mainfilter", city);
    dispatch(actions.searchCitySuccess(result.data));
  } catch (error) {
    dispatch(actions.searchCityFailure({ message: error.message }));
  }
};

export const searchFilter = data => async dispatch => {
  dispatch(actions.searchFilterRequest());
  try {
    const result = await axiosInstance.post("/api/buildings/mainfilter", data);
    dispatch(actions.searchFilterSuccess(result.data));
  } catch (error) {
    dispatch(actions.searchFilterFailure({ message: error.message }));
  }
};

export const getSearchPlace = data => async dispatch => {
  const {
    endDate,
    startDate,
    guests,
    skip,
    limit,
    event,
    price,
    people,
    locationSelected,
    filter,
    offset,
    space,
    filterName,
    filterOrder,
    state
  } = data;

  let e = event === "Please check event" ? "" : event;
  dispatch(actions.searchPlaceRequest());
  try {
    const result = await axiosInstance.get("/api/buildings/search", {
      params: {
        limit,
        offset,
        event: e ? [e] : "",
        guests: people || guests,
        startDate,
        endDate,
        city: locationSelected,
        filterName: filter.Name ? filter.Name : filterName || "id",
        filterOrder: filter.Value ? filter.Value : filterOrder || "ASC",
        spaceTypeId: space,
        state
      }
    });
    dispatch(actions.searchPlaceSuccess(result.data));
  } catch (error) {
    dispatch(actions.searchPlaceFailure({ message: error.message }));
  }
};
