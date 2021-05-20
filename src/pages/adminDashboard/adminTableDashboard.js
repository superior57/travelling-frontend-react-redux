import React, { Component, Fragment, useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { connect } from "react-redux";
import {
  getAdminDashboard,
  getAdminHosts
} from "../../redux/actions/admin.action/admin.dashboard.thunk";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import moment from "moment";
import { AirbnbRangeDatesPicker } from "../../components/FilterHomeNew/Dates/AirbnbRangeDatesPicker";
import { isInclusivelyBeforeDay } from "react-dates";
import TableRow from "@material-ui/core/TableRow";

function AdminTableDashboard({ hosts, getAdminDashboard, dashboardData }) {
  const [lastStatistic, setLastStatistic] = useState(null);

  const [filters, setFilters] = useState({
    // dateTo: moment(),
    // dateFrom: moment().add(-1, 'month'),

    dateTo: moment()
      .utcOffset(0)
      .set({ hour: 23, minute: 59 }),
    dateFrom: moment()
      .utcOffset(0)
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .startOf("month")
  });

  useEffect(() => {
    getAdminDashboard(filters);
  }, []);

  useEffect(() => {
    if (dashboardData) {
      setLastStatistic(dashboardData);
    }
  }, [dashboardData]);

  const liftUpDates = (startDate, endDate) => {
    let dateTo = moment.unix(endDate / 1000).toISOString();
    let dateFrom = moment.unix(startDate / 1000).toISOString();

    const updateFilters = { ...filters, dateTo, dateFrom };

    setFilters(updateFilters);
    getAdminDashboard(updateFilters);
  };

  return (
    <div className="dash_cntnt venues-booking dashboard">
      <div className={"filters"}>
        <h3 className={"title"}>Statistic</h3>
        <div className={"date-filter dashboard"}>
          <AirbnbRangeDatesPicker
            dashboardClass={"disabled"}
            startDate={filters.dateFrom}
            endDate={filters.dateTo}
            liftUpDates={liftUpDates}
            adminTransactions={true}
            noBorder={true}
            //showClearDates={true}
            isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
            changedDate={true}
          />
        </div>
      </div>

      {dashboardData && lastStatistic && (
        <TableContainer component={Paper} className={"table-wrapper dashboard"}>
          <Table size="small" aria-label="a dense table" className={"table"}>
            <TableBody>
              <TableRow className={"changeBg"}>
                <TableCell component="th" scope="row">
                  Earnings
                </TableCell>
                <TableCell component="th" scope="row">
                  {dashboardData.earnings.toFixed(2)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell component="th" scope="row">
                  Guests
                </TableCell>
                <TableCell component="th" scope="row">
                  {dashboardData.guests}
                </TableCell>
              </TableRow>

              <TableRow className={"changeBg"}>
                <TableCell component="th" scope="row">
                  Guests High Rating
                </TableCell>
                <TableCell component="th" scope="row">
                  {dashboardData.guestsHighRating}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Guests Low Rating
                </TableCell>
                <TableCell component="th" scope="row">
                  {dashboardData.guestsLowRating}
                </TableCell>
              </TableRow>

              <TableRow className={"changeBg"}>
                <TableCell component="th" scope="row">
                  Hosts
                </TableCell>
                <TableCell component="th" scope="row">
                  {dashboardData.hosts}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell component="th" scope="row">
                  Hosts High Rating
                </TableCell>
                <TableCell component="th" scope="row">
                  {dashboardData.hostsHighRating}
                </TableCell>
              </TableRow>

              <TableRow className={"changeBg"}>
                <TableCell component="th" scope="row">
                  Hosts Low Rating
                </TableCell>
                <TableCell component="th" scope="row">
                  {dashboardData.hostsLowRating}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell component="th" scope="row">
                  NET
                </TableCell>
                <TableCell component="th" scope="row">
                  {dashboardData.net.toFixed(2)}
                </TableCell>
              </TableRow>

              <TableRow className={"changeBg"}>
                <TableCell component="th" scope="row">
                  Reservation Count
                </TableCell>
                <TableCell component="th" scope="row">
                  {dashboardData.reservationCount}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell component="th" scope="row">
                  Venues
                </TableCell>
                <TableCell component="th" scope="row">
                  {dashboardData.venues}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    dashboardData: state.dashboard.dashboardData
  };
};

export default connect(mapStateToProps, { getAdminDashboard })(
  AdminTableDashboard
);
