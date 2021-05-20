import React, { Component, useEffect, useState } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { connect } from "react-redux";
import { getAdminTransactions } from "../../../redux/actions/admin.action/admin.dashboard.thunk";
import { Form } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { AirbnbRangeDatesPicker } from "../../../components/FilterHomeNew/Dates/AirbnbRangeDatesPicker";
import moment from "moment";
import { isInclusivelyBeforeDay } from "react-dates";

function Transactions({
  adminVenueList,
  adminTransactionsList,
  getAdminTransactions
}) {
  const [filters, setFilters] = useState({
    dateTo: moment()
      .utcOffset(0)
      .set({ hour: 23, minute: 59 }),
    dateFrom: moment()
      .utcOffset(0)
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .startOf("month"),
    offset: 1,
    limit: 10,
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

  useEffect(() => {
    getAdminTransactions(filters);
  }, []);

  const handlePageChange = pageNumber => {
    const updateFilters = { ...filters, offset: pageNumber };

    setCurrentpage(pageNumber);
    setFilters(updateFilters);
    getAdminTransactions(updateFilters);
  };

  const handlerChangeRowsPerPage = ({ target }) => {
    const updateFilters = { ...filters, limit: target.value, offset: 1 };
    setCurrentpage(1);
    setFilters(updateFilters);
    getAdminTransactions(updateFilters);
  };

  const liftUpDates = (startDate, endDate) => {
    let dateTo = moment.unix(endDate / 1000).toISOString();
    let dateFrom = moment.unix(startDate / 1000).toISOString();

    const updateFilters = { ...filters, dateTo, dateFrom, offset: 1 };

    setCurrentpage(1);
    setFilters(updateFilters);
    getAdminTransactions(updateFilters);
  };

  return (
    <div className="dash_cntnt venues-booking">
      <h3 className={"title"}>Transactions Available</h3>
      <div className={"filters"}>
        <div className={"date-filter"}>
          <AirbnbRangeDatesPicker
            startDate={filters.dateFrom}
            endDate={filters.dateTo}
            liftUpDates={liftUpDates}
            adminTransactions={true}
            noBorder={true}
            //showClearDates={true}
            isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
          />
        </div>
      </div>
      <TableContainer component={Paper} className={"table-wrapper"}>
        <Table size="small" aria-label="a dense table" className={"table"}>
          <TableHead>
            <TableRow>
              <TableCell className={"not-order"}>#</TableCell>
              <TableCell align="right" className={"not-order"}>
                Host name
              </TableCell>
              <TableCell align="right" className={"not-order"}>
                Summ{" "}
              </TableCell>
              <TableCell align="right" className={"not-order"}>
                Type
              </TableCell>
              <TableCell align="right" className={"not-order"}>
                Description
              </TableCell>
              <TableCell align="right" className={"not-order"}>
                CreatedAt
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminTransactionsList &&
              adminTransactionsList.rows.map((listValue, index) => (
                <TableRow
                  key={index}
                  className={(index + 1) % 2 === 0 && "changeBg"}
                >
                  <TableCell component="th" scope="row">
                    {index + 1 + counting}
                  </TableCell>
                  <TableCell align="right">
                    {listValue.name || "name dosent exist"}
                  </TableCell>
                  <TableCell align="right">{listValue.summ}</TableCell>
                  <TableCell align="right">{listValue.type}</TableCell>
                  <TableCell align="right">{listValue.description}</TableCell>

                  <TableCell align="right">
                    {moment(listValue.startDate).format("MM/DD/YYYY hh:mm A")}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {adminTransactionsList && (
          <div className={"admin pagination-wrapper"}>
            <div className={"pagination-setting"}>
              <p className={"total-page"}>
                Total pages:{" "}
                {Math.ceil(adminTransactionsList?.count / filters.limit)}
              </p>
              <Form className={"select"} onChange={handlerChangeRowsPerPage}>
                <Form.Group>
                  <Form.Label>Rows per page:</Form.Label>
                  <Form.Control as="select">
                    <option value={"10"}>10</option>
                    <option value={"25"}>25</option>
                    <option value={"50"}>50</option>
                    <option
                      value={
                        adminTransactionsList?.count > 0
                          ? adminTransactionsList?.count
                          : 1
                      }
                    >
                      All
                    </option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>
            <Pagination
              itemsCountPerPage={filters.limit}
              innerClass={"pagination-table"}
              activePage={currentPage}
              totalItemsCount={adminTransactionsList?.count}
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
    adminTransactionsList: state.dashboard.adminTransactionsList
  };
};
export default connect(mapStateToProps, {
  getAdminTransactions
})(Transactions);
