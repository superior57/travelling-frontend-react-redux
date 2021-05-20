import React, { Component, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import DropdownProfile from "../../styledComp/DropDownProfile";
import SignInModal from "../../SignInBtn/SignInBtn";
import "./style.scss";
import history from "../../../history";
import { connect } from "react-redux";
import { logOut } from "../../../redux/actions/users.actions/auth.actions";
import axiosInstance from "../../../api";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  editSuccess,
  setValid
} from "../../../redux/actions/users.actions/profile.actions";
import Button from "@material-ui/core/Button";
import Close from "../../../assets/closeError.png";
function Menu({
  logOut,
  isAuthenticated,
  isAdmin,
  user,
  location: { pathname },
  userData,
  editSuccess,
  verifyModalForPhone,
  valid,
  setValid
}) {
  useEffect(() => {
    if (
      userData?.email &&
      !userData?.isPhoneValid &&
      pathname.slice(1).trim() !== "profile"
    ) {
      setValid({ valid: true, open: true });
      // setOpen(true);
    }
  }, [userData]);

  // useEffect(() => {
  //   if (!verifyModalForPhone) {
  //
  //     setValid(verifyModalForPhone);
  //   }
  // }, [verifyModalForPhone]);

  const onLogout = () => {
    logOut();
    editSuccess({
      user: {
        email: "",
        first_name: "",
        last_name: "",
        role: { role_type: "" },
        password: ""
      }
    });

    localStorage.removeItem("auth_token");
    localStorage.removeItem("token");
    localStorage.removeItem("role_type");
    localStorage.removeItem("role_id");
    localStorage.removeItem("avatar");
    setValid({ valid: false, open: false });
    // setOpen(false);
    history.push("/");
  };

  const handleClose = () => {
    setValid({ valid: false, open: false });
  };

  return (
    <div className="Menu-header-links">
      {valid?.valid && (
        <Dialog
          id="error-message"
          aria-labelledby="error-dialog-title"
          onClose={handleClose}
          open={valid.open}
        >
          <DialogTitle className={"close"} onClose={handleClose}>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <span className={"Menu-header-item verify-phone"}>
            <span>
              You did't verify phone number! Confirm it in your profile:
            </span>
            <span className={"desc"}>
              Click on "contacts" – Enter phone number – Confirm
            </span>
          </span>

          <div className={"link"}>
            <Link to={"/profile"}>My profile</Link>
          </div>
        </Dialog>
      )}
      <Link className="Menu-header-item" to="/contact">
        Contact Us
      </Link>
      {isAuthenticated && (
        <span className="Menu-header-item" onClick={onLogout}>
          {" "}
          Log Out
        </span>
      )}

      {isAdmin ? (
        <Link
          className="Menu-header-item"
          to={pathname === "/admin" ? "/admin/signup" : "/admin/signin"}
        >
          {pathname === "/admin" ? "Signup" : "Signin"}
        </Link>
      ) : isAuthenticated ? (
        <DropdownProfile />
      ) : (
        <SignInModal />
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    userData: state.profile.user,
    verifyModalForPhone: state.profile.verifyModalForPhone,
    valid: state.profile.valid
  };
};
export default connect(mapStateToProps, { logOut, editSuccess, setValid })(
  withRouter(Menu)
);
