import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";

import history from "../../../../../history";

export const MsgDialog = resolve => {
  const handleMainPage = () => {
    history.push("/");
  };
  const handleReserve = () => {
    history.push("/reservations");
  };
  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      id={"simple-dialog"}
      open={resolve.resolve}
    >
      <DialogTitle id="simple-dialog-title">successfully!</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Your rewiew was added successfully
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
};
