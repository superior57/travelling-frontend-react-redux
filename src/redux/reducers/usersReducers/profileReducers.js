import {
  EDIT_REQUEST,
  EDIT_SUCCESS,
  EDIT_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  CHECK_USER_EXISTENCE_REQUEST,
  CHECK_USER_EXISTENCE_SUCCESS,
  CHECK_USER_EXISTENCE_FAILURE,
  SEND_CONTACTS_SUCCESS,
  SEND_CONTACTS_FAILURE,
  EDIT_AVATAR_SUCCESS,
  GET_SUCCESS_REVIEWS,
  USER_BY_ID_SUCCESS,
  EDIT_UPLOAD_ID_SUCCESS,
  ERROR_SAVE_USER,
  GET_REFERRAL_USAGES_SUCCESS,
  GET_REFERRAL_USAGES_FAILURE,
  VERIFY_MODAL_PHONE,
  CHECK_PHONE_FAIL,
  CHECK_PHONE_SUCCESS,
  SET_URL,
  SEND_MESSAGE_SUCCESS,
  SET_VALID_SUCCESS,
  VERIFY_MODAL_PHONE_SUCCESS,
  VERIFY_PHONE_SUCCESS
} from "../../actionUserTypes";

const initialState = {
  editLoading: false,
  editError: "",
  deleteLoading: false,
  deleteError: "",
  user: {
    email: "",
    first_name: "",
    last_name: "",
    role: {
      role_type: ""
    },
    password: ""
  },
  isSendContacts: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ERROR_SAVE_USER:
      return { ...state, errorProfile: action.payload };
    case USER_BY_ID_SUCCESS:
      return { ...state, userById: action.payload };
    case GET_SUCCESS_REVIEWS:
      return { ...state, reviews: action.payload };
    case EDIT_UPLOAD_ID_SUCCESS:
      return { ...state, uploadId: action.payload };
    case EDIT_AVATAR_SUCCESS:
      return { ...state, avatar: action.payload };
    case CHECK_USER_EXISTENCE_REQUEST: {
      return {
        ...state,
        editLoading: true
      };
    }
    case GET_REFERRAL_USAGES_SUCCESS: {
      return {
        ...state,
        usages: action.payload
      };
    }
    case GET_REFERRAL_USAGES_FAILURE: {
      return {
        ...state,
        usagesFailed: action.payload
      };
    }
    case CHECK_USER_EXISTENCE_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        editLoading: false
      };
    }
    case CHECK_USER_EXISTENCE_FAILURE: {
      return {
        ...state,
        editLoading: false,
        editError: action.payload
      };
    }
    case EDIT_REQUEST: {
      return {
        ...state,
        editLoading: true
      };
    }
    case SET_VALID_SUCCESS: {
      return {
        ...state,
        valid: action.payload,
        editLoading: false
      };
    }
    case EDIT_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        editLoading: false
      };
    }
    case EDIT_FAILURE: {
      return {
        ...state,
        editLoading: false,
        editError: action.payload
      };
    }
    case DELETE_USER_REQUEST: {
      return {
        ...state,
        deleteLoading: true
      };
    }
    case DELETE_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        deleteLoading: false
      };
    }
    case DELETE_USER_FAILURE: {
      return {
        ...state,
        deleteLoading: false,
        deleteError: action.payload
      };
    }
    case SEND_CONTACTS_SUCCESS: {
      return {
        ...state,
        isSendContacts: true
      };
    }
    case SEND_CONTACTS_FAILURE: {
      return {
        ...state,
        isSendContacts: false
      };
    }
    case VERIFY_MODAL_PHONE: {
      return {
        ...state,
        verifyModalForPhone: action.payload
      };
    }
    case VERIFY_PHONE_SUCCESS: {
      return {
        ...state,
        verifyForPhoneSuccess: action.payload
      };
    }
    case CHECK_PHONE_SUCCESS: {
      return {
        ...state,
        checkPhoneSuccess: action.payload
      };
    }
    case CHECK_PHONE_FAIL: {
      return {
        ...state,
        checkPhoneFail: action.payload
      };
    }
    case SET_URL: {
      return {
        ...state,
        identityUrl: action.payload
      };
    }
    case SEND_MESSAGE_SUCCESS: {
      return {
        ...state,
        answer: action.payload
      };
    }
    default:
      return state;
  }
};
