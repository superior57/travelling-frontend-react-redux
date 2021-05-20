import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createLogin } from "../../../redux/actions/users.actions/auth.thunk";
import styled from "styled-components";
import FullLogo from "../../../components/Header/FullLogo";
import fullLogo from "../../../assets/signin-logo.png";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col
} from "reactstrap";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import "./index.scss";
//import fullLogo from "../../../assets/Full_Logo.png";

const mapStateToProps = state => ({
  loading: state.auth.loginLoading
});

const LogoStyled = styled.img`
  width: 35px;
  height: 35px;
`;

const HeaderStyled = styled.div`
  display: flex;
  justify-content: center;
  width: 95%;
  margin: 15px auto 0;
  padding-bottom: 10px;

  > h1 {
    font-weight: bold;
    margin-left: 3%;
  }
`;

const FormStyled = styled.form`
  // width: 620px;
  // min-height: 524px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const VenueButtonStyled = styled.button`
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  margin: 5px auto;
  border: none;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  width: 277px;
  height: 45px;
  border-radius: 5px;
  background-color: #0fc3c5;
  font-size: 18px;
  line-height: 24px;
  text-align: center;

  // @media (max-width: 611px) {
  //   width: 277px;
  // }
`;

const ModalFooterStyled = styled(ModalFooter)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  padding: 35px 0px 0px;

  > a {
    color: #04d2ff !important;
  }
`;

const renderInput = ({ input, meta, type, placeholder }) => {
  const className = `signIn-field ${meta.error && meta.touched ? "error" : ""}`;
  return (
    <div className={className}>
      <input
        className="sing-in-input"
        placeholder={placeholder + "*"}
        className="py-3, sign-in-input-fiel"
        {...input}
        autoComplete="on"
        type={type}
      />
      {renderError(meta)}
    </div>
  );
};

const renderError = ({ error, touched }) => {
  if (touched && error) {
    return (
      <div className="ui error message">
        <div className="header">{error}</div>
      </div>
    );
  }
};

class SignIn extends React.PureComponent {
  loginHandler = async formValues => {
    await this.props.createLogin(formValues);
  };

  render() {
    return (
      <div className="signIn">
        {/* <div className="wrapper-container top_header"> */}
        <div className="wrapper">
          <Header />
        </div>
        {/* </div> */}
        <main>
          <div className="form-wrapper">
            <FormStyled
              onSubmit={this.props.handleSubmit(this.loginHandler)}
              className="ui form error"
            >
              {/*<HeaderStyled>*/}
              {/*  <div className="login-logo-wrapper">*/}
              {/*    <img className="fullLogo" src={fullLogo} alt="Full Logo" />*/}
              {/*  </div>*/}
              {/*</HeaderStyled>*/}

              <h1 className="login-h1 ">SIGN IN</h1>
              <span className={"signIn-line"} />
              <p className={"signIn-description"}>
                Enter your email address and password to access account.
              </p>

              <Field
                placeholder="Email"
                name="email"
                type="email"
                component={renderInput}
                label="E-mail"
              />
              <Field
                placeholder="Password"
                name="password"
                type="password"
                component={renderInput}
                label="Password"
              />
              <Row className="sign-in-row-m0">
                <div className={"wrapper-remember"}>
                  <Field
                    name="rememberMeCheckbox"
                    type="checkbox"
                    component={renderInput}
                  />
                  <label>Remember me</label>
                </div>

                <Link className="login-another-pages" to="/check-email">
                  Forgot Password?
                </Link>
              </Row>
              <Row className={"wrapper-signIn"}>
                <Col>
                  <button className={""}>SIGN IN</button>
                </Col>
              </Row>
              <div className="signIn__form-footer">
                <p className="login-signIn">
                  <span className="another-pages-text">
                    Don’t have an account?
                  </span>{" "}
                  <Link to="/signup" className="login-another-pages">
                    Register
                  </Link>{" "}
                </p>
              </div>
            </FormStyled>
          </div>
        </main>
        <div className="wrapper-container">
          <Footer />
        </div>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.email) {
    errors.email = "You must enter an email";
  }
  if (!formValues.password) {
    errors.password = "You must enter a password";
  }
  return errors;
};

const formWrapped = reduxForm({
  form: "Login",
  validate
})(SignIn);

export default connect(mapStateToProps, { createLogin })(formWrapped);
