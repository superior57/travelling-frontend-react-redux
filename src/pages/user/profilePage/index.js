import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { checkAuth } from "../../../redux/actions/users.actions/auth.thunk";
import {
  getUser,
  editUser,
  deleteUser,
  editAvatar
} from "../../../redux/actions/users.actions/profile.thunk";

import Mark from "./assets/Vector.png";
import MarkGreen from "../../../assets/Vector.svg";

import defaultPhoto from "./assets/defaultPhoto.png";
import Proof from "./assets/proof.png";

import GreenProof from "../../../assets/proof.svg";

import ProfileContent from "./ContentProfile";
import Dropzone from "react-dropzone";
import "./styles.scss";
import trim from "validator/es/lib/trim";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "../../../components/Avatar";
import arrowDown from "../../../assets/icons/arrow_down.png";
import { Link } from "react-router-dom";
import history from "../../../history";
import Hamburger from "./Hamburger";
import TabletSideBar from "./TabletSideBar";
import { parsePhoneNumber, isValidPhoneNumber } from "react-phone-number-input";
import { verifyModalPhoneRequest } from "../../../redux/actions/users.actions/profile.actions";
import Header from "../../../components/Header";
import { isAuthenticated } from "../../../redux/selectors/auth/auth.select";
import moment from "../../place/bookingPage";
import Chat from "./Chat";

export class ProfilePage extends React.PureComponent {
  componentDidMount() {
    this.props.getUser();
    this.props.checkAuth();
    this.setState({ dataSaved: false });
  }

  state = {
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    activeBtn: "profile",
    photo: "",
    error: false,
    errorParentField: "",
    isLoading: false,
    failPhoneNumber: false,
    checkPhoneVerify: undefined,
    checkGoverment: undefined,
    dataSaved: false
  };
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  handlerProfile = ({ target }) => {
    const {
      address,
      city,
      first_name,
      last_name,
      email,
      newPassword,
      phoneNumber,
      description,
      currentPassword,
      countryCode,
      user
    } = this.props.userData;

    switch (target.getAttribute("data-btn")) {
      case "password":
        this.props.editUser({
          newPassword,
          currentPassword,
          address: {},
          city: {}
        });
        break;
      case "phone":
        let number = "";
        let code = "";
        let nationalNumber = "";

        if (phoneNumber) {
          number = parsePhoneNumber(phoneNumber);
        }

        if (number) {
          code = "+" + number.countryCallingCode;
          nationalNumber = number.nationalNumber;
          if (isValidPhoneNumber(number.number)) {
            this.props.editUser(
              {
                countryCode: code,
                phoneNumber: nationalNumber,
                address: {},
                city: {}
              },
              true
            );
          } else {
            this.props.verifyModalPhoneRequest(false);
            this.setState({
              failPhoneNumber: true
            });
          }
        } else {
          this.props.verifyModalPhoneRequest(false);
          this.setState({
            failPhoneNumber: true
          });
        }
        break;
      default:
        if (address?.zip_code?.trim() && !address?.street?.trim()) {
          this.setState({
            error: "ZIPCODE",
            errorParentField: "STREET"
          });
        } else if (city?.state?.trim() && !city?.city_name?.trim()) {
          this.setState({
            error: "STATE",
            errorParentField: "CITY NAME"
          });
        } else {
          this.setState({ dataSaved: true });
          this.props.editUser({
            first_name,
            last_name,
            description,
            address: {
              street: address?.street,
              zip_code: address?.zip_code
            },
            city: {
              city_name: city?.city_name,
              state: city?.state
            }
          });
        }
    }
  };
  handlerChange = ({ target }) => {
    this.setState({ activeBtn: target.getAttribute("data-btn") });
  };

  handlerLoader = flag => {
    this.setState({ isLoading: flag });
  };

  resetFailPhoneNumber = () => {
    this.setState({ failPhoneNumber: false });
  };

  handlerChangePhoto = acceptedFiles => {
    const avatar = acceptedFiles[0];
    if (avatar) {
      const formData = new FormData();
      acceptedFiles.forEach((file, index) => {
        formData.append("images", file);
        this.props.editAvatar(formData, this.handlerLoader);
      });
    }
  };

