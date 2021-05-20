import produce from "immer";
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

const initialState = JSON.parse(sessionStorage.getItem("booking")) || {};

export default produce((draft = initialState, action) => {
  switch (action.type) {
    case CANCEL_INVOICE_SUCCESS:
      return { ...draft, cancelInvoice: action.payload };
    case ACCEPT_INVOICE_SUCCESS:
      return { ...draft, acceptInvoice: action.payload };

    case NEW_INVOICE_SUCCESS:
      return { ...draft, newInvoice: action.payload };

    case BALANCE_LIST_SUCCESS:
      return { ...draft, balanceHistory: action.payload };
    case CURRENT_PAYMENT_SUCCESS:
      return { ...draft, paymentId: action.payload };
    case PAYMENT_DATA_ERROR:
      return { ...draft, paymentError: action.payload };
    case PAYMENT_DATA_SUCCESS:
      return { ...draft, paymentSuccess: action.payload };
    case OPEN_RMODEL:
      return { ...draft, openRModel: action.payload };
    case SUCCESS_GET_RES_ID:
      return { ...draft, currentReservation: action.payload };

    case CHANGE_RESERVATION_SUCCESS:
      return { ...draft, changed: action.payload };
    case OVERLAP_LIST_DATA_SUCCESS:
      return { ...draft, overlapList: action.payload };

    case BOOKING_SUCCESS:
      console.log(action.payload);

      return { ...draft, dataPlace: action.payload };
    case START_BOOKING_REQUEST:
      return draft;
    case SET_BOOKING_CONFIRM:
      return action.payload;
    case FAIL_BOOKING_CONFIRM:
      return { ...draft, fail: action.payload };
    case LIST_BOOKING_SUCCESS:
      return { ...draft, bookingList: action.payload };
    case DATA_BOOKING_SUCCESS:
      return { ...draft, dataReserved: action.payload };
    case CONFIRM_BOOKING_SUCCESS:
      return { ...draft, bookingResolve: action.payload };
    case START_BOOKING_SUCCESS:
      return [...draft, action.payload];
    case START_BOOKING_FAILURE:
      return draft;
    case SET_BOOKING_PARAMETERS: {
      const {
        startDate,
        endDate,
        startTime,
        endTime,
        guest,
        placeId
      } = action.payload;
      return {
        ...draft,
        parameters: {
          startDate: startDate,
          endDate: endDate,
          startTime: startTime,
          endTime: endTime,
          guest: guest,
          placeId: placeId
        }
      };
    }
    case SET_BOOKING_ACTIVITY:
      return {
        ...draft,
        parameters: {
          ...draft.parameters,
          activity: action.payload
        }
      };
    case SET_BOOKING_GUESTS:
      return {
        ...draft,
        parameters: {
          ...draft.parameters,
          guest: {
            count: action.payload,
            price: 0
          }
        }
      };
    case EXCEPTION_HOURS_START_DAY_SUCCESS:
      return { ...draft, timeExceptionStartDay: action.payload };

    case EXCEPTION_HOURS_END_DAY_SUCCESS:
      return { ...draft, timeExceptionEndDay: action.payload };

    case FAIL_EXCEPTION_DATA:
      return draft;

    case PRICE_TYPE_SUCCESS:
      return { ...draft, priceType: action.payload.priceType };

    case CHECK_PROMOCODE_SUCCESS:
      return { ...draft, promocode: action.payload };

    case CHECK_PROMOCODE_FAIL:
      return { ...draft, promocodeError: action.payload };
    case GET_HOURS_DAY_SUCCESS:
      return { ...draft, slotList: action.payload };
    case GET_HOURS_DAY_FAILURE:
      return { ...draft, slotListFailure: action.payload };
    case CHOSEN_NEW_SLOTS:
      return { ...draft, chosenSlotList: action.payload };
    case CHOSEN_NEW_POSITIONS:
      return { ...draft, newPositions: action.payload };
    case SET_CHOSEN_DATE:
      return { ...draft, newChosenDate: action.payload };

    default:
      return draft;
  }
});
