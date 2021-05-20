import React, { Component, useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import Filter from "./componetns/Filter";
import "./styles.scss";
import { connect } from "react-redux";
import {
  getAdminReviews,
  getAdminReviewsFilterByUsers,
  getAdminReviewsFilterByVenue
} from "../../redux/actions/admin.action/admin.dashboard.thunk";
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
import Range from "./componetns/Range";
import CombineRange from "./componetns/CombineRange";
import { Form } from "react-bootstrap";

function Reviews({
  getAdminReviews,
  adminReviewsList,
  getAdminReviewsFilterByVenue,
  getAdminReviewsFilterByUsers,
  adminVenueFilterList,
  adminUserFilterList
}) {
  const [filters, setFilters] = useState({
    offset: 1,
    limit: 10,
    guest: null,
    host: null,
    venue: null,
    type: null,
    cleanliness: null,
    observance: null,
    communication: null,
    totalRate: null,
    filterName: "id",
    filterOrder: "ASC"
  });
  const [currentPage, setCurrentpage] = useState(1);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [counting, setCounting] = useState(false);

  useEffect(() => {
    if (adminReviewsList) {
      setCounting((currentPage - 1) * filters.limit);
    }
  }, [adminReviewsList]);

  useEffect(() => {
    getAdminReviews(filters);
    getAdminReviewsFilterByUsers();
    getAdminReviewsFilterByVenue();
  }, []);

  const handleChangeRowsPerPage = ({ target }) => {
    const updateFilters = { ...filters, limit: target.value, offset: 1 };
    setFilters(updateFilters);
    getAdminReviews(updateFilters);
  };

  const handlePageChange = pageNumber => {
    const updateFilters = { ...filters, offset: pageNumber };
    setCurrentpage(pageNumber);
    setFilters(updateFilters);
    getAdminReviews(updateFilters);
  };
  const handlerFilterChange = (selectId, selectType) => {
    const updateFilters = { ...filters, [selectType]: selectId, offset: 1 };
    setFilters(updateFilters);
    getAdminReviews(updateFilters);
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
    getAdminReviews(updateFilters);
    setFilters(updateFilters);
  };
  const createSortHandler = property => event => {
    handleRequestSort(event, property);
  };

  const handlerChangeRowsPerPage = ({ target }) => {
    const updateFilters = { ...filters, limit: target.value, offset: 1 };
    setCurrentpage(1);
    setFilters(updateFilters);
    getAdminReviews(updateFilters);
  };

  const headCells = [
    {
      id: "isRecommend",
      numeric: true,
      disablePadding: false,
      label: "Recommend"
    },
    { id: "text", numeric: true, disablePadding: false, label: "Description" },
    {
      id: "cleanliness",
      numeric: true,
      disablePadding: false,
      label: "Cleanliness"
    },
    {
      id: "communication",
      numeric: true,
      disablePadding: false,
      label: "Communicate"
    },
    {
      id: "observance",
      numeric: true,
      disablePadding: false,
      label: "Observance"
    },
    {
      id: "rateTotal",
      numeric: true,
      disablePadding: false,
      label: "Rate total"
    }
  ];
  return (
    <div className="dash_cntnt reviews-booking">
      <h3 className={"title"}>Reviews Available</h3>
      <div className={"filters"}>
        <Filter
          checkUseFilter={filters.type}
          handlerFilterChange={handlerFilterChange}
          type={"type"}
          label={"by price type"}
          list={[
            { name: "Hourly", id: 1 },
            { name: "Per Day", id: 2 }
          ]}
        />
        <Filter
          checkUseFilter={filters.host}
          handlerFilterChange={handlerFilterChange}
          type={"host"}
          label={"by host"}
          list={adminUserFilterList?.hosts}
        />
        <Filter
          checkUseFilter={filters.guest}
          handlerFilterChange={handlerFilterChange}
          type={"guest"}
          label={"by guest"}
          list={adminUserFilterList?.guests}
        />
        <Filter
          checkUseFilter={filters.venue}
          handlerFilterChange={handlerFilterChange}
          type={"venue"}
          label={"by venue"}
          list={adminVenueFilterList?.buildings}
        />
        <CombineRange filters={filters} setFilters={setFilters} />
      </div>
      <TableContainer component={Paper} className={"table-wrapper"}>
        <Table size="small" aria-label="a dense table" className={"table"}>
          <TableHead>
            <TableRow>
              <TableCell className={"not-order"}>#</TableCell>

              <TableCell align="right" className={"not-order"}>
                Review ID
              </TableCell>

              <TableCell align="right" className={"not-order"}>
                Venue name
              </TableCell>
              <TableCell align="right" className={"not-order"}>
                User review
              </TableCell>
              <TableCell align="right" className={"not-order"}>
                Venue Host
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
            {adminReviewsList &&
              adminReviewsList.rows.map((listValue, index) => (
                <TableRow
                  key={index}
                  className={(index + 1) % 2 === 0 && "changeBg"}
                >
                  <TableCell component="th" scope="row">
                    {index + 1 + counting}
                  </TableCell>

                  <TableCell align="right">{listValue.id}</TableCell>

                  <TableCell align="right">
                    {listValue.venue?.name || "name dosent exist"}
                  </TableCell>
                  <TableCell align="right">
                    {listValue.userReview?.first_name +
                      " " +
                      listValue?.userReview?.last_name}
                  </TableCell>
                  <TableCell align="right">
                    {listValue.venue.user?.first_name +
                      " " +
                      listValue.venue.user?.first_name}
                  </TableCell>
                  <TableCell align="right">
                    {listValue.isRecommend ? "yes" : "no"}
                  </TableCell>
                  <TableCell align="right">{listValue.text}</TableCell>
                  <TableCell align="right">{listValue.cleanliness}</TableCell>
                  <TableCell align="right">{listValue.communication}</TableCell>
                  <TableCell align="right">{listValue.observance}</TableCell>
                  <TableCell align="right">{listValue.rateTotal}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {adminReviewsList && (
          <div className={"admin pagination-wrapper"}>
            <div className={"pagination-setting"}>
              <p className={"total-page"}>
                Total pages:{" "}
                {Math.ceil(adminReviewsList?.count / filters.limit)}
              </p>
              <Form className={"select"} onChange={handlerChangeRowsPerPage}>
                <Form.Group>
                  <Form.Label>Rows per page:</Form.Label>
                  <Form.Control as="select">
                    <option value={"10"}>10</option>
                    <option value={"25"}>25</option>
                    <option value={"50"}>50</option>
                    <option value={adminReviewsList?.count}>All</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>
            <Pagination
              itemsCountPerPage={filters.limit}
              innerClass={"pagination-table"}
              activePage={currentPage}
              totalItemsCount={adminReviewsList?.count}
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
    adminReviewsList: state.dashboard.adminReviewsList,
    adminVenueFilterList: state.dashboard.adminVenueFilterList,
    adminUserFilterList: state.dashboard.adminUserFilterList
  };
};
export default connect(mapStateToProps, {
  getAdminReviews,
  getAdminReviewsFilterByUsers,
  getAdminReviewsFilterByVenue
})(Reviews);
