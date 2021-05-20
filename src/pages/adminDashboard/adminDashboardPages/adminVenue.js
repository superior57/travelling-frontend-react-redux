import React, { Component, useEffect, useState } from "react";
import Filter from "../componetns/Filter";
import TableContainer from "@material-ui/core/TableContainer";
import useOnclickOutside from "react-cool-onclickoutside";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableBody from "@material-ui/core/TableBody";
import { connect } from "react-redux";
import {
  getAdminVenuesFilterByUsers,
  getAdminFilterByVenue,
  getAdminVenues,
  getAdminCountryFilterList,
  removeVenue
} from "../../../redux/actions/admin.action/admin.dashboard.thunk";
import Range from "../componetns/Range";
import { getCities } from "../../../redux/actions/places.actions/searchPlace.thunk";
import { Form } from "react-bootstrap";
import Pagination from "react-js-pagination";

function AdminVenue({
  getAdminVenues,
  getAdminFilterByVenue,
  getAdminVenuesFilterByUsers,
  adminVenueFilterList,
  adminUserFilterList,
  getAdminCountryFilterList,
  adminCountryFilterList,
  getCities,
  cities,
  adminVenueList,
  removeVenue
}) {
  const [filters, setFilters] = useState({
    offset: 1,
    limit: 10,
    host: null,
    venue: null,
    type: null,
    rating: null,
    city: null,
    country: null,
    price: null,
    filterName: "id",
    filterOrder: "ASC"
  });

  const [currentPage, setCurrentpage] = useState(1);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [counting, setCounting] = useState(false);
  const [active, setActive] = useState(false);
  const [combineRange, setCombineRange] = useState({});
  const [selectRange, setSelectRange] = useState([]);

  useEffect(() => {
    if (adminVenueList) {
      setCounting((currentPage - 1) * filters.limit);
    }
  }, [adminVenueList]);

  const ref = useOnclickOutside(() => {
    if (active) {
      setFilters({ ...combineRange, ...filters });
      getAdminVenues({ ...filters, ...combineRange });
    }
    setActive(false);
  });

  useEffect(() => {
    getAdminVenues(filters);
    getAdminVenuesFilterByUsers();
    getAdminFilterByVenue();
    getAdminCountryFilterList();
    getCities();
  }, []);

  const handlerRemoveVenue = ({ target }) => {
    const id = target.getAttribute("data-id");
    const initFilter = {
      offset: 1,
      limit: 10,
      host: null,
      venue: null,
      type: null,
      rating: null,
      city: null,
      country: null,
      price: null,
      filterName: "id",
      filterOrder: "ASC"
    };
    removeVenue(id, initFilter);
    setFilters(initFilter);
  };

  const handlePageChange = pageNumber => {
    const updateFilters = { ...filters, offset: pageNumber };

    setCurrentpage(pageNumber);
    setFilters(updateFilters);
    getAdminVenues(updateFilters);
  };
  const handlerFilterChange = (selectId, selectType) => {
    const updateFilters = { ...filters, [selectType]: selectId, offset: 1 };
    setFilters(updateFilters);
    getAdminVenues(updateFilters);
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
    getAdminVenues(updateFilters);
    setFilters(updateFilters);
  };
  const createSortHandler = property => event => {
    handleRequestSort(event, property);
  };

  const handlerChangeRowsPerPage = ({ target }) => {
    const updateFilters = { ...filters, limit: target.value, offset: 1 };
    setCurrentpage(1);
    setFilters(updateFilters);
    getAdminVenues(updateFilters);
  };

  const handlerShowRanges = event => {
    let actualActive = active;
    setActive(Boolean((actualActive ^= true)));
    if (Boolean((actualActive ^= true))) {
      setFilters({ ...combineRange, ...filters });
      getAdminVenues({ ...filters, ...combineRange });
    }
  };
  const headCells = [
    {
      id: "description",
      numeric: true,
      disablePadding: false,
      label: "Description"
    },
    {
      id: "name",
      numeric: true,
      disablePadding: false,
      label: "Venue Name"
    },
    {
      id: "price",
      numeric: true,
      disablePadding: false,
      label: "Price"
    },
    {
      id: "priceType",
      numeric: true,
      disablePadding: false,
      label: "Price type"
    },
    {
      id: "rating",
      numeric: true,
      disablePadding: false,
      label: "Rate total"
    }
  ];

  return (
    <div className="dash_cntnt venues-booking">
      <h3 className={"title"}>Venues Available</h3>
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
          checkUseFilter={filters.venue}
          handlerFilterChange={handlerFilterChange}
          type={"venue"}
          label={"by venue"}
          list={adminVenueFilterList?.buildings}
        />
        <Filter
          checkUseFilter={filters.country}
          handlerFilterChange={handlerFilterChange}
          type={"country"}
          label={"by country"}
          list={adminCountryFilterList?.countries}
        />
        <Filter
          checkUseFilter={filters.city}
          handlerFilterChange={handlerFilterChange}
          type={"city"}
          label={"by city"}
          list={cities?.cities}
        />

        <div ref={ref} className={"combine-range"}>
          <div
            onClick={handlerShowRanges}
            className={`select-range ${selectRange.length && "active"}`}
          >
            <input
              type="text"
              disabled={true}
              value={selectRange.length ? selectRange : "by ranges"}
            />
            <span className={`arrow ${active && "action"}`} />
          </div>
          <div className={`wrapper ${active && "show"}`}>
            <Range
              type={"rating"}
              combineRange={combineRange}
              setCombineRange={setCombineRange}
              range={{ start: 0, end: 5 }}
              defaultValue={0}
              setSelectRange={setSelectRange}
              selectRange={selectRange}
              label={"Filter by totalRate"}
              step={0.1}
            />
          </div>
        </div>
        <Filter
          checkUseFilter={filters.price}
          handlerFilterChange={handlerFilterChange}
          type={"price"}
          label={"by price"}
          customInput={"price"}
        />
      </div>
      <TableContainer component={Paper} className={"table-wrapper"}>
        <Table size="small" aria-label="a dense table" className={"table"}>
          <TableHead>
            <TableRow>
              <TableCell className={"not-order"}>#</TableCell>
              <TableCell className={"not-order"} align="right">
                Venue ID
              </TableCell>
              <TableCell align="right" className={"not-order"}>
                City
              </TableCell>
              <TableCell align="right" className={"not-order"}>
                Country
              </TableCell>
              <TableCell align="right" className={"not-order"}>
                Host name
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

              <TableCell align="right" className={"not-order"}>
                Remove
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminVenueList &&
              adminVenueList.rows.map((listValue, index) => (
                <TableRow
                  key={index}
                  className={(index + 1) % 2 === 0 && "changeBg"}
                >
                  <TableCell component="th" scope="row">
                    {index + 1 + counting}
                  </TableCell>
                  <TableCell align="right">{listValue.id}</TableCell>
                  <TableCell align="right">
                    {listValue.city?.city_name || "name dosent exist"}
                  </TableCell>
                  <TableCell align="right">
                    {listValue.country?.country_name || "name dosent exist"}
                  </TableCell>
                  <TableCell align="right">
                    {listValue.user?.first_name +
                      " " +
                      listValue.user?.first_name}
                  </TableCell>
                  <TableCell align="right">{listValue.description}</TableCell>
                  <TableCell align="right">{listValue.name}</TableCell>
                  <TableCell align="right">{listValue.price}</TableCell>
                  <TableCell align="right">{listValue.priceType}</TableCell>
                  <TableCell align="right">{listValue.rating}</TableCell>
                  <TableCell align="right">
                    <button
                      onClick={handlerRemoveVenue}
                      data-id={listValue.id}
                      className={"remove-btn"}
                    >
                      Remove
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {adminVenueList && (
          <div className={"admin pagination-wrapper"}>
            <div className={"pagination-setting"}>
              <p className={"total-page"}>
                Total pages: {Math.ceil(adminVenueList?.count / filters.limit)}
              </p>
              <Form className={"select"} onChange={handlerChangeRowsPerPage}>
                <Form.Group>
                  <Form.Label>Rows per page:</Form.Label>
                  <Form.Control as="select">
                    <option value={"10"}>10</option>
                    <option value={"25"}>25</option>
                    <option value={"50"}>50</option>
                    <option value={adminVenueList?.count}>All</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>
            <Pagination
              itemsCountPerPage={filters.limit}
              innerClass={"pagination-table"}
              activePage={currentPage}
              totalItemsCount={adminVenueList?.count}
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
    adminVenueList: state.dashboard.adminVenueList,
    adminVenueFilterList: state.dashboard.adminVenueFilterList,
    adminUserFilterList: state.dashboard.adminUserFilterList,
    adminCountryFilterList: state.dashboard.adminCountryFilterList,
    cities: state.searchPlace.cities
  };
};
export default connect(mapStateToProps, {
  getAdminVenues,
  getAdminVenuesFilterByUsers,
  getAdminFilterByVenue,
  getAdminCountryFilterList,
  getCities,
  removeVenue
})(AdminVenue);
