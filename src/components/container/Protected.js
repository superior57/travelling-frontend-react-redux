import React from "react";
import { connect } from "react-redux";
import { Route, Switch, Router } from "react-router-dom";
import { checkAuth } from "../../redux/actions/users.actions/auth.thunk";
import ProfilePage from "../../pages/user/profilePage";
import Admin from "../../pages/user/admin";
import Host from "../../pages/place/hostPage";
import Buildings from "../../pages/place/createPlace";
import EditPlace from "../../pages/place/editPlace";
import UploadFiles from "../../pages/place/uploadFiles";
import Header from "../Header";
import { isAuthenticated } from "../../redux/selectors/auth/auth.select";
import Footer from "../Footer";
import history from "../../history";
import VenueListings from "../../pages/place/VenueListings";

class Protected extends React.Component {
  // componentDidMount() {
  //   this.props.checkAuth();
  // }
  render() {
    return (
      <>
        <div className="wrapper">
          <Header isAuthenticated={isAuthenticated} find={true} />
        </div>
        <div className="section">
          <Router history={history}>
            <Switch>
              {/*<Route exact path="/profile" component={ProfilePage} />*/}
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/host" component={Host} />
              <Route exact path="/edit-place/:id" component={EditPlace} />
              <Route exact path="/buildings" component={Buildings} />
              <Route exact path="/venue-listings" component={VenueListings} />

              <Route exact path="/upload-files/:id" component={UploadFiles} />
            </Switch>
          </Router>
        </div>
        <Footer />
      </>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated,
    checkAuthError: state.auth.checkAuthError,
    loginError: state.auth.loginError
  }),
  {
    checkAuth
  }
)(Protected);
