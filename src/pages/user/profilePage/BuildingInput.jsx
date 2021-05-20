import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getUserSuccess,
  verifyModalPhoneRequest
} from "../../../redux/actions/users.actions/profile.actions";
import PhoneInput from "react-phone-number-input";

function BuildingInput({
  name,
  value,
  label,
  type,
  placeholder,
  userData,
  getUserSuccess,
  handlerProfile,
  handlerErrorCancel,
  resetFailPhoneNumber,
  verifyModalPhoneRequest,
  location,
  countryCode,
  code,
  identityUrl
}) {
  const [currentValue, setCurrentValue] = useState("");

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handlerPhoneChange = number => {
    resetFailPhoneNumber();
    verifyModalPhoneRequest(false);
    getUserSuccess({ ...userData, phoneNumber: number, idImage: identityUrl });
  };

  const handlerChange = ({ target }) => {
    const name = target.getAttribute("data-label");
    setCurrentValue(target.value);
    switch (name) {
      case "zipCode":
        getUserSuccess({
          ...userData,
          idImage: identityUrl,
          address: { ...userData.address, zip_code: target.value }
        });
        break;
      case "street":
        getUserSuccess({
          ...userData,
          idImage: identityUrl,
          address: { ...userData.address, [name]: target.value }
        });
        break;
      case "city_name":
        getUserSuccess({
          ...userData,
          idImage: identityUrl,
          city: { ...userData.city, [name]: target.value }
        });
        break;
      case "state":
        getUserSuccess({
          ...userData,
          idImage: identityUrl,
          city: { ...userData.city, [name]: target.value }
        });
        break;
      default:
        getUserSuccess({
          ...userData,
          [name]: target.value,
          idImage: identityUrl
        });
    }
    handlerErrorCancel && handlerErrorCancel();
  };

  return (
    <div className={"building-input"}>
      <label htmlFor="">{label}</label>
      {type === "textarea" ? (
        <textarea
          onChange={handlerChange}
          value={currentValue}
          placeholder={placeholder}
          className="form-input"
          data-label={name}
          rows="5"
          defaultValue={value}
        />
      ) : type === "email" || type === "phone" ? (
        <div className={`wrapper ${type}`}>
          {type === "phone" && (
            <>
              <PhoneInput
                placeholder={placeholder}
                type={type}
                className="form-input"
                autoComplete="off"
                onChange={handlerPhoneChange}
                label={name}
                value={currentValue}
                defaultCountry={location}
              />
              <button
                className={"btn"}
                onClick={handlerProfile}
                data-btn={type}
              >
                {"Verify phone"}
              </button>
            </>
          )}

          {type === "email" && (
            <input
              value={currentValue}
              placeholder={placeholder}
              type={type}
              className="form-input"
              data-label={name}
              disabled={true}
            />
          )}
        </div>
      ) : (
        <input
          onChange={handlerChange}
          value={currentValue}
          placeholder={placeholder}
          type={type}
          className="form-input"
          data-label={name}
        />
      )}
    </div>
  );
}
export default connect(
  state => ({
    userData: state.profile.user,
    identityUrl: state.profile.identityUrl
  }),
  {
    getUserSuccess,
    verifyModalPhoneRequest
  }
)(BuildingInput);
