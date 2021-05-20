import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import CheckoutForm from "./stripe/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { connect } from "react-redux";
import { getRModal } from "../../redux/actions/booking.actions/booking.actions";

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto"
    }
  ]
};

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

function Confirm({ openRModel, getRModal }) {
  const handleClose = () => {
    getRModal(false);
  };

  return (
    <Dialog
      open={openRModel}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Please, input your payment card data"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-description">
          <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
            <CheckoutForm />
          </Elements>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

const mapStateToProps = state => ({
  openRModel: state.booking.openRModel
});

const mapDispatchToProps = {
  getRModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
