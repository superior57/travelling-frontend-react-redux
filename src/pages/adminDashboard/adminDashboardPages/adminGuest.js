import React, { useEffect, useState } from "react";
import Filter from "../componetns/Filter";
import { connect } from "react-redux";
import {
  getAdminBooking,
  getAdminFilterByUsers
} from "../../../redux/actions/admin.action/admin.dashboard.thunk";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import {
  getAdminHosts,
  removeUser,
  getUserById
} from "../../../redux/actions/admin.action/admin.dashboard.thunk";
import ModalForm from "../componetns/Modal/modalForm";
import { Form } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { setStoreModalType } from "../../../redux/actions/admin.action/admin.dashboard.action";
import TextField from "@material-ui/core/TextField";

function AdminGuests({
  getAdminFilterByUsers,
  hosts,
  adminUserFilterList,
  getAdminHosts,
  removeUser,
  getUserById,
  userDataById,
  setStoreModalType
}) {
  const [filters, setFilters] = useState({
    offset: 1,
    limit: 10,
    host: null,
    filterName: "createdAt",
    filterOrder: "DESC",
    role: 1
  });
  const [currentPage, setCurrentpage] = useState(1);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [open, setOpenModal] = React.useState(false);
  const [modalType, setModalType] = React.useState(false);
  const [counting, setCounting] = useState(false);
  const [checkUseFilter, setCheckUseFilter] = useState(false);

  useEffect(() => {
    if (hosts) {
      setCounting((currentPage - 1) * filters.limit);
    }
  }, [hosts]);

  useEffect(() => {
    getAdminHosts(filters);
    getAdminFilterByUsers();
  }, []);

  useEffect(() => {
    if (userDataById) {
      setOpenModal(true);
    }
  }, [userDataById]);

  const handleChangeRowsPerPage = ({ target }) => {
    const updateFilters = { ...filters, limit: target.value, offset: 1 };
    setFilters(updateFilters);
    getAdminHosts(updateFilters);
  };

  const handlePageChange = pageNumber => {
    const updateFilters = { ...filters, offset: pageNumber };
    setCurrentpage(pageNumber);
    setFilters(updateFilters);
    getAdminHosts(updateFilters);
  };

  const handlerFilterChange = ({ target }) => {
    if (target.value.trim()) {
      setCheckUseFilter(true);
    } else {
      setCheckUseFilter(false);
    }
    const updateFilters = { ...filters, host: target.value, offset: 1 };
    setFilters(updateFilters);
    getAdminHosts(updateFilters);
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
    getAdminHosts(updateFilters);
    setFilters(updateFilters);
  };
  const createSortHandler = property => event => {
    handleRequestSort(event, property);
  };

  const handlerRemoveVenue = ({ target }) => {
    const id = target.getAttribute("data-id");
    const initFilter = {
      offset: 1,
      limit: 10,
      host: null,
      filterName: "createdAt",
      filterOrder: "DESC",
      role: 1
    };
    removeUser(id, initFilter);
    setFilters(initFilter);
  };

  const handlerEditVenue = ({ target }) => {
    const id = target.getAttribute("data-id");
    getUserById(id);
    setModalType("edit");
    setStoreModalType("edit");
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
    getAdminHosts(updateFilters);
  };

  return (
    <div className="dash_cntnt admin-booking admin-user">
      <div>
        <h3 className={"title"}>Guests Available</h3>
        {/*<div className={"filters-create"}>*/}
        {/*  <ModalForm*/}
        {/*    host_id={1}*/}
        {/*    setModalType={setModalType}*/}
        {/*    modalType={modalType}*/}
        {/*    setOpenModal={setOpenModal}*/}
        {/*    openForEdit={open}*/}
        {/*    filters={filters}*/}
        {/*    setFilters={setFilters}*/}
        {/*  />*/}
        {/*</div>*/}
      </div>

      <div className={"filters"}>
        <TextField
          className={`event filter ${checkUseFilter && "active"}`}
          type={"number"}
          value={filters.host}
          onChange={handlerFilterChange}
          placeholder={"search by ID"}
          name="search"
          InputProps={{
            disableUnderline: true
          }}
        />
      </div>
      <TableContainer component={Paper} className={"table-wrapper"}>
        <Table size="small" aria-label="a dense table" className={"table"}>
          <TableHead>
            <TableRow>
              <TableCell className={"not-order"}>#</TableCell>

              <TableCell className={"not-order"} align="right">
                Guest ID
              </TableCell>

              <TableCell className={"not-order"} align="right">
                Name
              </TableCell>
              <TableCell className={"not-order"} align="right">
                Email
              </TableCell>
              <TableCell className={"not-order"} align="right">
                Rating
              </TableCell>
              <TableCell className={"not-order"} align="right">
                Phone
              </TableCell>
              <TableCell className={"not-order"} align="right">
                City
              </TableCell>
              <TableCell className={"not-order"} align="right">
                Balance
              </TableCell>
              {/*<TableCell className={"not-order"} align="right">*/}
              {/*  Update*/}
              {/*</TableCell>*/}
              <TableCell className={"not-order"} align="right">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hosts &&
              hosts.rows.map((listValue, index) => (
                <TableRow
                  key={index}
                  className={(index + 1) % 2 === 0 && "changeBg"}
                >
                  <TableCell component="th" scope="row">
                    {index + 1 + counting}
                  </TableCell>
                  <TableCell align="right">{listValue.id}</TableCell>
                  <TableCell align="right">
                    {listValue.first_name + " " + listValue.last_name}
                  </TableCell>
                  <TableCell align="right">{listValue.email}</TableCell>
                  <TableCell align="right">{listValue.rating}</TableCell>
                  <TableCell align="right">{listValue.phoneNumber}</TableCell>
                  <TableCell align="right">
                    {listValue.city?.city_name}
                  </TableCell>
                  <TableCell align="right">{listValue.balance}</TableCell>
                  {/*<TableCell align="right">*/}
                  {/*  <button*/}
                  {/*    onClick={handlerEditVenue}*/}
                  {/*    data-id={listValue.id}*/}
                  {/*    className={"edit-btn"}*/}
                  {/*  >*/}
                  {/*    Edit*/}
                  {/*  </button>*/}
                  {/*</TableCell>*/}
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
        {hosts && (
          <div className={"admin pagination-wrapper"}>
            <div className={"pagination-setting"}>
              <p className={"total-page"}>
                Total pages: {Math.ceil(hosts?.count / filters.limit)}
              </p>
              <Form className={"select"} onChange={handlerChangeRowsPerPage}>
                <Form.Group>
                  <Form.Label>Rows per page:</Form.Label>
                  <Form.Control as="select">
                    <option value={"10"}>10</option>
                    <option value={"25"}>25</option>
                    <option value={"50"}>50</option>
                    <option value={hosts?.count}>All</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>
            <Pagination
              itemsCountPerPage={filters.limit}
              innerClass={"pagination-table"}
              activePage={currentPage}
              totalItemsCount={hosts?.count}
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
    adminUserFilterList: state.dashboard.adminUserFilterList,
    hosts: state.dashboard.dashboardHosts,
    userDataById: state.dashboard.userDataById
  };
};
export default connect(mapStateToProps, {
  getAdminFilterByUsers,
  getAdminHosts,
  removeUser,
  getUserById,
  setStoreModalType
})(AdminGuests);
