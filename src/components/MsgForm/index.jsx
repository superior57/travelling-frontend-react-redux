import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";

import connect from "react-redux/es/connect/connect";
import history from "../../history";

import { confirmBookingSuccess } from "../../redux/actions/booking.actions/booking.actions";

function MsgDialog({ resolve, confirmBookingSuccess, dataReserved }) {  
  const handleMainPage = () => {
    history.push("/");
    confirmBookingSuccess(false);
  };
  const handleReserve = () => {
    dataReserved &&
      history.push(`/reservations/${dataReserved.data.reservationId}`);
    confirmBookingSuccess(false);
  };
  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      id={"simple-dialog"}
      open={resolve}
    >
      <DialogTitle id="simple-dialog-title">successfully!</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Your request was completed successfully
        </DialogContentText>
      </DialogContent>

      <DialogActions id="alert-dialog-btn">
        <Button onClick={handleMainPage} color="primary">
          Back in Main
        </Button>
        <Button onClick={handleReserve} color="primary">
          My reservations
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapDispatchToProps = {
  confirmBookingSuccess
};
const mapStateToProps = state => ({
  dataReserved: state.booking.dataReserved
});

export default connect(mapStateToProps, mapDispatchToProps)(MsgDialog);
