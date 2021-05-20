import * as actions from "./places.actions";
import history from "../../../history";
import axiosInstance from "../../../api";
import axios from "axios";
import Calefornia from "../../../assets/popular/Rectangle.png";
import Florida from "../../../assets/popular/Rectangle (1).png";
import Texas from "../../../assets/popular/Rectangle (2).png";
import Virginia from "../../../assets/popular/Rectangle (3).png";
import NewJersey from "../../../assets/popular/Rectangle (4).png";

export const createPlaces = formValues => async dispatch => {
  dispatch(actions.createPlaceRequest());
  try {
    const result = await axiosInstance.post("/api/buildings", formValues);
    dispatch(actions.createPlaceSuccess(result.data));
    // const id = result.data.building.id;
    // history.push(`/upload-files/${id}`);

    history.push("/");
  } catch (error) {
    dispatch(actions.createPlaceFailure({ message: error.message }));
  }
};

export const getCurrentExchangeRate = () => async dispatch => {
  try {
    const result = await axios.get("https://api.exchangeratesapi.io/latest");
    // console.log("Response @ thunk--->", result);
    dispatch(actions.getLatestExchangeRateSuccess(result.data.rates));
  } catch (error) {
    dispatch(actions.getLatestExchangeRateFailure({ message: error.message }));
  }
};

export const uploadFiles = (fileData, id) => async dispatch => {
  dispatch(actions.uploadFilesRequest());
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    const result = await axiosInstance.post(
      `/api/building/pictures/${id}`,
      fileData,
      config
    );
    dispatch(actions.uploadFilesSuccess(result.data));
    history.push("/host");
  } catch (error) {
    dispatch(actions.uploadFilesFailure({ message: error.message }));
  }
};

export const uploadMedia = (fileData, type) => async dispatch => {
  dispatch(actions.uploadFilesRequest());
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    const result = await axiosInstance.post(
      `/api/buildings/upload-media/${type}`,
      fileData,
      config
    );
    dispatch(actions.uploadFilesSuccess(result.data));
    //history.push('/host');
  } catch (error) {
    dispatch(actions.uploadFilesFailure({ message: error.message }));
  }
};

//incorrect *********
export const getPlacesList = id => async dispatch => {
  dispatch(actions.getPlaceRequest());
  try {
    const result = await axiosInstance.get(`/api/buildings/${id}`);
    dispatch(actions.getPlaceSuccess(result.data));
  } catch (error) {
    dispatch(actions.getPlaceFailure({ message: error.message }));
  }
};

export const getPlaceDetails = id => async dispatch => {
  dispatch(actions.getPlaceDetailsRequest());
  try {
    const result = await axiosInstance.get(`/api/building/${id}`);
    dispatch(actions.getPlaceDetailsSuccess(result.data));
  } catch (error) {
    dispatch(actions.getPlaceDetailsFailure({ message: error.message }));
  }
};

export const getSimilarPlaces = (id, skip, limit) => async dispatch => {
  dispatch(actions.getSimilarPlacesRequest());
  try {
    const result = await axiosInstance.get(
      `/api/building/${id}/similar-places`,
      {
        params: { city: true, skip, limit }
      }
    );
    dispatch(actions.getSimilarPlacesSuccess(result.data));
  } catch (error) {
    dispatch(actions.getSimilarPlacesFailure({ message: error.message }));
  }
};

export const eventsList = () => async dispatch => {
  dispatch(actions.eventsRequest());
  try {
    const result = await axiosInstance.get("/api/events");
    dispatch(actions.eventsSuccess(result.data));
  } catch (error) {
    dispatch(actions.eventsFailure({ message: error.message }));
  }
};

export const amenitiesList = () => async dispatch => {
  dispatch(actions.amenitiesRequest());
  try {
    const result = await axiosInstance.get("/api/amenities");
    dispatch(actions.amenitiesSuccess(result.data));
  } catch (error) {
    dispatch(actions.amenitiesFailure({ message: error.message }));
  }
};

export const featuresList = () => async dispatch => {
  dispatch(actions.featuresRequest());
  try {
    // debugger;
    const result = await axiosInstance.get("/api/special-features");
    dispatch(actions.featuresSuccess(result.data));
  } catch (error) {
    dispatch(actions.featuresFailure({ message: error.message }));
  }
};

