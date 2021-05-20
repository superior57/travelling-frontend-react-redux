import React, { useEffect, useState } from "react";
import connect from "react-redux/es/connect/connect";
import {
  getListReservations,
  setChangeReservation
} from "../../../redux/actions/booking.actions/booking.thunk";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import fullLogo from "../../../assets/Full_Logo.png";
import Header from "../../../components/Header";
import { isAuthenticated } from "../../../redux/selectors/auth/auth.select";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import "./styles.scss";
import moment from "moment";
import OverlapModal from "./components/OverlapModal";
import { AirbnbRangeDatesPicker } from "../../../components/FilterHomeNew/Dates/AirbnbRangeDatesPicker";
import { isInclusivelyBeforeDay } from "react-dates";
import BackArrow from "../../../assets/icons/back-arrow.svg";
import history from "../../../history";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [createData("name", 0, 0, 0, 0)];

function ReservedPage({
  bookingList,
  overlapList,
  getListReservations,
  setChangeReservation,
  changedStatus,
  isAuthenticated
}) {
  const classes = useStyles();

  const [activeBtn, setActiveBtn] = useState("Pending");
  const [overlapModal, setActiveOverlapModal] = useState(false);
  const [reservationId, setActiveReservation] = useState();
  const [date, setDate] = useState({
    dateTo: moment()
      .utcOffset(0)
      .set({ hour: 23, minute: 59 }),
    dateFrom: moment()
      .utcOffset(0)
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .startOf("month")
  });

  useEffect(() => {
    getListReservations({
      status: "Pending",
      dateTo: date.dateTo,
      dateFrom: date.dateFrom
    });
  }, []);

  useEffect(() => {
    setActiveOverlapModal(overlapModal);
  }, [overlapModal]);

  useEffect(() => {
    if (overlapList) {
      setActiveOverlapModal(true);
    }
  }, [overlapList]);

  const handleCloseModal = () => setActiveOverlapModal(false);

  useEffect(() => {
    if (changedStatus?.changed) {
      (changedStatus.status === "Pending" ||
        changedStatus.status === "Cancelled") &&
        getListReservations({
          status: "Pending",
          dateTo: date.dateTo,
          dateFrom: date.dateFrom
        });
      changedStatus.status === "Accepted" &&
        getListReservations({
          status: "Accepted",
          dateTo: date.dateTo,
          dateFrom: date.dateFrom
        });
      changedStatus.status === "Declined" &&
        getListReservations({
          status: "Declined",
          dateTo: date.dateTo,
          dateFrom: date.dateFrom
        });
      if (changedStatus.status === "Cancelled") {
        setActiveBtn("Pending");
      } else {
        setActiveBtn(changedStatus.status);
      }
    }
  }, [changedStatus]);

  const handlerStatus = event => {
    let dataId = event.currentTarget.getAttribute("data-id");
    let status = event.currentTarget.getAttribute("data-status");
    switch (status) {
      case "pending":
        setChangeReservation({ status: "Pending", id: +dataId });
        break;
      case "decline":
        setChangeReservation({ status: "Declined", id: +dataId });
        break;
      case "accept":
        // if(overlapReservations){
        //   setActiveOverlapReservation(dataId);
        //   setActiveOverlapModal(true);
        // }
        // else setChangeReservation({ status: "Accepted", id: +dataId });
        setActiveReservation(+dataId);
        setChangeReservation({ status: "Accepted", id: +dataId });

        break;
      default:
        getListReservations({
          status,
          dateTo: date.dateTo,
          dateFrom: date.dateFrom
        });
        setActiveBtn(status);
    }
  };

  const liftUpDates = (startDate, endDate) => {
    let dateTo = moment.unix(endDate / 1000).toISOString();
    let dateFrom = moment.unix(startDate / 1000).toISOString();

    setDate({ dateTo, dateFrom });

    getListReservations({ status: activeBtn, dateTo, dateFrom });
  };

  const handlerFilter = event => {
    let dataId = event.currentTarget.getAttribute("data-id");
    let status = event.currentTarget.getAttribute("data-status");
    // setActiveBtn(status);

    if (status === "remove") {
      setChangeReservation({ status: "Cancelled", id: +dataId });
    } else {
      setChangeReservation({ status: "Pending", id: +dataId });
    }
  };
  const goBack = () => {
    history.goBack();
  };
  return (
    <div className="wrapper reservation-wrapper">
      <Header
        classes={"home_header"}
        fullLogo={fullLogo}
        isAuthenticated={isAuthenticated}
        find={true}
      />
      <div className="ContactPage__page-name-wrapper reservations">
        <span className="ContactPage__page-name">
          <img
            className={"back-arrow"}
            onClick={goBack}
            src={BackArrow}
            alt=""
          />
          My reservations
        </span>
      </div>
      <div className={"content"}>
        <div className={"wrapper-btns-filter"}>
          <div className="content-buttons">
            <Button
              color={activeBtn === "Pending" ? "primary" : ""}
              variant="contained"
              onClick={handlerStatus}
              data-status={"Pending"}
            >
              Pending
            </Button>
            <Button
              color={activeBtn === "Accepted" ? "primary" : ""}
              onClick={handlerStatus}
              variant="contained"
              data-status={"Accepted"}
            >
              Acceptable
            </Button>
            <Button
              color={activeBtn === "Declined" ? "primary" : ""}
              onClick={handlerStatus}
              variant="contained"
              data-status={"Declined"}
            >
              Declined
            </Button>
          </div>
          <div className={"date-filter dashboard"}>
            <AirbnbRangeDatesPicker
              startDate={date.dateFrom}
              endDate={date.dateTo}
              liftUpDates={liftUpDates}
              adminTransactions={true}
              noBorder={false}
              //showClearDates={true}
              isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
              changedDate={true}
            />
          </div>
        </div>

        {bookingList && (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {/*<TableCell>id</TableCell>*/}
                  <TableCell>Venue Name</TableCell>
                  {bookingList[0]?.user?.id && (
                    <>
                      <TableCell align="right">Guest name</TableCell>
                      <TableCell align="right">Guest email</TableCell>
                    </>
                  )}
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Message</TableCell>
                  <TableCell align="right">People</TableCell>
                  <TableCell align="right">Booked hours</TableCell>
                  <TableCell align="right">Payment</TableCell>
                  <TableCell align="right">Activity</TableCell>
                  {bookingList[0]?.user?.id && activeBtn === "Pending" && (
                    <TableCell align="right">Actions</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {bookingList.map(row => (
                  <TableRow key={row.id}>
                    {/*<TableCell component="th" scope="row">{row.BuildingId}</TableCell>*/}

                    <TableCell component="th" scope="row">
                      <Link to={`/reservations/${row.id}`}>
                        {row.reservations?.name}
                      </Link>
                    </TableCell>

                    <TableCell align="right" className="row-event">
                      {row.event?.name}
                    </TableCell>
                    <TableCell align="right" className="row-date">
                      <span className="mobile-only">Create at </span>
                      {moment(row.createdAt).format("MM/DD/YYYY hh:mm A")}
                    </TableCell>

                    {row.user?.id && (
                      <>
                        <TableCell align="right">
                          {row.user.first_name + " " + row.user.last_name}
                        </TableCell>
                        <TableCell align="right">{row.user.email}</TableCell>
                      </>
                    )}
                    <TableCell align="right" className="row-from-to">
                      <p>
                        {/*<span>From:</span>*/}
                        {moment(row.startDate).format("MM/DD/YYYY hh:mm A")}
                      </p>
                      <p>
                        {/*<span>To:</span>*/}
                        {moment(row.endDate).format("MM/DD/YYYY hh:mm A")}
                      </p>
                    </TableCell>
                    <TableCell align="right" className="row-message">
                      {row.message}
                    </TableCell>
                    <TableCell align="right" className="row-people">
                      {row.people}
                    </TableCell>
                    <TableCell align="right" className="hours">
                      {Math.ceil(
                        moment(row.endDate).diff(
                          moment(row.startDate),
                          "hours",
                          true
                        )
                      )}
                    </TableCell>

                    <TableCell className="mobile-hidden payment" align="right">
                      {row.payment?.summ || 0}
                    </TableCell>

                    {activeBtn === "Pending" && !row.user?.id && (
                      <TableCell align="right" className="row-button">
                        <Button
                          color={"secondary"}
                          variant="contained"
                          onClick={handlerFilter}
                          data-status={"remove"}
                          data-id={row.id}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    )}

                    {activeBtn === "Pending" && row.user?.id && (
                      <TableCell align="right">
                        <Button
                          disabled={row.status !== "Payed"}
                          color={"primary"}
                          variant="contained"
                          onClick={handlerStatus}
                          data-status={"accept"}
                          data-id={row.id}
                        >
                          accept
                        </Button>
                        <Button
                          color={"secondary"}
                          variant="contained"
                          onClick={handlerStatus}
                          data-status={"decline"}
                          data-id={row.id}
                        >
                          decline
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <OverlapModal
              dataId={reservationId}
              resolve={overlapModal}
              onClose={handleCloseModal}
            />
          </TableContainer>
        )}
      </div>

      <Footer />
    </div>
  );
}

const mapStateToProps = state => ({
  bookingList: state.booking.bookingList,
  overlapList: state.booking.overlapList,
  changedStatus: state.booking.changed,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
  getListReservations,
  setChangeReservation
};
export default connect(mapStateToProps, mapDispatchToProps)(ReservedPage);
