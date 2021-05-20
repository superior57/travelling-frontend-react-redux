import {
  CREATE_LATEST_EXC_RATE_SUCCESS,
  CREATE_LATEST_EXC_RATE_FAILURE
} from "../../actionPlacesTypes";
import produce from "immer";

const initialState = {
  allCurrencies: []
};

export default (state = initialState, action) => {
  //   console.log("Actions -->", action);
  switch (action.type) {
    case CREATE_LATEST_EXC_RATE_SUCCESS: {
      return {
        ...state,
        data: action.payload
      };
    }
    case CREATE_LATEST_EXC_RATE_FAILURE: {
      return {
        ...state,
        allCurrencies: []
      };
    }

    default:
      return state;
  }
};
