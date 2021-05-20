import * as placesTypes from "../../actionPlacesTypes";
import produce from "immer";
import { SET_CURRENT_STEP } from "../../actionPlacesTypes";

const initialState = {
  createPlaceLoading: false,
  createPlaceError: null,
  uploadFilesLoading: false,
  uploadFilesError: null,
  getPlaceLoading: false,
  getPlaceError: null,
  eventsLoading: false,
  eventsError: null,
  amenitiesLoading: false,
  amenitiesError: null,
  locationLoading: false,
  locationError: null,
  categoriesLoading: false,
  categoriesError: null,
  capacitiesLoading: false,
  capacitiesError: null,
  areasLoading: false,
  areasError: null,
  placeDetails: null,
  places: [],
  ratedPlaces: {},
  lastPlaces: {},
  similarPlaces: null,
  similarPlacesError: null,
  events: [],
  categories: [],
  capacities: [],
  areas: [],
  checkedEvents: false,
  checkedAmenities: [],
  amenities: [],
  location: {},
  features: [],
  featuresLoading: false,
  featuresError: null,
  radioCategories: false,
  files: {},
  isFavorite: false,
  favoriteError: null,
  currentStep: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case placesTypes.SEND_CRONOFY_SUCCESS: {
      return { ...state, cronofy: action.payload };
    }
    case placesTypes.GET_CRONOFY_EVENTS_SUCCESS: {
      return { ...state, cronofyEvents: action.payload };
    }
    case placesTypes.GET_VENUE_listings_SUCCESS: {
      return { ...state, VenueListings: action.payload };
    }
    case placesTypes.SEND_USER_LOCATION_SUCCESS: {
      return { ...state, popularVenues: action.payload };
    }
    case placesTypes.GET_POPULAR_EVENT_TYPE_SUCCESS: {
      return { ...state, popularEventType: action.payload };
    }

    case placesTypes.SET_CURRENT_STEP: {
      return { ...state, currentStep: action.payload };
    }
    case placesTypes.CREATE_PLACE_REQUEST: {
      return {
        ...state,
        createPlaceLoading: true
      };
    }
    case placesTypes.CREATE_PLACE_SUCCESS: {
      return {
        ...state,
        createPlaceLoading: false,
        place: action.payload
      };
    }
    case placesTypes.CREATE_PLACE_FAILURE: {
      return {
        ...state,
        createPlaceLoading: false,
        createPlaceError: action.payload
      };
    }
    case placesTypes.UPLOAD_FILES_REQUEST: {
      return {
        ...state,
        uploadFilesLoading: true
      };
    }
    case placesTypes.UPLOAD_FILES_SUCCESS: {
      return {
        ...state,
        uploadFilesLoading: false,
        files: action.payload
      };
    }
    case placesTypes.UPLOAD_FILES_FAILURE: {
      return {
        ...state,
        uploadFilesError: action.payload
      };
    }

    //-------- incorrect---------------
    case placesTypes.GET_PLACE_REQUEST: {
      return {
        ...state,
        getPlaceLoading: true
      };
    }
    case placesTypes.GET_PLACE_SUCCESS: {
      return {
        ...state,
        getPlaceLoading: false,
        places: action.payload
      };
    }
    case placesTypes.GET_PLACE_FAILURE: {
      return {
        ...state,
        getPlaceLoading: false,
        getPlaceError: action.payload
      };
    }

    // similar places --------------------
    case placesTypes.GET_SIMILAR_PLACE_REQUEST: {
      return {
        ...state
      };
    }
    case placesTypes.GET_SIMILAR_PLACE_SUCCESS: {
      const nextState = produce(state, draftState => {
        if (draftState.similarPlaces) {
          draftState.similarPlaces.count = action.payload.count;
          draftState.similarPlaces.rows = draftState.similarPlaces.rows.concat(
            action.payload.rows
          );
        } else {
          draftState.similarPlaces = action.payload;
        }
      });
      return nextState;
    }
    case placesTypes.GET_SIMILAR_PLACE_FAILURE: {
      return {
        ...state,
        similarPlacesError: action.payload
      };
    }

    // places details ---------------------------
    case placesTypes.GET_PLACE_DETAILS_REQUEST: {
      return {
        ...state,
        getPlaceLoading: true
      };
    }
    case placesTypes.GET_PLACE_DETAILS_SUCCESS: {
      const nextState = produce(state, draftState => {
        draftState.placeDetails = action.payload;
      });
      return nextState;
    }
    case placesTypes.GET_PLACE_DETAILS_FAILURE: {
      return {
        ...state,
        getPlaceLoading: false,
        getPlaceError: action.payload
      };
    }

    // events -------------------------------------
    case placesTypes.EVENTS_REQUEST: {
      return {
        ...state,
        eventsLoading: true
      };
    }
    case placesTypes.EVENTS_SUCCESS: {
      return {
        ...state,
        eventsLoading: false,
        events: action.payload.events
      };
    }
    case placesTypes.EVENTS_FAILURE: {
      return {
        ...state,
        eventsLoading: false,
        eventsError: action.payload
      };
    }

    case placesTypes.CATEGORIES_REQUEST: {
      return {
        ...state,
        categoriesLoading: true
      };
    }
    case placesTypes.CATEGORIES_SUCCESS: {
      return {
        ...state,
        categoriesLoading: false,
        categories: action.payload
      };
    }
    case placesTypes.CATEGORIES_FAILURE: {
      return {
        ...state,
        categoriesLoading: false,
        categoriesError: action.payload
      };
    }

    case placesTypes.CAPACITIES_REQUEST: {
      return {
        ...state,
        capacitiesLoading: true
      };
    }
    case placesTypes.CAPACITIES_SUCCESS: {
      return {
        ...state,
        capacitiesLoading: false,
        capacities: action.payload
      };
    }
    case placesTypes.CAPACITIES_FAILURE: {
      return {
        ...state,
        capacitiesLoading: false,
        capacitiesError: action.payload
      };
    }

    case placesTypes.AREAS_REQUEST: {
      return {
        ...state,
        areasLoading: true
      };
    }
    case placesTypes.AREAS_SUCCESS: {
      return {
        ...state,
        areasLoading: false,
        areas: action.payload
      };
    }
    case placesTypes.AREAS_FAILURE: {
      return {
        ...state,
        areasLoading: false,
        areasError: action.payload
      };
    }

    case placesTypes.CHECK_EVENTS: {
      return {
        ...state,
        checkedEvents: [...action.payload]
      };
    }

    case placesTypes.RADIO_CATEGORIES: {
      return {
        ...state,
        radioCategories: action.payload
      };
    }

    case placesTypes.AMENITIES_REQUEST: {
      return {
        ...state,
        amenitiesLoading: true
      };
    }
    case placesTypes.AMENITIES_SUCCESS: {
      return {
        ...state,
        amenitiesLoading: false,
        amenities: action.payload.amenities
      };
    }
    case placesTypes.AMENITIES_FAILURE: {
      return {
        ...state,
        amenitiesLoading: false,
        amenitiesError: action.payload
      };
    }

    case placesTypes.LOCATION_REQUEST: {
      return {
        ...state,
        locationLoading: true
      };
    }
    case placesTypes.LOCATION_SUCCESS: {
      return {
        ...state,
        locationLoading: false,
        location: action.payload
      };
    }
    case placesTypes.LOCATION_FAILURE: {
      return {
        ...state,
        locationLoading: false,
        locationError: action.payload
      };
    }

    case placesTypes.FEATURES_REQUEST: {
      return {
        ...state,
        featuresLoading: true
      };
    }
    case placesTypes.FEATURES_SUCCESS: {
      return {
        ...state,
        featuresLoading: false,
        features: action.payload.features
      };
    }
    case placesTypes.FEATURES_FAILURE: {
      return {
        ...state,
        featuresLoading: false,
        featuresError: action.payload
      };
    }

    case placesTypes.GET_FAVORITE_BUILDING_REQUEST: {
      return { ...state };
    }
    case placesTypes.GET_FAVORITE_BUILDING_SUCCESS: {
      return {
        ...state,
        isFavorite: !!action.payload.length
      };
    }
    case placesTypes.GET_FAVORITE_BUILDING_FAILURE: {
      return {
        ...state,
        favoriteError: action.payload
      };
    }

    case placesTypes.ADD_FAVORITE_BUILDING_REQUEST: {
      return { ...state };
    }
    case placesTypes.ADD_FAVORITE_BUILDING_SUCCESS: {
      return {
        ...state,
        isFavorite: true
      };
    }
    case placesTypes.ADD_FAVORITE_BUILDING_FAILURE: {
      return {
        ...state,
        isFavorite: false,
        favoriteError: action.payload
      };
    }

    case placesTypes.REMOVE_FAVORITE_BUILDING_REQUEST: {
      return { ...state };
    }
    case placesTypes.REMOVE_FAVORITE_BUILDING_SUCCESS: {
      return {
        ...state,
        isFavorite: false
      };
    }
    case placesTypes.REMOVE_FAVORITE_BUILDING_FAILURE: {
      return {
        ...state,
        favoriteError: action.payload
      };
    }

    case placesTypes.CHECK_AMENITIES: {
      return {
        ...state,
        checkedAmenities: [...action.payload]
      };
    }

    case placesTypes.GET_RATED_PLACES_SUCCESS: {
      return {
        ...state,
        ratedPlaces: { ...action.payload }
      };
    }
    case placesTypes.GET_RATED_PLACES_FAILURE: {
      //TODO added error handler
      return {
        ...state,
        ratedPlaces: {}
      };
    }

    case placesTypes.VALIDATION_ERROR: {
      return {
        ...state,
        validError: action.payload
      };
    }

    case placesTypes.GET_LAST_PLACES_SUCCESS: {
      return {
        ...state,
        lastPlaces: { ...action.payload }
      };
    }
    case placesTypes.GET_LAST_PLACES_FAILURE: {
      //TODO added error handler
      return {
        ...state,
        lastPlaces: {}
      };
    }

    default:
      return state;
  }
};