export const getCronofyEvents = () => async dispatch => {
  dispatch(actions.featuresRequest());
  try {
    const result = await axiosInstance.get("/api/cronofy/events");

    // const events = {
    //   events: [
    //     {
    //       calendar_id: "cal_U9uuErStTG@EAAAB_IsAsykA2DBTWqQTf-f0kJw",
    //       event_uid: "evt_external_54008b1a4a41730f8d5c6037",
    //       summary: "Company Retreat",
    //       description: "",
    //       start: "2020-11-14",
    //       end: "2020-11-14",
    //       deleted: false,
    //       location: {
    //         description: "Beach"
    //       },
    //       participation_status: "needs_action",
    //       transparency: "opaque",
    //       event_status: "confirmed",
    //       categories: [],
    //       attendees: [
    //         {
    //           email: "example@cronofy.com",
    //           display_name: "Example Person",
    //           status: "needs_action"
    //         }
    //       ],
    //       created: "2020-11-11T08:00:01Z",
    //       updated: "2020-11-11T09:24:16Z"
    //     },
    //     {
    //       calendar_id: "cal_U9uuErStTG@EAAAB_IsAsykA2DBTWqQTf-f0kJw",
    //       event_uid: "evt_external_54008b1a4a41730f8d5c6037",
    //       summary: "Company Retreat",
    //       description: "",
    //       start: "2020-11-14T09:00:00Z",
    //       end: "2020-11-14T13:00:00Z",
    //       deleted: false,
    //       location: {
    //         description: "Beach"
    //       },
    //       participation_status: "needs_action",
    //       transparency: "opaque",
    //       event_status: "confirmed",
    //       categories: [],
    //       attendees: [
    //         {
    //           email: "example@cronofy.com",
    //           display_name: "Example Person",
    //           status: "needs_action"
    //         }
    //       ],
    //       created: "2020-11-11T08:00:01Z",
    //       updated: "2020-11-11T09:24:16Z"
    //     }
    //   ]
    // };

    dispatch(actions.getCronofyEventsSuccess(result.data));
  } catch (error) {
    // dispatch(actions.featuresFailure({ message: error.message }));
  }
};

export const sendCronofy = data => async dispatch => {
  dispatch(actions.featuresRequest());
  try {
    const result = await axiosInstance.post("/api/cronofy/create", data);

    dispatch(actions.sendCronofySuccess(result.data));
  } catch (error) {
    // dispatch(actions.featuresFailure({ message: error.message }));
  }
};

export const categoriesList = () => async dispatch => {
  dispatch(actions.categoriesRequest());
  try {
    const result = await axiosInstance.get("/api/categories");
    dispatch(actions.categoriesSuccess(result.data));
  } catch (error) {
    dispatch(actions.categoriesFailure({ message: error.message }));
  }
};

export const venueCapacities = () => async dispatch => {
  dispatch(actions.venueCapacitiesRequest());
  try {
    const result = await axiosInstance.get("/api/venue-capacities");
    dispatch(actions.venueCapacitiesSuccess(result.data.venuecapacities));
  } catch (error) {
    dispatch(actions.venueCapacitiesFailure({ message: error.message }));
  }
};

export const venueAreas = () => async dispatch => {
  dispatch(actions.venueAreasRequest());
  try {
    const result = await axiosInstance.get("/api/venue-areas");
    dispatch(actions.venueAreasSuccess(result.data.venueareas));
  } catch (error) {
    dispatch(actions.venueAreasFailure({ message: error.message }));
  }
};

export const getFavoriteBuilding = buildingId => async (dispatch, getState) => {
  const userId = getState().auth.user.id;
  if (!userId) {
    return;
  }
  dispatch(actions.getFavoriteBuildingRequest());
  try {
    const result = await axiosInstance.get(
      `/api/building/${buildingId}/${userId}/favorites`
    );
    dispatch(actions.getFavoriteBuildingSuccess([...result.data]));
  } catch (error) {
    dispatch(actions.getFavoriteBuildingFailure({ message: error.message }));
  }
};

const addFavoriteBuilding = (buildingId, userId) => async dispatch => {
  dispatch(actions.addFavoriteBuildingRequest());
  try {
    const result = await axiosInstance.post(
      `/api/building/${buildingId}/${userId}/favorites`
    );
    dispatch(actions.addFavoriteBuildingSuccess(result.data));
  } catch (error) {
    dispatch(actions.addFavoriteBuildingFailure({ message: error.message }));
  }
};

const removeFavoriteBuilding = (buildingId, userId) => async dispatch => {
  dispatch(actions.removeFavoriteBuildingRequest());
  try {
    const result = await axiosInstance.delete(
      `/api/building/${buildingId}/${userId}/favorites`
    );
    dispatch(actions.removeFavoriteBuildingSuccess(result.data));
  } catch (error) {
    dispatch(actions.removeFavoriteBuildingFailure({ message: error.message }));
  }
};

