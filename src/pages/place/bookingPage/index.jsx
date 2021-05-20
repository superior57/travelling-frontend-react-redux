import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./style.scss";
import {
  getReservation,
  sendNewInvoices,
  removeInvoice,
  cancelInvoice,
  acceptInvoice,
  sendReservationMessage
} from "../../../redux/actions/booking.actions/booking.thunk";
import { getRModal } from "../../../redux/actions/booking.actions/booking.actions";

import Header from "../../../components/Header";
import fullLogo from "../../../assets/Full_Logo.png";
import Footer from "../../../components/Footer";
import PlaceCard from "../../../components/PlaceCard";
import event from "../../../assets/event.svg";
import guest from "../../../assets/guest.svg";
import history from "../../../history";
import moment from "moment";
import AddInvoice from "./components/AddInvoice";
import Invoice from "./components/Invoice";
import Review from "../reviewPage";

function BookingPage({
  getReservation,
  isAuthenticated,
  currentReservation,
  sendNewInvoices,
  cancelInvoice,
  acceptInvoice,
  newInvoice,
  cancelDataInvoice,
  acceptDataInvoice,
  sendReservationMessage
}) {
  // const messages = [
  //   { id: 12, text: "dasdasdasdadasdadasda" },
  //   {
  //     id: 12,
  //     text: "das222dasdasfsdfdsfsdfsdfsd dadasdadasdafsdfsfsfsdfsdfsdfsdfss"
  //   }
  // ];

  const [allMessages, setAllMessages] = React.useState(null);

  const [currentPageId, setCurrentPageId] = React.useState(undefined);
  const [openMessages, setOpenMessages] = React.useState(false);
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    let param = window.location.pathname.lastIndexOf("/");
    setCurrentPageId(window.location.pathname.slice(param + 1));
    getReservation(window.location.pathname.slice(param + 1));
  }, [newInvoice, cancelDataInvoice, acceptDataInvoice]);

  useEffect(() => {
    if (currentReservation) {
      let messages = currentReservation.reservation.messages.map(
        (value, index) => {
          let newReservation = { ...value };
          let first_name, last_name;
          if (value.userId === currentReservation.reservation.user.id) {
            first_name = currentReservation.reservation.user.first_name;
            last_name = currentReservation.reservation.user.last_name;
          }
          if (value.userId === currentReservation.reservation.host.id) {
            first_name = currentReservation.reservation.host.first_name;
            last_name = currentReservation.reservation.host.last_name;
          }

          newReservation = {
            ...newReservation,
            username: first_name + " " + last_name
          };

          return newReservation;
        }
      );

      setAllMessages(messages);
    }
  }, [currentReservation]);

  const openMessager = () => {
    setOpenMessages(!openMessages);
  };

  const submitInvoice = ({ target }) => {
    const status = target.getAttribute("data-status");
    const id = target.getAttribute("data-id");

    switch (status) {
      case "pay":
        history.push(`/payment/${id}`);
        break;
      case "cancel":
        cancelInvoice(id);
        break;
      case "accept":
        acceptInvoice(id);
        break;
      case "remove":
        removeInvoice(id);
        break;
      default:
        history.push(`/`);
    }
  };

  const handlerSend = event => {
    const user = currentReservation.reservation;
    let username = "";

    if (currentReservation.role === "Host") {
      username = user.host.first_name + " " + user.host.last_name;
    } else {
      username = user.user.first_name + " " + user.user.last_name;
    }

    setAllMessages([
      ...allMessages,
      {
        reservationId: currentPageId,
        message: message,
        createdAt: moment().format("YYYY-MM-DD hh:mm"),
        username
      }
    ]);

    sendReservationMessage(currentPageId, message);
    setMessage("");
  };

  const handlerSendChange = ({ target }) => {
    setMessage(target.value);
  };

  const renderDates = (date_from, date_to) => {
    return `${moment(date_from).format("ll")} – ${moment(date_to).format(
      "ll"
    )}`;
  };
  return currentReservation ? (
    <div className="wrapper reservation-details-wrapper">
      <Header
        classes={"home_header"}
        fullLogo={fullLogo}
        isAuthenticated={isAuthenticated}
        find={true}
      />
      <div className="ContactPage__page-name-wrapper reservations">
        <span className="ContactPage__page-name">Reservation details</span>
      </div>
      <div className={"wrapper-reservation-content"}>
        <div className={"reservation-content"}>
          <div className={"main-info"}>
            <div className="host">
              <p className={"host-name mobile-hidden"}>
                Host name -{" "}
                <span>
                  {currentReservation.reservation.host.first_name}{" "}
                  {currentReservation.reservation.host.last_name}
                </span>
              </p>
              <p className={"host-name mobile-only"}>
                <span>
                  {currentReservation.reservation.host.first_name}{" "}
                  {currentReservation.reservation.host.last_name}
                </span>
              </p>
              <p className={"host-email"}>
                Host email -{" "}
                <span>{currentReservation.reservation.host.email}</span>
              </p>
              <div className={"date"}>
                <div className="booking-page__param-img">
                  <img
                    className="booking-page__param-icon"
                    src={event}
                    alt="Event icon"
                  />
                </div>
                <div className="booking-page__param-text">
                  {renderDates(
                    currentReservation.reservation.startDate,
                    currentReservation.reservation.endDate
                  )}
                </div>
              </div>
              <div className={"people"}>
                <div className="booking-page__param-img">
                  <img
                    className="booking-page__param-icon"
                    src={guest}
                    alt="Guest icon"
                  />
                </div>
                <div className="booking-page__param-text">
                  {`${currentReservation.reservation.people} People`}
                </div>
              </div>

              <div className={"summ"}>
                <div className="booking-page__param-text">
                  <span>
                    Current sum: ${currentReservation.reservation.summ}
                  </span>
                </div>
                <div className="booking-page__param-text">
                  <span>
                    Current fee: $
                    {(
                      (currentReservation.reservation.summ *
                        currentReservation.reservation.user.fee) /
                      100
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              <p className={"message"}>
                {currentReservation.reservation.message}
              </p>
              {/*<p className={'rules'}>{place.booking.rulesText}</p>*/}
            </div>
            <div className="venue-card">
              <PlaceCard
                place={currentReservation.reservation.reservations}
                classes={""}
                order={""}
                popularPlace={""}
              />
            </div>
          </div>
          <div className="invoice messages">
            <button
              disabled={!localStorage.getItem("token")}
              className={`startBooking-content-review-btn`}
              onClick={openMessager}
            >
              Messages
            </button>
          </div>
          {currentReservation.role !== "Host" &&
            currentReservation.reservation.status === "Pending" && (
              <div className="invoice">
                <button
                  data-id={currentPageId}
                  data-status="cancel"
                  onClick={submitInvoice}
                  className="startBooking-content-review-btn"
                >
                  Cancel
                </button>
                <button
                  data-id={currentPageId}
                  data-status="pay"
                  disabled={!localStorage.getItem("token")}
                  className={`startBooking-content-review-btn`}
                  onClick={submitInvoice}
                >
                  Pay
                </button>
              </div>
            )}
        </div>
        {openMessages && (
          <aside className={"reservation-content sidebar"}>
            <h3>Annotations</h3>
            <div className={"messages"}>
              {allMessages &&
                allMessages.map((value, index) => (
                  <div className={"info"}>
                    <div className={"username"}>
                      <span>{value.username}</span>
                      <span className={"date"}>
                        {moment(value.createdAt).format("YYYY-MM-DD hh:mm")}
                      </span>
                    </div>
                    <p key={index}>{value.message}</p>
                  </div>
                ))}
            </div>

            <div className={"reply-wrapper"}>
              <input
                value={message}
                className={"reply-input"}
                placeholder={"Send reply"}
                onChange={handlerSendChange}
                type="text"
              />
              <button onClick={handlerSend}>Reply</button>
            </div>
          </aside>
        )}
      </div>
      <Footer />
    </div>
  ) : (
    <div></div>
  );
}

const mapStateToProps = state => ({
  currentReservation: state.booking.currentReservation,
  isAuthenticated: state.auth.isAuthenticated,
  newInvoice: state.booking.newInvoice,
  cancelDataInvoice: state.booking.cancelInvoice,
  acceptDataInvoice: state.booking.acceptInvoice
});

const mapDispatchToProps = {
  getReservation,
  sendNewInvoices,
  removeInvoice,
  acceptInvoice,
  cancelInvoice,
  sendReservationMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingPage);
