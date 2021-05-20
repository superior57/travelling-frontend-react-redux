import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import Field from "./Field";
import { ErrorMessage, ResetButton, SubmitButton } from "./Additional";
import history from "../../../../history";
import {
  sendPaymentData,
  getCurrentPayment
} from "../../../../redux/actions/booking.actions/booking.thunk";
import axiosInstance from "../../../../api";
import { Link } from "react-router-dom";
import "../style.scss";

const CheckoutForm = ({
  paymentSuccess,
  sendPaymentData,
  paymentId,
  getCurrentPayment
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [pageId, setPageId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    lastName: "",
    firstName: "",
    zipcode: "",
    state: "",
    city: "",
    apartments: "",
    address: "",
    isDefault: "",
    privacy: ""
  });

  useEffect(() => {
    let param = window.location.pathname.lastIndexOf("/");
    getCurrentPayment(window.location.pathname.slice(param + 1));
    setPageId(window.location.pathname.slice(param + 1));
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    if (error) {
      elements.getElement("card").focus();
      return;
    }
    if (cardComplete) {
      setProcessing(true);
      let method;
      await stripe
        .createPaymentMethod({
          type: "card",
          card: elements.getElement(CardNumberElement)
        })
        .then(function(res) {
          method = res.paymentMethod;
        });

      const result = await axiosInstance.post(`api/stripe/intent`, {
        amount: +paymentId.payment.summ,
        method: method
      });
      await stripe
        .confirmCardPayment(result.data.client_secret, {
          payment_method: {
            card: elements.getElement(CardNumberElement)
          }
        })
        .then(function(result) {
          if (result.error) {
            console.log(error);
          } else {
            axiosInstance.post(`api/payment/${pageId}`, {
              status: result.paymentIntent.status,
              paymentInfo: {
                lastName: billingDetails.lastName,
                firstName: billingDetails.firstName,
                zipcode: billingDetails.zipcode,
                state: billingDetails.state,
                city: billingDetails.city,
                apartments: billingDetails.apartments,
                address: billingDetails.address,
                isDefault: billingDetails.isDefault
              }
            });
            setProcessing(false);
            setPaymentMethod(true);
          }
        });
    }
  };

  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);
    setBillingDetails({
      lastName: "",
      firstName: "",
      zipcode: "",
      state: "",
      city: "",
      apartments: "",
      address: "",
      isDefault: "",
      privacy: ""
    });
  };

  const handlerCard = event => {
    setError(event.error);
    setCardComplete(event.complete);
  };

  return paymentMethod || (paymentId && paymentId.status !== "Pending") ? (
    <div className="result">
      <p className="result-title" role="alert">
        Payment{" "}
        {paymentMethod || (paymentId && paymentId.status === "Payed")
          ? "was successful"
          : "was cancel. Host canceled reservation"}
      </p>
      <Link className={"result-link"} to={"/reservations"}>
        Return to reservations
      </Link>
    </div>
  ) : (
    <>
      <h1 className={"title"}>Payment Info</h1>
      <form className="Form" onSubmit={handleSubmit}>
        <div className="FormGroup">
          <Field
            label="First Name"
            id="first_name"
            type="text"
            placeholder="First Name"
            required
            autoComplete="first_name"
            value={billingDetails.firstName}
            onChange={e => {
              setBillingDetails({
                ...billingDetails,
                firstName: e.target.value
              });
            }}
          />
          <Field
            label="Last Name"
            id="last_name"
            type="text"
            placeholder="Last Name"
            required
            autoComplete="last_name"
            value={billingDetails.lastName}
            onChange={e => {
              setBillingDetails({
                ...billingDetails,
                lastName: e.target.value
              });
            }}
          />
        </div>
        <div className="FormGroup">
          <div className="FormRow">
            <label className="FormRowLabel">card number</label>
            <div className="FormRowInput">
              <CardNumberElement onChange={handlerCard} />
            </div>
          </div>
          <div className="FormRow">
            <label className="FormRowLabel">date</label>
            <div className="FormRowInput">
              <CardExpiryElement onChange={handlerCard} />
            </div>
          </div>
          <div className="FormRow">
            <label className="FormRowLabel">cvc</label>
            <div className="FormRowInput">
              <CardCvcElement onChange={handlerCard} />
            </div>
          </div>
        </div>
        <div className="FormGroup">
          <Field
            label="Address"
            id="address"
            type="textarea"
            placeholder="Enter Here"
            required
            autoComplete="address"
            value={billingDetails.address}
            onChange={e => {
              setBillingDetails({ ...billingDetails, address: e.target.value });
            }}
          />
        </div>
        <div className="FormGroup">
          <Field
            label="apartments"
            id="apartments"
            type="text"
            placeholder="Apartment, Suite etc."
            required
            autoComplete="apartments"
            value={billingDetails.apartments}
            onChange={e => {
              setBillingDetails({
                ...billingDetails,
                apartments: e.target.value
              });
            }}
          />
        </div>
        <div className="FormGroup city-state">
          <Field
            label="city"
            id="city"
            type="text"
            placeholder="City"
            required
            autoComplete="city"
            value={billingDetails.city}
            onChange={e => {
              setBillingDetails({ ...billingDetails, city: e.target.value });
            }}
          />
          <Field
            label="state"
            id="state"
            type="text"
            placeholder="State"
            required
            autoComplete="state"
            value={billingDetails.state}
            onChange={e => {
              setBillingDetails({ ...billingDetails, state: e.target.value });
            }}
          />
          <Field
            label="zip code"
            id="zip_code"
            type="text"
            placeholder="Zip Code"
            required
            autoComplete="zip_code"
            value={billingDetails.zipcode}
            onChange={e => {
              setBillingDetails({ ...billingDetails, zipcode: e.target.value });
            }}
          />
        </div>
        <div className="FormGroup checkbox">
          <Field
            label="Agree to privacy policy and terms conditions"
            id="privacy"
            type="checkbox"
            // placeholder="janedoe@gmail.com"
            required
            autoComplete="privacy"
            value={billingDetails.privacy}
            onChange={e => {
              setBillingDetails({
                ...billingDetails,
                privacy: e.target.checked
              });
            }}
          />
          <Field
            label="Make my default card"
            id="default_card"
            type="checkbox"
            // placeholder="janedoe@gmail.com"
            required
            autoComplete="default_card"
            value={billingDetails.isDefault}
            onChange={e => {
              setBillingDetails({
                ...billingDetails,
                isDefault: e.target.checked
              });
            }}
          />
        </div>
        {error && <ErrorMessage>{error.message}</ErrorMessage>}

        <div className={"payment-btns-card"}>
          <SubmitButton
            processing={processing}
            error={error}
            disabled={!stripe}
          >
            Submit
          </SubmitButton>
          <button
            className={"startBooking-content-review-btn"}
            onClick={() => {
              history.push("/reservations");
            }}
            color="secondary"
          >
            Another Booking
          </button>
        </div>
      </form>
    </>
  );
};

const mapStateToProps = state => ({
  paymentSuccess: state.booking.paymentSuccess,
  paymentId: state.booking.paymentId
});

const mapDispatchToProps = {
  sendPaymentData,
  getCurrentPayment
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
