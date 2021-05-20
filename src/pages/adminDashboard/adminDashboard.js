import React, { Component } from "react";
import AdminUserBookingStatus from "./adminUserBookingStatus";
import AdminTableDashboard from "./adminTableDashboard";

export class AdminDashboard extends Component {
  render() {
    const { data } = this.props;

    return (
      <div className="dash_cntnt">
        <AdminUserBookingStatus />

        <AdminTableDashboard />

        {/*<div className="cstm_table paddbtm0">*/}
        {/*  <AdminHostAvailable hosts={data} />*/}
        {/*  <AdminNewUsers guest={data} />*/}
        {/*</div>*/}
        {/*<div className="cstm_table ">*/}
        {/*  <AdminRecentVenueAdded recentVenue={data} />*/}
        {/*</div>*/}
      </div>
    );
  }
}

export default AdminDashboard;
