import {
  startBookingRequest,
  startBookingSuccess,
  startBookingFailure,
  setBookingConfirm,
  bookingSuccess,
  confirmBookingFailure,
  confirmBookingSuccess,
  dataBookingSuccess,
  ListBookingSuccess,
  successChangeReservation,
  overlapListDataSuccess,
  successGetReservationById,
  paymentDataSuccess,
  paymentDataFailure,
  currentPaymentSuccess,
  balanceListSuccess,
  newInvoiceSuccess,
  acceptInvoiceSuccess,
  cancelInvoiceSuccess,
  getExceptionHoursStartDaySuccess,
  getExceptionHoursEndDaySuccess,
  getExceptionHoursFailure,
  getPriceTypeSuccess,
  checkPromocodeSuccess,
  checkPromocodeFail,
  getHoursDaysSuccess,
  getHoursDaysFailure,
  getReservationMessageSuccess
} from "./booking.actions";
import * as actions from "../users.actions/auth.actions";
import axiosInstance from "../../../api";

import history from "../../../history";

export const saveBookingDataLocally = data => async dispatch => {
  dispatch(startBookingRequest());
  try {
    await sessionStorage.setItem("booking", JSON.stringify(data));
    dispatch(bookingSuccess(data));
    dispatch(startBookingSuccess(data));
  } catch (error) {
    dispatch(startBookingFailure(error));
  }
};

export const createBookingConfirm = data => async dispatch => {
  dispatch(setBookingConfirm());
  try {
    const result = await axiosInstance.post("/reservations", data);
    dispatch(confirmBookingSuccess(true));
    dispatch(dataBookingSuccess(result));

    // history.push(`/booking/${data.BuildingId}`);
  } catch (error) {
    dispatch(
      confirmBookingFailure({ message: error.response.data.erorrs?.message })
    );
  }
};

export const checkPromocode = promocode => async dispatch => {
  try {
    const result = await axiosInstance.get(`/api/user/referral/${promocode}`);
    const checkPromocode = result.data;
    dispatch(checkPromocodeSuccess({ checkPromocode }));
  } catch (error) {
    dispatch(
      checkPromocodeFail({ message: error.response.data.erorrs?.message })
    );
  }
};

export const getListReservations = data => async dispatch => {
  // dispatch(setBookingList());
  try {
    const result = await axiosInstance.post("/reservations/user", data);
    dispatch(ListBookingSuccess(result.data));
  } catch (error) {
    // dispatch(ListBookingFailure({ message: error.response.data.erorrs.message }));
  }
};

export const setChangeReservation = data => async dispatch => {
  try {
    const result = await axiosInstance.post(`/reservation`, data);
    if (!result.data.count) {
      dispatch(
        successChangeReservation({ status: data.status, changed: true })
      );
    } else {
      dispatch(overlapListDataSuccess(result.data));
    }
  } catch (error) {
    // dispatch(ListBookingFailure({ message: error.response.data.erorrs.message }));
  }
};

export const setChangeOverlapReservation = data => dispatch => {
  try {
    axiosInstance.post(`/reservation`, data);
    const result = axiosInstance.post(`/reservation`, data);
    dispatch(successChangeReservation({ status: data.status, changed: true }));
  } catch (error) {
    // dispatch(ListBookingFailure({ message: error.response.data.erorrs.message }));
  }
};

export const getReservation = data => async dispatch => {
  try {
    const result = await axiosInstance.get(`api/reservation/${data}`);
    dispatch(successGetReservationById(result.data));
  } catch (error) {
    // dispatch(failureGetReservationById({ message: error.response.data.erorrs.message }));
  }
};

export const sendNewInvoices = data => async dispatch => {
  try {
    const result = await axiosInstance.post(`api/invoice/create`, data);
    const invoice = result.data.invoice;
    invoice["details"] = result.data.details;
    dispatch(newInvoiceSuccess(invoice));
  } catch (error) {}
};

export const removeInvoice = id => async dispatch => {
  try {
    const result = await axiosInstance.delete(`api/invoice/remove/${id}`);
  } catch (error) {}
};

