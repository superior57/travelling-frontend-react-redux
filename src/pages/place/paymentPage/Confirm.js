import React from "react";

import CheckoutForm from "./stripe/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { connect } from "react-redux";
import "./style.scss";
import Header from "../../../components/Header";
import fullLogo from "../../../assets/Full_Logo.png";
import Footer from "../../../components/Footer";

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto"
    }
  ]
};

const stripePromise = loadStripe("pk_test_FM3hWcwF5FivgsVjtvT8RoH900opGJNhC9", {
  stripeAccount: "acct_1FZ7egGT23Fu16Kh"
});

function Confirm({ isAuthenticated }) {
  return (
    <div className="wrapper payment">
      <Header
        classes={"home_header"}
        fullLogo={fullLogo}
        isAuthenticated={isAuthenticated}
        find={true}
      />
      <div className={"payment-content"}>
        <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
          <CheckoutForm />
        </Elements>
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
