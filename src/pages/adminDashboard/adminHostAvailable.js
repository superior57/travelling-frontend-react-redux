import React, { Component, Fragment, useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { connect } from "react-redux";
import { getAdminHosts } from "../../redux/actions/admin.action/admin.dashboard.thunk";
import TableCell from "@material-ui/core/TableCell";

function AdminHostAvailable({ hosts, getAdminHosts }) {
  const [limitPage, setLimitPage] = useState(10);
  const [currentPage, setCurrentpage] = useState(1);
  const [counting, setCounting] = useState(false);

  useEffect(() => {
    if (hosts) {
      setCounting((currentPage - 1) * limitPage);
    }
  }, [hosts]);

  useEffect(() => {
    getAdminHosts({ role: 2, offset: currentPage, limit: limitPage });
  }, []);

  const handlePageChange = pageNumber => {
    setCurrentpage(pageNumber);
    getAdminHosts({ role: 2, offset: pageNumber, limit: limitPage });
  };

  return (
    <>
      <div className="table_left">
        <h3>Last added hosts</h3>
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
                {hosts &&
                  hosts.rows.map((listValue, index) => {
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
                Total pages: {Math.ceil(hosts?.count / limitPage)}
              </p>
              <Pagination
                itemsCountPerPage={limitPage}
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
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    hosts: state.dashboard.dashboardHosts
  };
};

export default connect(mapStateToProps, { getAdminHosts })(AdminHostAvailable);
