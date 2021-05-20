import React, { useEffect, useState } from "react";
import Filter from "./componetns/Filter";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableBody from "@material-ui/core/TableBody";
import moment from "moment";
import { Form } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { connect } from "react-redux";
import {
  getAdminFeedback,
  getAdminFeedbackFilterByUsers
} from "../../redux/actions/admin.action/admin.dashboard.thunk";
import Range from "./componetns/Range";
import useOnclickOutside from "react-cool-onclickoutside";
import CombineFilter from "./componetns/CombineFilter";

function Feedback({
  getAdminFeedback,
  getAdminFeedbackFilterByUsers,
  adminUserFilterList,
  adminFeedBackList
}) {
  const [filters, setFilters] = useState({
    offset: 1,
    limit: 10,
    userId: null,
    role_id: null,
    filterName: "id",
    filterOrder: "ASC",
    rate: null,
    currentType: null
  });
  const [active, setActive] = useState(false);
  const [combineRange, setCombineRange] = useState({});
  const [selectRange, setSelectRange] = useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [currentPage, setCurrentpage] = useState(1);

  const [counting, setCounting] = useState(false);

  useEffect(() => {
    if (adminFeedBackList) {
      setCounting((currentPage - 1) * filters.limit);
    }
  }, [adminFeedBackList]);

  useEffect(() => {
    getAdminFeedback(filters);
    getAdminFeedbackFilterByUsers();
  }, []);

  const headCells = [
    { id: "rate", numeric: true, disablePadding: false, label: "Rating" },
    {
      id: "description",
      numeric: true,
      disablePadding: false,
      label: "Description"
    }
  ];

  const ref = useOnclickOutside(() => {
    if (active) {
      setFilters({ ...combineRange, ...filters });
      getAdminFeedback({ ...filters, ...combineRange });
    }
    setActive(false);
  });

  const handlerFilterChange = (selectId, selectType, currentType) => {
    let updateFilters;

    if (selectType === "role_id" && filters.userId) {
      updateFilters = {
        ...filters,
        userId: null,
        [selectType]: selectId,
        offset: 1
      };
    } else if (selectType === "userId" && filters.role_id) {
      updateFilters = {
        ...filters,
        role_id: null,
        [selectType]: selectId,
        offset: 1
      };
    } else {
      updateFilters = { ...filters, [selectType]: selectId, offset: 1 };
    }
    setFilters({ ...updateFilters, currentType });
    getAdminFeedback(updateFilters);
  };

  const handlePageChange = pageNumber => {
    const updateFilters = { ...filters, offset: pageNumber };
    setCurrentpage(pageNumber);
    setFilters(updateFilters);
    getAdminFeedback(updateFilters);
  };

  const handlerShowRanges = event => {
    let actualActive = active;
    setActive(Boolean((actualActive ^= true)));
    if (Boolean((actualActive ^= true))) {
      setFilters({ ...combineRange, ...filters });
      getAdminFeedback({ ...filters, ...combineRange });
    }
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
    getAdminFeedback(updateFilters);
    setFilters(updateFilters);
  };
  const createSortHandler = property => event => {
    handleRequestSort(event, property);
  };

  const handlerChangeRowsPerPage = ({ target }) => {
    const updateFilters = { ...filters, limit: target.value, offset: 1 };
    setCurrentpage(1);
    setFilters(updateFilters);
    getAdminFeedback(updateFilters);
  };

  return (
    <div className="dash_cntnt admin-feedback">
      <h3 className={"title"}>Feedback Available</h3>
      <div className={"filters"}>
        <CombineFilter
          currentType={filters.currentType}
          handlerFilterChange={handlerFilterChange}
          list={{
            ...adminUserFilterList,
            role: [
              { name: "Guest", id: 1 },
              { name: "Host", id: 2 }
            ]
          }}
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
              type={"rate"}
              combineRange={combineRange}
              setCombineRange={setCombineRange}
              range={{ start: 0, end: 5 }}
              defaultValue={0}
              setSelectRange={setSelectRange}
              selectRange={selectRange}
              label={"Filter by totalRate"}
              step={1}
            />
          </div>
        </div>
      </div>
      <TableContainer component={Paper} className={"table-wrapper"}>
        <Table size="small" aria-label="a dense table" className={"table"}>
          <TableHead>
            <TableRow>
              <TableCell className={"not-order"}>#</TableCell>
              <TableCell align="right" className={"not-order"}>
                User Name
              </TableCell>

              <TableCell align="right" className={"not-order"}>
                User Role
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
            {adminFeedBackList &&
              adminFeedBackList.rows.map((listValue, index) => (
                <TableRow
                  key={index}
                  className={(index + 1) % 2 === 0 && "changeBg"}
                >
                  <TableCell component="th" scope="row">
                    {index + 1 + counting}
                  </TableCell>
                  <TableCell align="right">
                    {listValue.user?.first_name +
                      " " +
                      listValue?.user?.last_name}
                  </TableCell>
                  <TableCell align="right">
                    {listValue.user?.role.role_type}
                  </TableCell>
                  <TableCell align="right">{listValue.rate}</TableCell>
                  <TableCell align="right">{listValue.description}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {adminFeedBackList && (
          <div className={"admin pagination-wrapper"}>
            <div className={"pagination-setting"}>
              <p className={"total-page"}>
                Total pages:{" "}
                {Math.ceil(adminFeedBackList?.count / filters.limit)}
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
                        adminFeedBackList?.count > 0
                          ? adminFeedBackList?.count
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
              totalItemsCount={adminFeedBackList?.count}
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
    adminFeedBackList: state.dashboard.adminFeedBackList
  };
};

export default connect(mapStateToProps, {
  getAdminFeedback,
  getAdminFeedbackFilterByUsers
})(Feedback);