export const favoriteBuilding = () => async (dispatch, getState) => {
  const isAuth = getState().auth.isAuthenticated;
  const placeId = getState().place.placeDetails.id;
  const userId = getState().auth.user.id;
  const isFavorite = getState().place.isFavorite;

  if (!isAuth) {
    return;
  }
  if (isFavorite) {
    dispatch(removeFavoriteBuilding(placeId, userId));
  } else {
    dispatch(addFavoriteBuilding(placeId, userId));
  }
};

export const getRatedPlaces = () => async dispatch => {
  try {
    const result = await axiosInstance.get("/api/buildings", {
      params: { top: false }
    });
    dispatch(actions.getRatedPlacesSuccess(result));
  } catch (error) {
    dispatch(actions.getRatedPlacesFailure({ message: error.message }));
  }
};

export const getLocation = () => async dispatch => {
  dispatch(actions.locationRequest());
  try {
    const result = await axios.get(
      "http://api.ipstack.com/check?access_key=84a888001af707bb2dc0a58bb55db418"
    );
    dispatch(actions.locationSuccess(result.data));
  } catch (error) {
    dispatch(actions.locationFailure({ message: error.message }));
  }
};

export const getLastPlaces = () => async dispatch => {
  try {
    const result = await (await fetch("/mock.json")).json();
    dispatch(actions.getLastPlacesSuccess(result));
  } catch (error) {
    dispatch(actions.getLastPlacesFailure({ message: error.message }));
  }
};

// export const sendUserLocation = data => async dispatch => {
//   const popularPlaces = [
//     {
//       id: 1,
//       name: "Calefornia",
//       text: "Lorem ipsum dolor sit amet",
//       price: "200.00",
//       per: "person",
//       persons: "40-50",
//       rate: "4.5",
//       image: Calefornia,
//       venues: "150"
//     },
//     {
//       id: 2,
//       name: "Florida",
//       text: "Lorem ipsum dolor sit amet",
//       price: "500.00",
//       per: "hour",
//       persons: "1000-1500",
//       rate: "4.2",
//       image: Florida,
//       venues: "25"
//     },
//     {
//       id: 3,
//       name: "Texas",
//       text: "Lorem ipsum dolor sit amet",
//       price: "200.00",
//       per: "person",
//       persons: "40-50",
//       rate: "4.5",
//       image: Texas,
//       venues: "250"
//     },
//     {
//       id: 4,
//       name: "Virginia",
//       text: "Lorem ipsum dolor sit amet",
//       price: "100.00",
//       per: "person",
//       persons: "20-25",
//       rate: "4.5",
//       image: Virginia,
//       venues: "75"
//     },
//     {
//       id: 5,
//       name: "New Jersey",
//       text: "Lorem ipsum dolor sit amet",
//       price: "600",
//       per: "hour",
//       persons: "1500-2000",
//       rate: "4.5",
//       image: NewJersey,
//       venues: "500"
//     },
//     {
//       id: 6,
//       name: "Calefornia",
//       text: "Lorem ipsum dolor sit amet",
//       price: "200.00",
//       per: "person",
//       persons: "40-50",
//       rate: "4.5",
//       image: Calefornia,
//       venues: "150"
//     },
//     {
//       id: 7,
//       name: "Florida",
//       text: "Lorem ipsum dolor sit amet",
//       price: "500.00",
//       per: "hour",
//       persons: "1000-1500",
//       rate: "4.2",
//       image: Florida,
//       venues: "25"
//     },
//     {
//       id: 8,
//       name: "Texas",
//       text: "Lorem ipsum dolor sit amet",
//       price: "200.00",
//       per: "person",
//       persons: "40-50",
//       rate: "4.5",
//       image: Texas,
//       venues: "250"
//     }
//   ];
//
//   try {
//     // const result = await axiosInstance.get("/api/get-country", {
//     //   params: data
//     // });
//     dispatch(actions.sendUserLocationSuccess(popularPlaces));
//   } catch (error) {}
// };

export const getPopularEventType = () => async dispatch => {
  try {
    const result = await axiosInstance.get("/api/dashboard/events");

    dispatch(actions.getPopularEventTypeSuccess(result.data));
  } catch (error) {}
};

export const getPopularEventTypeAll = () => async dispatch => {
  try {
    const result = await axiosInstance.get("/api/dashboard/events/all");

    dispatch(actions.getPopularEventTypeSuccess(result.data));
  } catch (error) {}
};

export const getVenueListings = data => async dispatch => {
  try {
    const result = await axiosInstance.post("/api/user/venues", { ...data });

    dispatch(actions.getVenueListingsSuccess(result.data));
  } catch (error) {}
};
