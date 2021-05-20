import React from "react";
import { connect } from "react-redux";
import {
  checkAuth,
  activeLogin
} from "../../../redux/actions/users.actions/auth.thunk";
// import history from '../../history';
import {
  // Field,
  reduxForm
} from "redux-form";
// import Title from '../../../components/styledComp/Title';

import iconCheck from "../../../assets/icons/Check.png";

// import { Button } from 'reactstrap';
// import { Layout, Input, Alert, Icon } from 'antd';
import styled from "styled-components";
// import Header from '../../../components/Header';
import imageSignUp from "../../../assets/sign_up_image.jpg";

import "./styles.scss";

import {
  Form,
  // FormGroup,
  // Label,
  Col,
  Row
  // Container
} from "reactstrap";
import { ActivateCodeMobile } from "./activateCodeMobile";

const ContainerMy = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const ColLeft = styled.div`
  width: 50%;
  height: 100%;
  padding: 0 8%;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

const ColRight = styled.div`
  width: 50%;
	height: 100%;
	background-image: url('${imageSignUp}');
  background-size: cover;
  @media screen and (max-width: 1000px) {
    display: none;
}
`;

const LineBlue = styled.div`
  position: absolute;
  top: 80px;
  left: 0;
  width: 30%;
  height: 3px;
  background-color: #04d2ff;
`;

const ButtonConfirm = styled.button`
  width: 208px;
  height: 50px;
  left: 240px;
  top: 678px;
  color: #fff;
  margin-top: 50px;

  background: #04d2ff;
  border-radius: 5px;
  text-align: center;
`;

// const SignUpImg = styled(Col)`
//   background-image: url('${imageSignUp}');
//   background-size: cover;
//   width: 100%;
//   height: 100vh;
// `;

const FieldStyled = styled.input`
  width: 22% !important;
  height: 40px !important;
  left: 240px;
  top: 366px;
  border: 1px solid #cdcfdb;
  border-radius: 5px;
  text-align: center;
`;

const IconCh = styled.div`
  width: 35px!important;
  height: 35px!important;
  background-image: url('${iconCheck}');
  background-size: cover;
  margin-top: 5px;
  margin-right: 10px;
`;

const FooterCopyright = styled.div`
  position: absolute;
  bottom: 60px;
  left: 0;
  padding-bottom: 20px;
  color: #cdcfdb;
  font-size: 18px;
  padding: 0 8%;
`;

export class ActivateCode extends React.PureComponent {
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

  componentDidMount() {
    this.props.checkAuth();
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
    const { userData, loading, error, checkAuth, activeLogin } = this.props;

    return (
      <>
        <ActivateCodeMobile
          checkAuth={checkAuth}
          activeLogin={activeLogin}
          userData={userData}
          loading={loading}
          error={error}
        />

        <div className={"confirm desktop"}>
          <ContainerMy>
            <LineBlue></LineBlue>

            <ColLeft>
              <Row>
                <Col xs="12">
                  {/* <Header></Header> */}
                  <Form
                    //  onSubmit={this.props.handleSubmit(this.handleSubmit)}
                    className="ui form error"
                    style={{ marginTop: "170px" }}
                  >
                    <div>
                      <div
                        className="text-center"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "flex-start"
                        }}
                      >
                        <IconCh></IconCh>
                        <h3
                          style={{
                            fontSize: "35px",
                            fontWeight: "bold",
                            marginBottom: "50px"
                          }}
                        >
                          Confirm your e-mail{" "}
                        </h3>
                      </div>
                      <div className="content-section">
                        <div
                          className="container user-container container-sm phone-container mt-0 text-center"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-start"
                          }}
                        >
                          <div
                            className="sub-info"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "flex-start"
                            }}
                          >
                            <p className="note">
                              We’ve sent a 4-digit confirmation code to&nbsp;
                              <span
                                style={{
                                  color: "#04D2FF",
                                  textDecoration: "underline"
                                }}
                              >
                                {userData && userData.email}
                              </span>
                            </p>

                            <div
                              className="input-box"
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: "400px"
                              }}
                            >
                              <FieldStyled
                                type="number"
                                className={
                                  this.state.firstCode !== "" ? "checked" : ""
                                }
                                value={this.state.firstCode}
                                ref={input => {
                                  this.firstCode = input;
                                }}
                                name="firstCode"
                                onChange={this.handleChange}
                              />

                              <FieldStyled
                                type="number"
                                className={
                                  this.state.secondCode !== "" ? "checked" : ""
                                }
                                value={this.state.secondCode}
                                ref={input => {
                                  this.secondCode = input;
                                }}
                                name="secondCode"
                                onChange={this.handleChange}
                              />

                              <FieldStyled
                                type="number"
                                className={
                                  this.state.thirdCode !== "" ? "checked" : ""
                                }
                                value={this.state.thirdCode}
                                ref={input => {
                                  this.thirdCode = input;
                                }}
                                name="thirdCode"
                                onChange={this.handleChange}
                              />

                              <FieldStyled
                                type="number"
                                className={
                                  this.state.fourthCode !== "" ? "checked" : ""
                                }
                                value={this.state.fourthCode}
                                ref={input => {
                                  this.fourthCode = input;
                                }}
                                name="fourthCode"
                                onChange={this.handleChange}
                              />
                            </div>
                            <div className="btn-wrapper">
                              <ButtonConfirm
                                className="btn-verify"
                                type="primary"
                                // loading={this.state.loading}
                                onClick={this.handleSubmit}
                              >
                                Confirm
                              </ButtonConfirm>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                </Col>
              </Row>
              <FooterCopyright>
                © Vent Inc. All rights reserved{" "}
              </FooterCopyright>
            </ColLeft>
            <ColRight></ColRight>
          </ContainerMy>
        </div>
      </>
    );
  }
}

const formWrapped = reduxForm({
  form: "ActivateCode"
})(ActivateCode);

export default connect(
  state => ({
    userData: state.auth.user,
    loading: state.auth.loading,
    error: state.auth.error
  }),
  {
    checkAuth,
    activeLogin
  }
)(formWrapped);