  handlerErrorCancel = e => {
    this.setState({
      error: false
    });
  };
  onDelete = async () => {};
  render() {
    const { userData, identityUrl, user } = this.props;
    const { checkPhoneVerify, checkGoverment } = this.state;

    this.setState({
      checkPhoneVerify: userData.isPhoneValid,
      checkGoverment: identityUrl || userData.idImage
    });

    localStorage.setItem("avatar", this.props?.userData?.image || "");
    return (
      <>
        <div className="wrapper">
          <Header isAuthenticated={isAuthenticated} find={true} />
        </div>
        <div className={"profile-page wrapper-hamburger"}>
          <h1 className="page-name">My profile</h1>
          <div className={"menu-link-mobile-hamburger"}>
            <Hamburger user={this.props.user} />
          </div>
        </div>
        <div className={"wrapper-profilePage"}>
          <aside className={"menu-link"}>
            {this.props.user?.role.role_type === "Host" && (
              <>
                <Link className={"profilePage-link"} to="/buildings">
                  Add Venue
                </Link>
                <Link className={"profilePage-link"} to="/venue-listings">
                  Venue listings
                </Link>
              </>
            )}
            <Link className={"profilePage-link"} to="/reservations">
              Reservations
            </Link>
            {this.props.user?.role.role_type === "Host" && (
              <Link className={"profilePage-link"} to="/balance-history">
                My balance
              </Link>
            )}
            {user && (
              <Link className={"profilePage-link"} to={`/user/${user.id}`}>
                Reviews
              </Link>
            )}
            <Link className={"profilePage-link"} to="/referral">
              Referral program
            </Link>
            <Link className={"profilePage-link"} to="/messenger">
              Messenger
            </Link>
          </aside>
          <div className={`container user-profile`}>
            <TabletSideBar
              handlerChangePhoto={this.handlerChangePhoto}
              isLoading={this.state.isLoading}
              newAvatar={this.props?.newAvatar}
            />

            <aside className={"side-bar"}>
              {this.state.isLoading ? (
                <CircularProgress className={"loader"} />
              ) : (
                <div className={"wrapper-img"}>
                  <img
                    src={
                      this.props?.newAvatar ||
                      localStorage.getItem("avatar") ||
                      defaultPhoto
                    }
                    alt=""
                  />
                </div>
              )}
              <div className={"change-photo"}>
                <Dropzone
                  onDrop={this.handlerChangePhoto}
                  accept="image/*, video/*"
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <label htmlFor="save-photo">Choose photo</label>
                    </div>
                  )}
                </Dropzone>
              </div>
              <div className={"wrapper-proof"}>
                <div className={"logo-proof"}>
                  <img
                    src={
                      checkPhoneVerify && checkGoverment ? GreenProof : Proof
                    }
                    alt=""
                  />
                </div>
                <h2 className={"title-proof"}>Proof of identity</h2>
                <h2 className={"desc-proof"}>
                  The "Identity confirmed" icon will show the community members
                  that it is really you.
                </h2>
                <div className={"confirmed-id"}>
                  <label className={"save-photo"} htmlFor="">
                    <a
                      target="_blank"
                      className={"link"}
                      href={identityUrl || userData?.idImage}
                    >
                      {"Get an icon"}
                    </a>
                  </label>
                </div>
              </div>
              <div className={"wrapper-confirmed"}>
                <h1 className={"confirmed-title"}>User confirmed</h1>
                <ul>
                  <li>
                    <img src={MarkGreen} alt="" />
                    <span>Email address</span>
                  </li>

                  <li>
                    <img
                      src={this.state.checkPhoneVerify ? MarkGreen : Mark}
                      alt=""
                    />
                    <span>Phone number</span>
                  </li>

                  <li>
                    <img
                      src={this.state.checkGoverment ? MarkGreen : Mark}
                      alt=""
                    />
                    <span>Government ID</span>
                  </li>
                </ul>
              </div>
            </aside>
            <div className={"content-user-profile"}>
              <div className={"switchers-profile"}>
                <button
                  type="button"
                  data-btn={"profile"}
                  onClick={this.handlerChange}
                  className={`user-places__btn ${this.state.activeBtn ===
                    "profile" && "active"}`}
                >
                  Profile
                </button>
                <button
                  data-btn={"contact"}
                  type="button"
                  onClick={this.handlerChange}
                  className={`user-places__btn ${this.state.activeBtn ===
                    "contact" && "active"}`}
                >
                  Contacts
                </button>
                <button
                  data-btn={"security"}
                  type="button"
                  onClick={this.handlerChange}
                  className={`user-places__btn ${this.state.activeBtn ===
                    "security" && "active"}`}
                >
                  Security
                </button>
              </div>
              <ProfileContent
                checkProof={this.checkProof}
                resetFailPhoneNumber={this.resetFailPhoneNumber}
                failPhoneNumber={this.state.failPhoneNumber}
                handlerErrorCancel={this.handlerErrorCancel}
                userData={this.props.userData}
                active={this.state.activeBtn}
                handlerProfile={this.handlerProfile}
                dataSaved={this.state.dataSaved}
              />
              {this.state.error && (
                <p className={"profile-error"}>
                  {" "}
                  {`The ${this.state.error} can't save without ${this.state.errorParentField}`}
                </p>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default connect(
  state => ({
    userData: state.profile.user,
    loading: state.auth.loading,
    error: state.auth.error,
    newAvatar: state.profile.avatar,
    errorProfile: state.profile.errorProfile,
    user: state.auth.user,
    checkPhoneSuccess: state.profile.checkPhoneSuccess,
    uploadId: state.profile.uploadId,

    identityUrl: state.profile.identityUrl
  }),
  {
    checkAuth,
    getUser,
    editUser,
    deleteUser,
    editAvatar,
    verifyModalPhoneRequest
  }
)(ProfilePage);
