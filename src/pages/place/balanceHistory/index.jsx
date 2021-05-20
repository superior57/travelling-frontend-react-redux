import React, { useEffect, useState } from "react";
import connect from "react-redux/es/connect/connect";
import { getBalanceList } from "../../../redux/actions/booking.actions/booking.thunk";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import fullLogo from "../../../assets/Full_Logo.png";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { checkAuth } from "../../../redux/actions/users.actions/auth.thunk";
import { AirbnbRangeDatesPicker } from "../../../components/FilterHomeNew/Dates/AirbnbRangeDatesPicker";
import { isInclusivelyBeforeDay } from "react-dates";
import moment from "moment";
import BackArrow from "../../../assets/icons/back-arrow.svg";
import history from "../../../history";
import "./styles.scss";
import Button from "@material-ui/core/Button";
// import {isAuthenticated} from "../../../redux/selectors/auth/auth.select";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function BalanceHistory({
  getBalanceList,
  balanceHistory,
  userData,
  isAuthenticated,
  checkAuth
}) {
  const classes = useStyles();
  useEffect(() => {
    getBalanceList({
      dateFrom: date.dateFrom,
      dateTo: date.dateTo,
      pending: "",
      received: ""
    });
    checkAuth();
  }, []);

  const [active, setActive] = useState("");

  const [date, setDate] = useState({
    dateTo: moment()
      .utcOffset(0)
      .set({ hour: 23, minute: 59 }),
    dateFrom: moment()
      .utcOffset(0)
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .startOf("month")
  });

  const liftUpDates = (startDate, endDate) => {
    let dateTo = moment.unix(endDate / 1000).toISOString();
    let dateFrom = moment.unix(startDate / 1000).toISOString();

    setDate({ dateTo, dateFrom });

    getBalanceList({ dateTo, dateFrom, type: active });
  };

  const handlerFilterClick = event => {
    if (event.target.name === "pending" && active !== "pending") {
      setActive("pending");
      getBalanceList({
        dateFrom: date.dateFrom,
        dateTo: date.dateTo,
        type: "pending"
      });
    } else if (event.target.name === "pending" && active === "pending") {
      setActive("");
      getBalanceList({
        dateFrom: date.dateFrom,
        dateTo: date.dateTo,
        type: ""
      });
    }
    if (event.target.name === "received" && active !== "received") {
      setActive("received");
      getBalanceList({
        dateFrom: date.dateFrom,
        dateTo: date.dateTo,
        type: "received"
      });
    } else if (event.target.name === "received" && active === "received") {
      setActive("");
      getBalanceList({
        dateFrom: date.dateFrom,
        dateTo: date.dateTo,
        type: ""
      });
    }
  };
  const goBack = () => {
    history.goBack();
  };
  return (
    userData.role.role_type === "Host" && (
      <div className="wrapper history">
        <Header
          classes={"home_header"}
          fullLogo={fullLogo}
          isAuthenticated={isAuthenticated}
          find={true}
        />
        <div className="ContactPage__page-name-wrapper history">
          <span className="ContactPage__page-name">
            <img
              className={"back-arrow"}
              onClick={goBack}
              src={BackArrow}
              alt=""
            />
            Transaction history
          </span>
        </div>
        <div className={"content"}>
          <div className={"date-filter dashboard"}>
            <div className={"btns"}>
              <Button
                className={`btn ${active === "pending" && "active"}`}
                name={"pending"}
                onClick={handlerFilterClick}
              >
                pending
              </Button>
              <Button
                className={`btn ${active === "received" && "active"}`}
                name={"received"}
                onClick={handlerFilterClick}
              >
                received
              </Button>
            </div>
            <div className={"calendar"}>
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
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {/*<TableCell>id</TableCell>*/}
                  <TableCell>Booking ID</TableCell>
                  <TableCell align="right">Venue name</TableCell>
                  <TableCell align="right">Event date</TableCell>
                  <TableCell align="right">Balance</TableCell>
                  <TableCell align="right">Funds($)</TableCell>
                  <TableCell align="right">Payout date</TableCell>
                </TableRow>
              </TableHead>
              {balanceHistory?.rows.map(item => (
                <TableBody>
                  <TableRow>
                    <TableCell>{item.reservations?.reservations.id}</TableCell>
                    <TableCell align="right">
                      {item.reservations?.reservations.name}
                    </TableCell>
                    <TableCell align="right">
                      <p>
                        <span>From:</span>
                        {moment(item.reservations?.startDate).format(
                          "MM/DD/YYYY hh:mm A"
                        )}
                      </p>
                      <p>
                        <span>To:</span>
                        {moment(item.reservations?.endDate).format(
                          "MM/DD/YYYY hh:mm A"
                        )}
                      </p>
                    </TableCell>
                    <TableCell align="right">{item.balance}</TableCell>
                    <TableCell align="right">{item.summ}</TableCell>
                    <TableCell align="right">
                      {moment(item.updatedAt).format("MM/DD/YYYY hh:mm A")}
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </TableContainer>
        </div>
        <Footer />
      </div>
    )
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  balanceHistory: state.booking.balanceHistory,
  userData: state.profile.user
});

const mapDispatchToProps = {
  getBalanceList,
  checkAuth
};
export default connect(mapStateToProps, mapDispatchToProps)(BalanceHistory);
