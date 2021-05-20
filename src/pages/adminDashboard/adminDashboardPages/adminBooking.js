import React, { Component, useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import Filter from "../componetns/Filter";
import "../styles.scss";
import { connect } from "react-redux";
import {
  getAdminBooking,
  getAdminFilterByUsers,
  getAdminReservationFilterByVenue
} from "../../../redux/actions/admin.action/admin.dashboard.thunk";
import moment from "moment";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TablePagination from "@material-ui/core/TablePagination";
import { Form } from "react-bootstrap";

function AdminBooking({
  getAdminBooking,
  adminBookingList,
  getAdminReservationFilterByVenue,
  getAdminFilterByUsers,
  adminVenueFilterList,
  adminUserFilterList
}) {
  const [filters, setFilters] = useState({
    offset: 1,
    limit: 10,
    guest: null,
    host: null,
    venue: null,
    filterName: "id",
    filterOrder: "ASC"
  });
  const [currentPage, setCurrentpage] = useState(1);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [counting, setCounting] = useState(false);

  useEffect(() => {
    if (adminBookingList) {
      setCounting((currentPage - 1) * filters.limit);
    }
  }, [adminBookingList]);

  useEffect(() => {
    getAdminBooking(filters);
    getAdminFilterByUsers();
    getAdminReservationFilterByVenue();
  }, []);

  const handleChangeRowsPerPage = ({ target }) => {
    const updateFilters = { ...filters, limit: target.value, offset: 1 };
    setFilters(updateFilters);
    getAdminBooking(updateFilters);
  };

  const handlePageChange = pageNumber => {
    const updateFilters = { ...filters, offset: pageNumber };
    setCurrentpage(pageNumber);
    setFilters(updateFilters);
    getAdminBooking(updateFilters);
  };

  const handlerFilterChange = (selectId, selectType) => {
    const updateFilters = { ...filters, [selectType]: selectId, offset: 1 };
    setFilters(updateFilters);
    getAdminBooking(updateFilters);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "desc";
    const updateFilters = {
      ...filters,
      filterName: property,
      filterOrder: isAsc ? "ASC" : "DESC"
    };
    setOrder(isAsc ? "asc" : "desc");
    setOrderBy(property);
    getAdminBooking(updateFilters);
    setFilters(updateFilters);
  };
  const createSortHandler = property => event => {
    handleRequestSort(event, property);
  };

  const headCells = [
    { id: "people", numeric: true, disablePadding: false, label: "Capacity" },
    { id: "status", numeric: true, disablePadding: false, label: "Status" },
    { id: "summ", numeric: true, disablePadding: false, label: "Price" },
    {
      id: "startDate",
      numeric: true,
      disablePadding: false,
      label: "Reservation time"
    }
  ];

  const handlerChangeRowsPerPage = ({ target }) => {
    const updateFilters = { ...filters, limit: target.value, offset: 1 };
    setCurrentpage(1);
    setFilters(updateFilters);
    getAdminBooking(updateFilters);
  };
  return (
    <div className="dash_cntnt admin-booking">
      <h3 className={"title"}>Bookings Available</h3>
      <div className={"filters"}>
        <Filter
          checkUseFilter={filters.guest}
          handlerFilterChange={handlerFilterChange}
          type={"guest"}
          label={"by guest"}
          list={adminUserFilterList?.guests}
        />
        <Filter
          checkUseFilter={filters.host}
          handlerFilterChange={handlerFilterChange}
          type={"host"}
          label={"by host"}
          list={adminUserFilterList?.hosts}
        />
        <Filter
          checkUseFilter={filters.venue}
          handlerFilterChange={handlerFilterChange}
          type={"venue"}
          label={"by venue"}
          list={adminVenueFilterList?.buildings}
        />
      </div>
      <TableContainer component={Paper} className={"table-wrapper"}>
        <Table size="small" aria-label="a dense table" className={"table"}>
          <TableHead>
            <TableRow>
              <TableCell className={"not-order"}>#</TableCell>

              <TableCell align="right" className={"not-order"}>
                Booking ID
              </TableCell>

              <TableCell align="right" className={"not-order"}>
                Venue name
              </TableCell>
              <TableCell align="right" className={"not-order"}>
                Host
              </TableCell>
              <TableCell align="right" className={"not-order"}>
                Guest
              </TableCell>

              {headCells.map(headCell => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? "right" : "left"}
                  padding={headCell.disablePadding ? "none" : "default"}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "desc"}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? <span></span> : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {adminBookingList &&
              adminBookingList.rows.map((listValue, index) => (
                <TableRow
                  key={index}
                  className={(index + 1) % 2 === 0 && "changeBg"}
                >
                  <TableCell component="th" scope="row">
                    {index + 1 + counting}
                  </TableCell>
                  <TableCell align="right">
                    {listValue.reservations?.name || "name dosent exist"}
                  </TableCell>
                  <TableCell align="right">{listValue.id}</TableCell>
                  <TableCell align="right">
                    {listValue.host?.first_name +
                      " " +
                      listValue.host?.first_name}
                  </TableCell>
                  <TableCell align="right">
                    {listValue.user?.first_name +
                      " " +
                      listValue?.user?.last_name}
                  </TableCell>
                  <TableCell align="right">{listValue.people}</TableCell>
                  <TableCell align="right">{listValue.status}</TableCell>
                  <TableCell align="right">{listValue.summ}</TableCell>
                  <TableCell align="right">
                    {"from " +
                      moment(listValue.startDate).format("MM/DD/YYYY hh:mm A") +
                      " to " +
                      moment(listValue.endDate).format("MM/DD/YYYY hh:mm A")}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {adminBookingList && (
          <div className={"admin pagination-wrapper"}>
            <div className={"pagination-setting"}>
              <p className={"total-page"}>
                Total pages:{" "}
                {Math.ceil(adminBookingList?.count / filters.limit)}
              </p>
              <Form className={"select"} onChange={handlerChangeRowsPerPage}>
                <Form.Group>
                  <Form.Label>Rows per page:</Form.Label>
                  <Form.Control as="select">
                    <option value={"10"}>10</option>
                    <option value={"25"}>25</option>
                    <option value={"50"}>50</option>
                    <option value={adminBookingList?.count}>All</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>
            <Pagination
              itemsCountPerPage={filters.limit}
              innerClass={"pagination-table"}
              activePage={currentPage}
              totalItemsCount={adminBookingList?.count}
              itemClass={"item-pagination"}
              onChange={handlePageChange}
              itemClassPrev={"prev"}
              itemClassNext={"next"}
              prevPageText="Last"
              nextPageText="Next"
              hideFirstLastPages={true}
            />
          </div>
        )}
      </TableContainer>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    adminBookingList: state.dashboard.adminBookingList,
    adminVenueFilterList: state.dashboard.adminVenueFilterList,
    adminUserFilterList: state.dashboard.adminUserFilterList
  };
};
export default connect(mapStateToProps, {
  getAdminBooking,
  getAdminFilterByUsers,
  getAdminReservationFilterByVenue
})(AdminBooking);
