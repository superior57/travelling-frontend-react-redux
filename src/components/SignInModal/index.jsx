import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createLogin } from "../../redux/actions/users.actions/auth.thunk";
import { Field, reduxForm } from "redux-form";
import styled from "styled-components";
import fullLogo from "../../assets/Full_Logo.png";

import VenueButton from "../styledComp/VenueButton";

import Logo from "../../assets/logo.png";

import "./style.scss";

const mapStateToProps = state => ({
  loading: state.auth.loginLoading
});

const ModalStyled = styled(Modal)`
  > div {
    padding: 15px 50px 40px;
    height: 500px;
  }
`;

const ModalHeaderStyled = styled(ModalHeader)`
  border: none;
  padding: 0;

  > button {
    position: absolute;
    right: 15px;
    top: 10px;
    transform: scale(1.5);
    margin: 0 !important;
    padding: 0 !important;
  }
`;

const ModalBodyStyled = styled(ModalBody)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Inter", sans-serif;
  padding: 0px;
`;

const LogoStyled = styled.img`
  width: 35px;
  height: 35px;
`;

const HeaderStyled = styled.div`
  display: flex;
  justify-content: center;

  > h1 {
    font-weight: bold;
    margin-left: 3%;
  }
`;

const FormStyled = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const VenueButtonStyled = styled.button`
  width: 223px;
  position: relative;
  height: 47px;
  background-color: #078089;
  border-radius: 25px;
  border: none;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  left: 50%;
  transform: translate(-50%, 0);
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
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  return (
    <div className={className}>
      <input
        className="sing-in-input"
        placeholder={placeholder + "*"}
        className="py-3"
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

// declaring a FunctionalComponent
const SignInModal = props => {
  const loginHandler = async formValues => {
    await props.createLogin(formValues);
  };

  return (
    <ModalStyled
      className="modal"
      isOpen={props.modal}
      toggle={props.toggle}
      centered
    >
      <ModalHeaderStyled
        className="modal-header"
        toggle={props.toggle}
      ></ModalHeaderStyled>
      <ModalBodyStyled>
        <FormStyled
          onSubmit={props.handleSubmit(loginHandler)}
          className="ui form error"
        >
          <HeaderStyled>
            <div className="login-logo-wrapper">
              <img className="fullLogo" src={fullLogo} alt="Full Logo" />;
            </div>
          </HeaderStyled>
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
          <Row>
            <Col sm="12">
              <VenueButtonStyled>Submit</VenueButtonStyled>
            </Col>
          </Row>
        </FormStyled>
      </ModalBodyStyled>
      <ModalFooterStyled>
        <p className="login-signUp">
          Don’t have an account?{" "}
          <Link to="/signup" className="login-another-pages">
            Sign Up
          </Link>{" "}
        </p>
        <Link className="login-another-pages" to="/check-email">
          Forgot Password?
        </Link>
      </ModalFooterStyled>
    </ModalStyled>
  );
};

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
})(SignInModal);

export default connect(mapStateToProps, { createLogin })(formWrapped);
