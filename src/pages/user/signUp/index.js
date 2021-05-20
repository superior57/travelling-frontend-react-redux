import React from "react";
import { connect } from "react-redux";
// import { Link } from 'react-router-dom';
import { createSignup } from "../../../redux/actions/users.actions/auth.thunk";
import { Route, Switch, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import SignInModal from "../../../components/SignInModal";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumber } from "react-phone-number-input";

import "react-phone-number-input/style.css";

import { Field, reduxForm } from "redux-form";
import {
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Row,
  // Container,
  Button,
  Spinner
} from "reactstrap";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import styled from "styled-components";
import "./index.scss";

import VenueButton from "../../../components/styledComp/VenueButton";

import Arrow from "../../../assets/icons/arrow.png";
import imageSignUp from "../../../assets/sign_up_image.jpg";
import arrowBack from "../../../assets/icons/arrow_back.png";
import arrowNext from "../../../assets/icons/arrow_next.png";
import fullLogo from "../../../assets/Full_Logo.png";

const ContainerMy = styled.div`
  width: 100%;
  height: 1050px;
  display: flex;
  flex-direction: row;
  /* @media screen and (max-height: 1050px) {
    height: 100vh;
  } */
`;

const ColLeft = styled.div`
  width: 50%;
  height: 100%;
  padding: 0 8%;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const ColRight = styled.div`
  width: 50%;
	height: 100%;
	background-image: url('${imageSignUp}');
  background-size: cover;

  @media screen and (max-width: 800px) {
    display: none;
}
`;

const HederAccount = styled.h2`
  font-weight: 800;
  font-size: 36px;
  line-height: 44px;
  margin-bottom: 50px;
`;

const NextButton = styled(VenueButton)`
  background: #04d2ff;
  padding: 10px 70px;
`;

const BackButton = styled(VenueButton)`
  font-size: 16px;
  background: none;
  color: #00dabf !important;
  padding: 10px 0;

  > img {
    width: 15px;
    height: 15px;
  }
`;

const StepButtonImg = styled.img`
  width: 21px;
  height: 21px;
`;

const FormGroupStyled = styled(FormGroup)`
  display: flex;
  flex-direction: column;
`;

const InputStyled = styled.input`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  padding: 2% 3%;
  text-align: left;
  font-size: 18px;
  font-weight: 500;
  border: none;
  background: ${props =>
    props.value === "2" ? "#00DABF" : "#04D2FF"} !important;

  &:hover {
    cursor: pointer;
  }
`;

const InputDescription = styled.p`
  font-size: 14px;
  color: #cdcfdb;
  padding-left: 2%;
`;

const FieldStyled = styled(Field)`
  height: 50px !important;
  border: 1px solid #cdcfdb !important;
  margin-bottom: 25px !important;
`;

const LineBlue = styled.div`
  position: absolute;
  top: 80px;
  left: 0;
  width: ${props => props.width}%;
  height: 3px;
  background-color: #04d2ff;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ArrowStyled = styled.img`
  width: 30px;
  height: 30px;
`;

const FooterCopyright = styled.div`
  position: absolute;
  bottom: -150px;
  left: 0;
  padding-bottom: 20px;
  color: #cdcfdb;
  font-size: 18px;