export const cancelInvoice = id => async dispatch => {
  try {
    const result = await axiosInstance.get(`api/invoice/cancel/${id}`);
    dispatch(cancelInvoiceSuccess(result.data));
  } catch (error) {}
};

export const acceptInvoice = id => async dispatch => {
  try {
    const result = await axiosInstance.get(`api/invoice/accept/${id}`);
    dispatch(acceptInvoiceSuccess(result.data));
  } catch (error) {}
};

export const sendPaymentData = data => async dispatch => {
  try {
    const result = await axiosInstance.post(`api/stripe/intent`, data);

    dispatch(paymentDataSuccess(result.data));
  } catch (error) {
    // dispatch(paymentDataFailure({ message: error.response.data.erorrs?.message }));
  }
};

export const getCurrentPayment = id => async dispatch => {
  try {
    const result = await axiosInstance.get(`/reservations/${id}`);

    dispatch(currentPaymentSuccess(result.data));
  } catch (error) {
    // dispatch(paymentDataFailure({ message: error.response.data.erorrs?.message }));
  }
};

export const getBalanceList = data => async dispatch => {
  try {
    const result = await axiosInstance.post(`/api/balance`, data);
    dispatch(balanceListSuccess(result.data));
  } catch (error) {}
};

export const getExceptionHoursStartDay = (id, data) => async dispatch => {
  try {
    const result = await axiosInstance.post(`/api/venue/operatinghours/${id}`, {
      date: data
    });
    dispatch(getExceptionHoursStartDaySuccess(result.data));
  } catch (error) {
    // dispatch(getExceptionHoursFailure({ message: error.message }));
  }
};
export const getExceptionHoursEndDay = (id, data) => async dispatch => {
  try {
    const result = await axiosInstance.post(`/api/venue/operatinghours/${id}`, {
      date: data
    });
    dispatch(getExceptionHoursEndDaySuccess(result.data));
  } catch (error) {
    // dispatch(getExceptionHoursFailure({ message: error.message }));
  }
};

export const getPriceType = id => async dispatch => {
  try {
    const result = await axiosInstance.get(`/api/venue/paymenttype/${id}`);
    dispatch(getPriceTypeSuccess(result.data));
  } catch (error) {}
};

export const getHoursDay = (id, data) => async dispatch => {
  try {
    //  const data = {
    //    exceptions: {
    //      startDay: [
    //        { start: "03:00:00", end: "08:00:00", day: "Sat Oct 16 2020 08:41:29 GMT+0000 (Coordinated Universal Time)" },
    //        { start: "11:00:00", end: "15:00:00", day: "Sat Oct 16 2020 08:41:29 GMT+0000 (Coordinated Universal Time)" }
    //      ],
    //      endDay: [
    //
    //        { start: "05:00:00", end: "09:00:00", day: "Sat Oct 17 2020 08:41:29 GMT+0000 (Coordinated Universal Time)" }
    //      ]
    //    },
    //    operationHours: {
    //      startDay: { start: "02:00:00", end: "15:00:00", day: "Sat Oct 16 2020 08:41:29 GMT+0000 (Coordinated Universal Time)" },
    //      endDay: { start: "00:00:00", end: "10:00:00", day: "Sat Oct 17 2020 08:41:29 GMT+0000 (Coordinated Universal Time)" }
    //    }
    //  };
    //
    // dispatch(getHoursDaysSuccess(data));

    const result = await axiosInstance.post(`/api/venue/operatinghours/${id}`, {
      date: data
    });

    dispatch(getHoursDaysSuccess(result.data));
  } catch (error) {
    dispatch(getHoursDaysFailure(true));
  }
};

export const sendReservationMessage = (
  reservationId,
  text
) => async dispatch => {
  try {
    const result = await axiosInstance.post(`/api/reservation/message`, {
      reservationId,
      text
    });
    dispatch(getReservationMessageSuccess(result.data));
  } catch (error) {}
};
