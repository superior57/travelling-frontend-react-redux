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
  GET_CITIES_FAILURE,
  GET_PEOPLE_SUCCESS,
  SEARCH_CITY_RESET,
  GET_CITY_SUCCESS,
  GET_EVENTS_SUCCESS
} from "../../actionPlacesTypes";

const initialState = {
  searchPlaceLoading: false,
  searchPlaceError: null,
  searchCityLoading: false,
  searchCityError: null,
  searchFilterLoading: false,
  searchFilterError: null,
  getCityLoading: false,
  getCityError: null,
  place: {
    name: "",
    description: "",
    time_from: "",
    time_to: "",
    renter_email: "",
    rules: "",
    events: "",
    amenities: "",
    category_name: "",
    formatted_address: ""
  },
  properties: {
    capacity: "",
    square: "",
    price: ""
  },
  places: {},
  cities: {},
  events: {},
  people: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    // GET ALL THE CITIES THAT OUR BACKEND HAS
    case GET_CITIES_REQUEST: {
      return {
        ...state,
        getCityLoading: true
      };
    }

    case GET_EVENTS_SUCCESS: {
      return {
        ...state,
        events: action.payload
      };
    }
    case GET_PEOPLE_SUCCESS: {
      return {
        ...state,
        people: action.payload
      };
    }
    case GET_CITY_SUCCESS: {
      return {
        ...state,
        getCityLoading: false,
        cities: action.payload
      };
    }

    case GET_CITIES_SUCCESS: {
      return {
        ...state,
        getCityLoading: false,
        places: action.payload
      };
    }
    case GET_CITIES_FAILURE: {
      return {
        ...state,
        getCityLoading: false,
        getCityError: action.payload
      };
    }

    //FiLTER
    case SEARCH_FILTER_REQUEST: {
      return {
        ...state,
        searchFilterLoading: true
      };
    }
    case SEARCH_FILTER_SUCCESS: {
      return {
        ...state,
        searchFilterLoading: false,
        place: action.payload
      };
    }
    case SEARCH_FILTER_FAILURE: {
      return {
        ...state,
        searchFilterLoading: false,
        searchFilterError: action.payload
      };
    }

    // SEARCH FOR A CERTAIN CITY
    case SEARCH_CITY_RESET: {
      return {
        ...initialState
      };
    }
    case SEARCH_CITY_REQUEST: {
      return {
        ...state,
        searchCityLoading: true
      };
    }
    case SEARCH_CITY_SUCCESS: {
      return {
        ...state,
        searchCityLoading: false,
        properties: action.payload
      };
    }
    case SEARCH_CITY_FAILURE: {
      return {
        ...state,
        searchCityLoading: false,
        searchCityError: action.payload,
        properties: {
          capacity: { min: 0, max: 0 },
          square: { min: 0, max: 0 },
          price: { min: 0, max: 0 }
        }
      };
    }

    // MAINFILTER
    case SEARCH_PLACE_REQUEST: {
      return {
        ...state,
        searchPlaceLoading: true
      };
    }
    case SEARCH_PLACE_SUCCESS: {
      return {
        ...state,
        searchPlaceLoading: false,
        places: action.payload
      };
    }
    case SEARCH_PLACE_FAILURE: {
      return {
        ...state,
        searchPlaceLoading: false,
        searchPlaceError: action.payload
      };
    }

    default:
      return state;
  }
};
