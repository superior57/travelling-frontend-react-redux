import React, { Component, Fragment, useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { connect } from "react-redux";
import { getAdminDashboardVenues } from "../../redux/actions/admin.action/admin.dashboard.thunk";
import TableCell from "@material-ui/core/TableCell";

function AdminRecentVenueAdded({ venues, getAdminDashboardVenues }) {
  const [limitPage, setLimitPage] = useState(10);
  const [currentPage, setCurrentpage] = useState(1);
  const [counting, setCounting] = useState(false);

  useEffect(() => {
    getAdminDashboardVenues({ offset: currentPage, limit: limitPage });
  }, []);

  useEffect(() => {
    if (venues) {
      setCounting((currentPage - 1) * limitPage);
    }
  }, [venues]);

  const handlePageChange = pageNumber => {
    setCurrentpage(pageNumber);
    getAdminDashboardVenues({ offset: pageNumber, limit: limitPage });
  };
  return (
    <>
      <div className={"table_width"}>
        <h3>Recent Venue Added</h3>
        <div className="table_wrapper">
          <div className="table-responsive">
            <table
              id="example"
              className="table table-striped table-bordered invoice_table dashboard-table"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th className={"name"}>Name</th>
                  <th>Email Id</th>
                  <th className={"description"}>Description</th>
                </tr>
              </thead>
              <tbody>
                {venues &&
                  venues.rows.map((listValue, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1 + counting}</td>
                        <td>{listValue.name}</td>
                        <td>{listValue.renter_email}</td>
                        <td className={"description"}>
                          {listValue.description}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className={"admin dashboard pagination-wrapper"}>
              <p className={"total-page"}>
                Total pages: {Math.ceil(venues?.count / limitPage)}
              </p>
              <Pagination
                itemsCountPerPage={limitPage}
                innerClass={"pagination-table"}
                activePage={currentPage}
                totalItemsCount={venues?.count}
                itemClass={"item-pagination"}
                onChange={handlePageChange}
                itemClassPrev={"prev"}
                itemClassNext={"next"}
                prevPageText="Last"
                nextPageText="Next"
                hideFirstLastPages={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    venues: state.dashboard.dashboardVenues
  };
};

export default connect(mapStateToProps, { getAdminDashboardVenues })(
  AdminRecentVenueAdded
);
