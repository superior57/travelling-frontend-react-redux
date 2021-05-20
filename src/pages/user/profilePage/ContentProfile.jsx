import React, { useEffect, useState } from "react";
import { Field, reduxForm } from "redux-form";
import BuildingInput from "./BuildingInput";
import { ProfilePage } from "./index";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import {
  editUploadId,
  checkPhoneCodeRequest
} from "../../../redux/actions/users.actions/profile.thunk";
import {
  checkPhoneCodeFail,
  setUrl,
  verifyModalPhoneRequest,
  verifyPhoneSuccess
} from "../../../redux/actions/users.actions/profile.actions";
import AuthCode from "react-auth-code-input";
import useOnclickOutside from "react-cool-onclickoutside";
import { getLocation } from "../../../redux/actions/places.actions/places.thunk";
import { Dialog } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";

function ProfileContent({
  active,
  handlerProfile,
  userData,
  editUploadId,
  handlerErrorCancel,
  failPhoneNumber,
  resetFailPhoneNumber,
  checkPhoneFail,
  checkPhoneCodeRequest,
  checkPhoneCodeFail,
  verifyModalForPhone,
  setUrl,
  getLocation,
  location,
  identityUrl,
  dataSaved,
  verifyForPhoneSuccess,
  verifyPhoneSuccess
}) {
  const [passport, setPassport] = useState("");

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    setPassport(userData?.idImage);
    setUrl(userData?.idImage);
  }, [userData]);

  const handlerVerify = val => {
    checkPhoneCodeFail(false);
    if (val.length === 4) {
      checkPhoneCodeRequest(val);
    }
  };

  const ref = useOnclickOutside(() => {
    if (checkPhoneFail) {
      checkPhoneCodeFail(false);
    }
  });

  const handleClose = () => {
    verifyPhoneSuccess(false);
  };

  const handlerSetPassport = acceptedFiles => {
    let passport = acceptedFiles[0];
    if (acceptedFiles) {
      setUrl(URL.createObjectURL(passport));
      setPassport(passport);
      const formData = new FormData();
      acceptedFiles.forEach((file, index) => {
        formData.append("images", file);
        editUploadId(formData);
      });
    }
  };
  return (
    <>
      {active === "profile" && (
        <div>
          <div className={"name"}>
            <BuildingInput
              placeholder={"first name"}
              label={"First Name*"}
              type="text"
              userData={userData}
              value={userData?.first_name}
              name="first_name"
            />
            <BuildingInput
              placeholder={"last name"}
              label={"Last Name*"}
              type="text"
              userData={userData}
              value={userData?.last_name}
              name="last_name"
            />
            <BuildingInput
              placeholder={"introduce youself"}
              label={"Description"}
              type="textarea"
              userData={userData}
              value={userData?.description}
              name="description"
            />
          </div>
          <div className={"building-input"}>
            <button
              className={"btn"}
              onClick={handlerProfile}
              data-btn={"profile"}
            >
              Save profile
            </button>
          </div>
        </div>
      )}
      {active === "contact" && (
        <div>
          <div className={"name"}>
            <BuildingInput
              handlerProfile={handlerProfile}
              placeholder={"input your email"}
              label={"Email*"}
              type="email"
              userData={userData}
              value={userData?.email}
              name="email"
            />
            {failPhoneNumber && (
              <span style={{ color: "red" }}>Incorrect phone number</span>
            )}
            <BuildingInput
              location={location.country_code}
              resetFailPhoneNumber={resetFailPhoneNumber}
              handlerProfile={handlerProfile}
              placeholder={"+countryCode 000 00 00 "}
              label={"Phone*"}
              type="phone"
              userData={userData}
              countryCode={userData?.countryCode}
              value={userData?.phoneNumber}
              name="phoneNumber"
            />
            {verifyModalForPhone && (
              <div className={"confirm_phone"}>
                <p>Please, confirm your phone code</p>
                <AuthCode
                  onChange={handlerVerify}
                  characters={4}
                  containerStyle={{
                    padding: "5px"
                  }}
                  inputStyle={{
                    width: "20px",
                    height: "20px",
                    padding: "1px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    textAlign: "center",
                    marginRight: "12px",
                    border: "2px solid #078089",
                    textTransform: "uppercase",
                    outline: "none"
                  }}
                />
              </div>
            )}
            {checkPhoneFail && (
              <p style={{ color: "red" }} ref={ref}>
                The code is incorrect. Please check or verify phone again
              </p>
            )}
            {verifyForPhoneSuccess && (
              <Dialog
                open={verifyForPhoneSuccess}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Your phone number successfully verified!
                  </DialogContentText>
                </DialogContent>
                <Button onClick={handleClose} color="primary">
                  ok
                </Button>
              </Dialog>
            )}
          </div>

          <div className={"upload-id"}>
            <div className={"save-photo"}>
              <Dropzone onDrop={handlerSetPassport} accept="image/*, video/*">
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <label htmlFor="save-passport">
                      {passport ? "Uploaded" : "Upload Government ID"}
                    </label>
                  </div>
                )}
              </Dropzone>
            </div>
            {(identityUrl || userData?.idImage) && (
              <div className={"uploaded-proof-image"}>
                <img src={identityUrl || userData?.idImage} alt="" />
              </div>
            )}
          </div>
          <div className={"address"}>
            <h1>Address</h1>
            <BuildingInput
              handlerErrorCancel={handlerErrorCancel}
              placeholder={"input your street"}
              value={userData?.address?.street}
              label={"Address"}
              type="text"
              userData={userData}
              name="street"
            />
            <BuildingInput
              handlerErrorCancel={handlerErrorCancel}
              placeholder={"input your city"}
              value={userData?.city?.city_name}
              label={"City"}
              type="text"
              userData={userData}
              name="city_name"
            />
            <BuildingInput
              handlerErrorCancel={handlerErrorCancel}
              placeholder={"input your state"}
              value={userData?.city?.state}
              label={"State"}
              type="text"
              userData={userData}
              name="state"
            />
            <BuildingInput
              handlerErrorCancel={handlerErrorCancel}
              placeholder={"input your zipcode"}
              value={userData?.address?.zip_code}
              label={"Zipcode"}
              type="text"
              userData={userData}
              name="zipCode"
            />
            <div className={"building-input"}>
              <button
                className={"btn"}
                onClick={handlerProfile}
                data-btn={"contact"}
              >
                {dataSaved ? "saved" : "Save contacts"}
              </button>
            </div>
          </div>
        </div>
      )}
      {active === "security" && (
        <div>
          <div className={"password"}>
            <BuildingInput
              placeholder={"input your password"}
              label={"Current password"}
              type="password"
              userData={userData}
              name="currentPassword"
            />
            <BuildingInput
              placeholder={"input your new password"}
              label={"New password"}
              type="password"
              userData={userData}
              name="newPassword"
            />
          </div>
          <div className={"building-input"}>
            <button
              className={"btn"}
              onClick={handlerProfile}
              data-btn={"password"}
            >
              Change password
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const formWrapped = reduxForm({
  form: "ProfilePage"
  // initialValues: {
  //   firstName:
  // },
})(ProfileContent);
const mapStateToProps = state => {
  return {
    uploadId: state.profile.uploadId,
    verifyModalForPhone: state.profile.verifyModalForPhone,
    checkPhoneSuccess: state.profile.checkPhoneSuccess,
    checkPhoneFail: state.profile.checkPhoneFail,
    location: state.place.location,

    identityUrl: state.profile.identityUrl,
    userData: state.profile.user,
    verifyForPhoneSuccess: state.profile.verifyForPhoneSuccess
  };
};

export default connect(mapStateToProps, {
  editUploadId,
  verifyModalPhoneRequest,
  checkPhoneCodeRequest,
  checkPhoneCodeFail,
  setUrl,
  getLocation,
  verifyPhoneSuccess
})(formWrapped);
