import {
  START_BOOKING_REQUEST,
  START_BOOKING_FAILURE,
  START_BOOKING_SUCCESS,
  SET_BOOKING_PARAMETERS,
  SET_BOOKING_ACTIVITY,
  SET_BOOKING_GUESTS,
  SET_BOOKING_DATE_TIME,
  BOOKING_SUCCESS,
  SET_BOOKING_CONFIRM,
  FAIL_BOOKING_CONFIRM,
  CONFIRM_BOOKING_SUCCESS,
  DATA_BOOKING_SUCCESS,
  LIST_BOOKING_SUCCESS,
  CHANGE_RESERVATION_SUCCESS,
  OVERLAP_LIST_DATA_SUCCESS,
  SUCCESS_GET_RES_ID,
  PAYMENT_DATA_SUCCESS,
  PAYMENT_DATA_ERROR,
  CURRENT_PAYMENT_SUCCESS,
  BALANCE_LIST_SUCCESS,
  NEW_INVOICE_SUCCESS,
  CANCEL_INVOICE_SUCCESS,
  ACCEPT_INVOICE_SUCCESS,
  OPEN_RMODEL,
  EXCEPTION_HOURS_START_DAY_SUCCESS,
  EXCEPTION_HOURS_END_DAY_SUCCESS,
  FAIL_EXCEPTION_DATA,
  PRICE_TYPE_SUCCESS,
  CHECK_PROMOCODE_SUCCESS,
  CHECK_PROMOCODE_FAIL,
  GET_HOURS_DAY_SUCCESS,
  CHOSEN_NEW_SLOTS,
  CHOSEN_NEW_POSITIONS,
  SET_CHOSEN_DATE,
  GET_HOURS_DAY_FAILURE
} from "../../actionsBookingTypes";

export const startBookingRequest = () => ({
  type: START_BOOKING_REQUEST
});
export const bookingSuccess = data => {
  return {
    type: BOOKING_SUCCESS,
    payload: data
  };
};

export const startBookingSuccess = data => {
  return {
    type: START_BOOKING_SUCCESS,
    payload: data
  };
};

export const startBookingFailure = err => ({
  type: START_BOOKING_FAILURE,
  payload: err
});

export const setBookingParameters = data => {
  return {
    type: SET_BOOKING_PARAMETERS,
    payload: data
  };
};

export const changeActivity = data => {
  return {
    type: SET_BOOKING_ACTIVITY,
    payload: data
  };
};

export const changeGuests = data => {
  return {
    type: SET_BOOKING_GUESTS,
    payload: data
  };
};
export const setBookingDatesTime = data => {
  // console.log(data)
  return {
    type: SET_BOOKING_DATE_TIME,
    payload: data
  };
};

export const checkPromocodeSuccess = data => {
  return {
    type: CHECK_PROMOCODE_SUCCESS,
    payload: data
  };
};

export const checkPromocodeFail = message => {
  return {
    type: CHECK_PROMOCODE_FAIL,
    payload: message
  };
};

export const setBookingConfirm = data => {
  return {
    type: SET_BOOKING_CONFIRM,
    payload: data
  };
};

export const confirmBookingFailure = message => {
  return {
    type: FAIL_BOOKING_CONFIRM,
    payload: message
  };
};

export const confirmBookingSuccess = data => {
  return {
    type: CONFIRM_BOOKING_SUCCESS,
    payload: data
  };
};

export const dataBookingSuccess = data => {
  return {
    type: DATA_BOOKING_SUCCESS,
    payload: data
  };
};

export const ListBookingSuccess = data => {
  return {
    type: LIST_BOOKING_SUCCESS,
    payload: data
  };
};

export const successChangeReservation = data => ({
  type: CHANGE_RESERVATION_SUCCESS,
  payload: data
});

export const overlapListDataSuccess = data => ({
  type: OVERLAP_LIST_DATA_SUCCESS,
  payload: data
});

export const successGetReservationById = data => ({
  type: SUCCESS_GET_RES_ID,
  payload: data
});

export const paymentDataSuccess = data => ({
  type: PAYMENT_DATA_SUCCESS,
  payload: data
});

export const paymentDataFailure = data => ({
  type: PAYMENT_DATA_ERROR,
  payload: data
});

export const currentPaymentSuccess = data => ({
  type: CURRENT_PAYMENT_SUCCESS,
  payload: data
});

export const balanceListSuccess = data => ({
  type: BALANCE_LIST_SUCCESS,
  payload: data
});

export const newInvoiceSuccess = data => ({
  type: NEW_INVOICE_SUCCESS,
  payload: data
});

export const cancelInvoiceSuccess = data => ({
  type: CANCEL_INVOICE_SUCCESS,
  payload: data
});

export const acceptInvoiceSuccess = data => ({
  type: ACCEPT_INVOICE_SUCCESS,
  payload: data
});
export const getRModal = data => ({
  type: OPEN_RMODEL,
  payload: data
});

export const getExceptionHoursStartDaySuccess = data => ({
  type: EXCEPTION_HOURS_START_DAY_SUCCESS,
  payload: data
});
export const getExceptionHoursEndDaySuccess = data => ({
  type: EXCEPTION_HOURS_END_DAY_SUCCESS,
  payload: data
});

export const getExceptionHoursFailure = message => {
  return {
    type: FAIL_EXCEPTION_DATA,
    payload: message
  };
};

export const getPriceTypeSuccess = data => ({
  type: PRICE_TYPE_SUCCESS,
  payload: data
});

export const getHoursDaysSuccess = data => ({
  type: GET_HOURS_DAY_SUCCESS,
  payload: data
});

export const chosenNewSlots = data => ({
  type: CHOSEN_NEW_SLOTS,
  payload: data
});

export const chosenNewPositions = data => ({
  type: CHOSEN_NEW_POSITIONS,
  payload: data
});

export const setChosenDate = data => ({
  type: SET_CHOSEN_DATE,
  payload: data
});

export const getHoursDaysFailure = data => ({
  type: GET_HOURS_DAY_FAILURE,
  payload: data
});

export const getReservationMessageSuccess = data => ({
  type: "",
  payload: data
});