`;

export class Signup extends React.PureComponent {
  state = {
    step1: true,
    step2: false,
    step3: false,
    step4: false,
    role_id: "2",
    singInModalIsOpen: false,
    activeMode: "Host"
  };

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div
          //style={{ width: "477px", margin: "15px auto 0" }}
          className="ui error message"
        >
          <div className="header">{error}</div>
        </div>
        // <p className='form-error'>{error}</p>
      );
    }
  }

  renderInput = ({ input, label, meta, type, placeholder, ...rest }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;

    return type === "phone" ? (
      <>
        <PhoneInput
          placeholder={placeholder}
          type={type}
          className="form-input"
          autoComplete="off"
          {...input}
        />
        {this.renderError(meta)}
      </>
    ) : (
      <>
        <input
          checked={input.value === rest.value}
          placeholder={placeholder}
          className={type !== "radio" && "form-input"}
          {...input}
          {...rest}
          autoComplete="off"
          type={type}
        />
        {this.renderError(meta)}
      </>
    );
  };

  displayStep2 = e => {
    this.setState({
      ...this.state,
      step1: false,
      step2: true,
      role_id: e.target.value
    });
  };

  backToStep1 = e => {
    this.setState({
      ...this.state,
      step1: true,
      step2: false,
      role_id: e.target.value
    });
  };

  registerHandler = formValues => {
    const { role_id } = this.state;

    // let phoneNumber = parsePhoneNumber(formValues.phone);
    // let countryCode = "";
    //
    // if (phoneNumber) {
    //   countryCode = "+" + phoneNumber.countryCallingCode;
    //   phoneNumber = phoneNumber.nationalNumber;
    // }

    const data = { ...formValues, role_id };

    this.props.createSignup(data);
  };

  setActiveMode = e => {
    this.setState({
      activeMode: e.target.alt,
      role_id: e.target.name
    });
  };

  render() {
    const {
      step1,
      step2,
      activeMode
      // step3,
      // step4
    } = this.state;
    // if (! ) return <Redirect to="/home" />;
    return (
      <div className="wrapper wrapper-sing_up">
        <div className="wrapper">
          <Header />
        </div>
        <main className="main">
          <div className="form-block">
            <div className="form-block__header">
              <h1>SIGN UP</h1>
              <span className={"signIn-line"} />
              <p className={"signUp-description"}>
                Do not have an account? Create your account, it takes less than
                a minute
              </p>
            </div>
            <nav className="form-block__nav">
              <div
                style={{ color: activeMode === "Host" ? "#078089" : "#b7b7b7" }}
                className="nav-wrapper"
              >
                {activeMode === "Host" ? (
                  <img
                    onClick={e => this.setActiveMode(e)}
                    className="circle"
                    src={require("../../../assets/icons/circle-regular-active.png")}
                    alt="Host"
                    name="2"
                  />
                ) : (
                  <img
                    onClick={e => this.setActiveMode(e)}
                    className="circle"
                    src={require("../../../assets/icons/circle-regular.png")}
                    alt="Host"
                    name="2"
                  />
                )}
                <span className="name name-host">Host</span>
              </div>
              <div
                style={{
                  color: activeMode === "Guest" ? "#078089" : "#b7b7b7"
                }}
                className="nav-wrapper"
              >
                {activeMode === "Guest" ? (
                  <img
                    onClick={e => this.setActiveMode(e)}
                    className="circle"
                    name="1"
                    src={require("../../../assets/icons/circle-regular-active.png")}
                    alt="Guest"
                  />
                ) : (
                  <img
                    onClick={e => this.setActiveMode(e)}
                    className="circle"
                    src={require("../../../assets/icons/circle-regular.png")}
                    alt="Guest"
                    name="1"
                  />
                )}
                <span className="name">Guest</span>
              </div>
            </nav>
            <Form
              onSubmit={this.props.handleSubmit(this.registerHandler)}
              className="form-block__form"
            >
              <Field
                component={this.renderInput}
                type="text"
                name="first_name"
                placeholder="First Name*"
              />
              <Field
                component={this.renderInput}
                type="text"
                name="last_name"
                placeholder="Last Name* "
              />
              <Field
                component={this.renderInput}
                type="email"
                name="email"
                placeholder="Email*"
              />
              {/*<Field*/}
              {/*  component={this.renderInput}*/}
              {/*  type="phone"*/}
              {/*  name="phone"*/}
              {/*  placeholder="Phone Number*"*/}
              {/*/>*/}
              <Field
                component={this.renderInput}
                type="password"
                name="password"
                placeholder="Password*"
              />
              <Field
                component={this.renderInput}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password*"
              />

              {/*<div className="verifyBy_wrapper">*/}
              {/*  <label className="verifyBy">*/}
              {/*    <Field*/}
              {/*      name="verifyBy"*/}
              {/*      component={this.renderInput}*/}
              {/*      type="radio"*/}
              {/*      value="phone"*/}
              {/*      // props={{ value: "phone" }}*/}
              {/*    />*/}
              {/*    <p className="verifyBy_text">Send code via SMS</p>*/}
              {/*  </label>*/}
              {/*  <label className="verifyBy">*/}
              {/*    <Field*/}
              {/*      name="verifyBy"*/}
              {/*      component={this.renderInput}*/}
              {/*      type="radio"*/}
              {/*      value="email"*/}
              {/*      // props={{ value: "email" }}*/}
              {/*    />*/}
              {/*    <p className="verifyBy_text">Send code via email</p>*/}
              {/*  </label>*/}
              {/*</div>*/}

              <button className="form-block__submit">REGISTER</button>
            </Form>
            <p className="form-block__footer">
              Already have an account? <Link to="/signIn">LOGIN</Link>
            </p>
          </div>
        </main>
        <div className="wrapper-container">
          <Footer />
        </div>
        {/* <SignInModal
          modal={this.state.singInModalIsOpen}
          toggle={() => this.setState({ singInModalIsOpen: false })}
        /> */}
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.email) {
    errors.email = "You must enter a email";
  }
  if (!formValues.first_name) {
    errors.first_name = "You must enter a first name";
  }
  if (!formValues.last_name) {
    errors.last_name = "You must enter a last name";
  }
  if (!formValues.password) {
    errors.password = "You must enter a password";
  }
  if (formValues.confirmPassword !== formValues.password) {
    errors.confirmPassword = "You must enter a confirmPassword";
  }
  // if (!formValues.phone) {
  //   errors.phone = "You must enter a phone number";
  // }
  return errors;
};

const formWrapped = reduxForm({
  form: "Signup",
  initialValues: { verifyBy: "phone" },
  validate
})(Signup);

const mapStateToProps = state => ({
  loading: state.auth.signupLoading,
  error: state.auth.signupError
});

export default connect(mapStateToProps, { createSignup })(formWrapped);
