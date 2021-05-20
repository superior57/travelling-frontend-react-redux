import React, { Component, Fragment, useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { connect } from "react-redux";
import { getAdminGuests } from "../../redux/actions/admin.action/admin.dashboard.thunk";
import TableCell from "@material-ui/core/TableCell";

function AdminNewUsers({ guests, getAdminGuests }) {
  const [limitPage, setLimitPage] = useState(10);
  const [currentPage, setCurrentpage] = useState(1);
  const [counting, setCounting] = useState(false);

  useEffect(() => {
    getAdminGuests({ role: 1, offset: currentPage, limit: limitPage });
  }, []);

  useEffect(() => {
    if (guests) {
      setCounting((currentPage - 1) * limitPage);
    }
  }, [guests]);

  const handlePageChange = pageNumber => {
    setCurrentpage(pageNumber);
    getAdminGuests({ role: 1, offset: pageNumber, limit: limitPage });
  };

  return (
    <>
      <div className="table_left">
        <h3>Last added guests</h3>
        <div className="table_wrapper">
          <div className="table-responsive">
            <table
              id="example"
              className="table table-striped table-bordered invoice_table dashboard-table"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {guests &&
                  guests.rows.map((listValue, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1 + counting}</td>
                        <td>{listValue.first_name}</td>
                        <td>{listValue.last_name}</td>
                        <td>{listValue.email}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className={"admin dashboard pagination-wrapper"}>
              <p className={"total-page"}>
                Total pages: {Math.ceil(guests?.count / limitPage)}
              </p>
              <Pagination
                itemsCountPerPage={limitPage}
                innerClass={"pagination-table"}
                activePage={currentPage}
                totalItemsCount={guests?.count}
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
    guests: state.dashboard.dashboardGuests
  };
};

export default connect(mapStateToProps, { getAdminGuests })(AdminNewUsers);
