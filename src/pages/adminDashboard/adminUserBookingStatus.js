import React, { useEffect, Fragment } from "react";
import { getDashboardTotal } from "../../redux/actions/admin.action/admin.dashboard.thunk";
import { connect } from "react-redux";

function AdminUserBookingStatus({ getDashboardTotal, dashboardTotalData }) {
  useEffect(() => {
    getDashboardTotal();
  }, []);

  return (
    <>
      <div className="card_row ">
        <div className="card_col">
          <h2 className="price">{dashboardTotalData?.reservationCount}</h2>
          <p>Total Booking</p>
        </div>
        <div className="card_col earning">
          <h2 className="price">{dashboardTotalData?.earnings.toFixed(2)}</h2>
          <p>Total Earnings</p>
        </div>
        <div className="card_col">
          <h2 className="price">{dashboardTotalData?.totalvenues}</h2>
          <p>Total of Venue</p>
        </div>
        <div className="card_col">
          <h2 className="price">{dashboardTotalData?.users}</h2>
          <p>Total of User</p>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    dashboardTotalData: state.dashboard.dashboardTotalData
  };
};
export default connect(mapStateToProps, { getDashboardTotal })(
  AdminUserBookingStatus
);
