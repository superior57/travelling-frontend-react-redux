import React from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import "./../styles.scss";

const FieldStyled = styled.input`
  width: 22% !important;
  height: 40px !important;
  left: 240px;
  top: 366px;
  border: 1px solid #cdcfdb;
  border-radius: 5px;
  text-align: center;
`;

export class ActivateCodeMobile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstCode: "",
      secondCode: "",
      thirdCode: "",
      fourthCode: "",
      loading: false,
      showAlert: false,
      alertMessage: "",
      alertDescription: "",
      alertType: "success",
      email: "",
      userType: ""
    };
  }

  handleSubmit = e => {
    const token = this.props.userData.email_confirm_token;
    const {
      firstCode,
      secondCode,
      thirdCode,
      fourthCode
      // userType
    } = this.state;
    e.preventDefault();
    if (
      firstCode.trim().length === 0 &&
      secondCode.trim().length === 0 &&
      thirdCode.trim().length === 0 &&
      fourthCode.trim().length === 0
    ) {
      this.setState({
        showAlert: true,
        alertType: "error",
        alertMessage: " Error",
        alertDescription: "Please Enter Code"
      });
      setTimeout(() => {
        this.setState({
          showAlert: false
        });
      }, 3000);
    } else {
      const param = {
        code: firstCode + secondCode + thirdCode + fourthCode
      };
      this.setState({ loading: true });
      this.props.activeLogin(param, { token });
    }
  };

  resendCode = () => {
    this.props.resendCode().then(res => {
      if (res.data.result.state) {
      } else {
        this.setState({
          showAlert: true,
          alertType: "error",
          alertMessage: "Verfication Error",
          alertDescription: res.data.result.message
        });
        setTimeout(() => {
          this.setState({ showAlert: false });
        }, 3000);
      }
    });
  };

  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    var inputArray = ["firstCode", "secondCode", "thirdCode", "fourthCode"];
    var index = inputArray.findIndex(_name => _name === name);
    if (value.length > 0 && value.length < 2) {
      index++;
      this.setValue(name, value, index);
    } else if (value.length > 1) {
      this.setState(
        {
          [name]: ""
        },
        () => {
          index++;
          this.setValue(name, value.charAt(value.length - 1), index);
        }
      );
    } else {
      index--;
      this.setValue(name, value, index);
    }
  };

  setValue = (name, value, index) => {
    this.setState(
      {
        [name]: value
      },
      () => {
        if (index === 0) this.firstCode.focus();
        else if (index === 1) this.secondCode.focus();
        else if (index === 2) this.thirdCode.focus();
        else if (index === 3) this.fourthCode.focus();
      }
    );
  };

  render() {
    const { userData } = this.props;

    return (
      <div className={"confirm mobile"}>
        <div>
          <div className="text-center">
            <h3>OTP Verification</h3>
            <span className="signIn-line" />

            <p className="note">
              We’ve sent a 4-digit confirmation code to&nbsp;
              <span>{userData && userData.email}</span>
            </p>
          </div>
          <div className="content-section">
            <div className="container user-container container-sm phone-container mt-0 text-center">
              <div className="sub-info">
                <div
                  className="input-box"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <FieldStyled
                    type="number"
                    className={this.state.firstCode !== "" ? "checked" : ""}
                    value={this.state.firstCode}
                    ref={input => {
                      this.firstCode = input;
                    }}
                    name="firstCode"
                    onChange={this.handleChange}
                  />

                  <FieldStyled
                    type="number"
                    className={this.state.secondCode !== "" ? "checked" : ""}
                    value={this.state.secondCode}
                    ref={input => {
                      this.secondCode = input;
                    }}
                    name="secondCode"
                    onChange={this.handleChange}
                  />

                  <FieldStyled
                    type="number"
                    className={this.state.thirdCode !== "" ? "checked" : ""}
                    value={this.state.thirdCode}
                    ref={input => {
                      this.thirdCode = input;
                    }}
                    name="thirdCode"
                    onChange={this.handleChange}
                  />

                  <FieldStyled
                    type="number"
                    className={this.state.fourthCode !== "" ? "checked" : ""}
                    value={this.state.fourthCode}
                    ref={input => {
                      this.fourthCode = input;
                    }}
                    name="fourthCode"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="btn-wrapper">
                  <button
                    className="btn-verify"
                    type="primary"
                    // loading={this.state.loading}
                    onClick={this.handleSubmit}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ActivateCodeMobile;
