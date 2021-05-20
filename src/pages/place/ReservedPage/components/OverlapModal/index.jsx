import React, { useState, useEffect } from "react";
import connect from "react-redux/es/connect/connect";
import { Link } from "react-router-dom";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import {
  setChangeReservation,
  setChangeOverlapReservation
} from "../../../../../redux/actions/booking.actions/booking.thunk";

import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, DialogContentText } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import moment from "moment";

const OverlapModal = (props) => { 
  const [openModal, setOpenModal] = useState(props.resolve);
  const [confirmation, setConfirmation] = useState(false);
  // const [currentId, setCurrentId] =  useState();
  const [status, setStatus] =  useState();
  
  let overlapList;
  if(props.overlapList) overlapList = props.overlapList.rows;


  useEffect(() => {
    setOpenModal(props.resolve);
  }, [props.resolve])
  
  
  
 
  const handlerStatus = event => {
    // setCurrentId(event.currentTarget.getAttribute("data-id"));
    setStatus(event.currentTarget.getAttribute("data-status"));
    setConfirmation(true);    
  };

  const handlerConfirmation = event => {
    let confirmAnswer = event.currentTarget.getAttribute("data-confirm");
    if(confirmAnswer==="yes") {
      
    switch (status) {     
      case "decline":
        props.setChangeOverlapReservation({ status: "Declined", id: +props.dataId });
        props.onClose();
        setOpenModal(false);
        setConfirmation(false);
        break;
      case "accept":
        overlapList.map(item=>{
          props.setChangeOverlapReservation({ status: "Declined", id: +item.id });
        });
        setTimeout(() => { props.setChangeOverlapReservation({ status: "Accepted", id: +props.dataId })}, 50);

        props.onClose();
        setOpenModal(false);
        setConfirmation(false);
        break;
      default:
        props.onClose();
        setOpenModal(false);     
        setConfirmation(false);   
    }
    } else {
      setConfirmation(false);
    }

  }

  const useStyles = makeStyles({
    table: {
      minWidth: 650
    }
  });  

  const classes = useStyles();   

  
  return (
    <Dialog className="overlap-modal"
      aria-labelledby="simple-dialog-title"
      id={"simple-dialog"}
      open={openModal}
      maxWidth={"lg"}
    >
      {!confirmation ? (<>
      <DialogTitle id="simple-dialog-title" className="overlap-modal__title">This reservation overlaps others: 
        <IconButton aria-label="close"
              color="inherit"
              onClick={()=>{
                props.onClose();
              }}>
                <CloseIcon fontSize="inherit" />
        </IconButton>
      </DialogTitle>

      <DialogContent className={"overlap-modal__content"}>     
        {overlapList&&(
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                
                <TableRow>
                  {/*<TableCell>id</TableCell>*/}
                  <TableCell>Venue Name</TableCell>
                  {overlapList[0]?.user?.id && (
                    <>
                      <TableCell align="right">Guest name</TableCell>
                      <TableCell align="right">Guest email</TableCell>
                    </>
                  )}
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Message</TableCell>
                  <TableCell align="right">People</TableCell>
                  <TableCell align="right">Activity</TableCell>
                  <TableCell align="right">Create At</TableCell>                  
                </TableRow>
              </TableHead>
              <TableBody>
                {overlapList.map(row => (
                  <TableRow key={row.id}>                  
                    <TableCell component="th" scope="row">
                      <Link to={`/reservations/${row.id}`}>
                        {row.reservations.name}
                      </Link>
                    </TableCell>

                    {row.user?.id && (
                      <>
                        <TableCell align="right">
                          {row.user.first_name + " " + row.user.last_name}
                        </TableCell>
                        <TableCell align="right">{row.user.email}</TableCell>
                      </>
                    )}
                    <TableCell align="right">
                      <p>
                        <span>From:</span>
                        {moment(row.startDate).format("MM/DD/YYYY hh:mm A")}
                      </p>
                      <p>
                        <span>To:</span>
                        {moment(row.endDate).format("MM/DD/YYYY hh:mm A")}
                      </p>
                    </TableCell>
                    <TableCell align="right">{row.message}</TableCell>
                    <TableCell align="right">{row.people}</TableCell>
                    <TableCell align="right">{row.event?.name}</TableCell>
                    <TableCell align="right">
                      {moment(row.createdAt).format("MM/DD/YYYY hh:mm A")}
                    </TableCell>                  


                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>

      <DialogActions>
        <Button
          color={"primary"}
          variant="contained"
          onClick={handlerStatus}
          data-status={"accept"}
        >
          accept reservation and decline others
        </Button>
        <Button
          color={"secondary"}
          variant="contained"
          onClick={handlerStatus}
          data-status={"decline"}
        >
          decline reservation
        </Button>
        
      </DialogActions>
      </>
      ):(<DialogContent className="overlap-modal__confirmation">
      <DialogTitle >Are you sure you want to {status==="accept" ? "accept this reservation and decline all overlapting reservations" : "decline this reservation"}?</DialogTitle>

      <DialogActions>
        <Button 
        color={"primary"}
        variant="contained"
        onClick={handlerConfirmation}
        data-confirm={"yes"}>
          Ok
        </Button>
        <Button 
        color={"default"}
        variant="contained"
        onClick={handlerConfirmation}
        data-confirm={"no"}>
          Cancel
        </Button>
      </DialogActions>
      </DialogContent>)}
    </Dialog>
  );
}

const mapStateToProps = state => ({
  overlapList: state.booking.overlapList
});

const mapDispatchToProps = {
  setChangeReservation,
  setChangeOverlapReservation
};
export default connect(mapStateToProps, mapDispatchToProps)(OverlapModal);
