import React, { Suspense, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./history";
import SignUp from "./pages/user/signUp";
import SignIn from "./pages/user/signIn";
import HomePage from "./pages/home";
import Protected from "./components/container/Protected";
import ActivateCode from "./pages/user/activateCode";
import ListingPage from "./pages/listing/ListingPage";
import ResetPassword from "./pages/user/resetPassword";
import updatePassword from "./pages/user/updatePassword";
import PublicProfile from "./pages/user/publicProfile";
import CheckEmail from "./pages/user/resetPassword/checkEmail";
import PlacesDetails from "./pages/place/detailsPage";
import BookingPage from "./pages/place/bookingPage";
import requestBookPage from "./pages/place/requestBookPage";
import Contact from "./pages/contact/";
import PrivacyPolice from "./pages/privacy/";
import ReservedPage from "./pages/place/ReservedPage";
import ReviewPage from "./pages/place/reviewPage";
import FAQ from "./pages/faq";
import Admin from "./pages/adminDashboard/index";
import EmailSent from "./pages/user/admin/signup/EmailSent";
import NotFound from "./components/NotFound/NotFound";
import BalanceHistory from "./pages/place/balanceHistory/index";
import "./assets/font/Orkney-Regular/font.css";
import Confirm from "./pages/place/paymentPage/Confirm";
import ProfilePage from "./pages/user/profilePage";
import { connect } from "react-redux";
import { checkAuth } from "./redux/actions/users.actions/auth.thunk";
import ReferralProgram from "./pages/ref";
import Chat from "./pages/user/profilePage/Chat";
function App({ checkAuth }) {
  return (
    <div className="ui">
      <Router history={history}>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/signUp" component={SignUp} />
            <Route exact path="/signIn" component={SignIn} />
            <Route exact path="/activate" component={ActivateCode} />
            <Route exact path="/listing" component={ListingPage} />
            <Route exact path="/referral" component={ReferralProgram} />
            <Route exact path="/messenger" component={Chat} />
            <Route
              exact
              path="/reset-password/:token"
              component={ResetPassword}
            />
            <Route exact path="/profile" component={ProfilePage} />

            <Route exact path="/update-password" component={updatePassword} />
            <Route exact path="/check-email" component={CheckEmail} />
            <Route exact path="/user/:id" component={PublicProfile} />
            <Route exact path="/place-details/:id" component={PlacesDetails} />
            <Route exact path="/reservations/:id" component={BookingPage} />
            <Route exact path="/reservations" component={ReservedPage} />
            <Route exact path="/payment/:id" component={Confirm} />
            <Route exact path="/balance-history" component={BalanceHistory} />

            <Route
              exact
              path="/request-booking/:id"
              component={requestBookPage}
            />
            <Route exact path="/user-rate/:token" component={ReviewPage} />
            <Route exact path="/host-rate/:token" component={ReviewPage} />
            <Route exact path="/payment" component={Confirm} />
            <Route exact path="/email-sent" component={EmailSent} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/privacy" component={PrivacyPolice} />
            <Route exact path="/faq" component={FAQ} />
            <Route path="/admin" component={Admin} />
            <Route path="/" component={Protected} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default connect("", { checkAuth })(App);
