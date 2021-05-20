import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import AdminDashboard from "./adminIndex";
import AdminLogin from "../../pages/user/admin/login";
import AdminSignup from "../user/admin/signup";
import NotFound from "../../components/NotFound/NotFound";
// import { getAdminPermissions } from '../../redux/actions/users.actions/auth.thunk';
// import { connect } from 'react-redux';
import VerifyApproval from "../user/admin/signup/VerifyApproval";
import CheckEmail from "../user/resetPassword/checkEmail";
import ResetPassword from "../user/resetPassword";

class Admin extends Component {
  // componentDidMount(){
  //   let { pathname } = this.props.location;
  //   this.props.getAdminPermissions(pathname.split('/')[2]);
  // }

  // componentDidUpdate(){
  //   let { pathname } = this.props.location;
  //   this.props.getAdminPermissions(pathname.split('/')[2]);
  // }

  render() {
    return (
      <Switch>
        <Route exact path="/admin/signin" component={AdminLogin} />
        <Route exact path="/admin/signup" component={AdminSignup} />
        <Route
          exact
          path="/admin/approved/:token/:verification_code"
          component={VerifyApproval}
        />
        <Route exact path="/admin/forgot" component={CheckEmail} />
        <Route
          exact
          path="/admin/reset-password/:token"
          component={ResetPassword}
        />
        <Route exact path={`/admin/dashboard`} component={AdminDashboard} />
        {localStorage.permissions &&
          JSON.parse(localStorage.getItem("permissions")).map((item, index) => (
            <Route
              exact
              key={index}
              path={`/admin/${item}`}
              component={AdminDashboard}
            />
          ))}
        <Route component={NotFound} />
      </Switch>
    );
  }
}

// const mapStateToProps = (state) => ({
//   loading: state.auth.adminSignupLoading,
//   adminRoles: state.auth.adminRoles
// });

export default Admin;
