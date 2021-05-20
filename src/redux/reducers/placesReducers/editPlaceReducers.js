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

const initialState = {
  editPlaceLoading: false,
  editPlaceError: null,
  deletePlaceLoading: false,
  deletePlaceError: null,
  getPlaceDetailsLoading: false,
  getPlaceDetailsError: null,
  place: {
    name: '',
    description: '',
    price: '',
    capacity: '',
    square: '',
    time_from: '',
    time_to: '',
    renter_email: '',
    rules: '',
    event: '',
    amenities: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PLACE_REQUEST: {
      return {
        ...state,
        editPlaceLoading: true
      };
    }
    case EDIT_PLACE_SUCCESS: {
      return {
        ...state,
        place: action.payload,
        editPlaceLoading: false
      };
    }
    case EDIT_PLACE_FAILURE: {
      return {
        ...state,
        editPlaceLoading: false,
        editPlaceError: action.payload
      };
    }
    case DELETE_PLACE_REQUEST: {
      return {
        ...state,
        deletePlaceLoading: true
      };
    }
    case DELETE_PLACE_SUCCESS: {
      return {
        ...state,
        place: action.payload,
        deletePlaceLoading: false
      };
    }
    case DELETE_PLACE_FAILURE: {
      return {
        ...state,
        deletePlaceLoading: false,
        deletePlaceError: action.payload
      };
    }
    case GET_PLACE_DETAILS_REQUEST: {
      return {
        ...state,
        getPlaceDetailsLoading: true
      };
    }
    case GET_PLACE_DETAILS_SUCCESS: {
      return {
        ...state,
        place: action.payload,
        getPlaceDetailsLoading: false
      };
    }
    case GET_PLACE_DETAILS_FAILURE: {
      return {
        ...state,
        getPlaceDetailsLoading: false,
        getPlaceDetailsError: action.payload
      };
    }
    default:
      return state;
  }
};
