import React, { Component, Fragment } from "react";
import AdminHeader from "./adminHeader";
import AdminSidebar from "./adminSidebar";
import Dashboard from "./adminDashboard";
import { getAdminDashboard } from "../../redux/actions/admin.action/admin.dashboard.thunk";
import { connect } from "react-redux";
import { checkAuth } from "../../redux/actions/users.actions/auth.thunk";
import AdminVenue from "./adminDashboardPages/adminVenue";
import AdminTransactions from "./adminDashboardPages/adminTransactions";
import AdminBooking from "./adminDashboardPages/adminBooking";
import AdminHosts from "./adminDashboardPages/adminHosts";
import AdminGuests from "./adminDashboardPages/adminGuest";
import Notifications from "./Notifications";
import Feedback from "./Feedback";
import GuestEmails from "./GuestEmails";
import HostEmails from "./HostEmails";
import Employees from "./Employees";
import Reviews from "./Reviews";
import Chats from "./Chats";

import moment from "moment";

export class AdminIndex extends Component {
  componentDidMount() {
    this.props.checkAuth();
    // this.props.getAdminDashboard();
  }

  shouldComponentUpdate(nextProps, nextState) {
    // const { user, checkError } = nextProps;

    // // Handle state
    // if (nextState !== this.state) {
    //   return true;
    // }

    // if (checkError) {
    //   nextProps.history.push('/admin');
    // }

    // if (user !== this.props.user) {
    //   if (user.role_id && user.role_id !== 1) {
    //     nextProps.history.push('/admin');
    //   }

    //   return true;
    // }
    return true;
  }

  _handleDashboardLayout = data => {
    const { location } = this.props;
    let urlArr = location.pathname.split("/")[2];

    switch (urlArr) {
      case "dashboard":
        return <Dashboard data={data} />;
      // case 'user':
      //   return <AdminGuest data={data} />;
      case "venues":
        return <AdminVenue data={data} />;
      case "transactions":
        return <AdminTransactions data={data} />;
      case "bookings":
        return <AdminBooking data={data} />;
      // case 'rating':
      //   return <AdminRating data={data} />;
      case "chats":
        return <Chats />;
      case "hosts":
        return <AdminHosts data={data} />;
      case "guests":
        return <AdminGuests data={data} />;
      case "notifications":
        return <Notifications />;
      case "feedback":
        return <Feedback />;
      case "guest-emails":
        return <GuestEmails />;
      case "host-emails":
        return <HostEmails />;
      case "employees":
        return <Employees />;
      case "reviews":
        return <Reviews />;
      default:
        return <Dashboard data={data} />;
    }
  };

  render() {
    const { data } = this.props;

    return (
      <>
        {/*{data ? (*/}
        <Fragment>
          <AdminHeader {...this.props} />
          <div className="dash_wrapper wdth100 flex_sidebar ">
            <AdminSidebar {...this.props} />
            {this._handleDashboardLayout(data)}
          </div>
        </Fragment>
        {/*) : (*/}
        {/*  ""*/}
        {/*)}*/}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.dashboard.dashboardData,
    user: state.auth.user,
    checkError: state.auth.checkAuthError
  };
};

export default connect(mapStateToProps, { checkAuth, getAdminDashboard })(
  AdminIndex
);
