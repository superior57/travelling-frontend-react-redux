import React from "react";
import { connect } from "react-redux";
import { checkEmail } from "../../../redux/actions/users.actions/resetPassword.thunk";
import fullLogo from "../../../assets/Full_Logo.png";
import { Link } from "react-router-dom";

import { Field, reduxForm } from "redux-form";
import { Form, FormGroup, Input, Label, Col, Row, Spinner } from "reactstrap";
// import Header from '../../../components/Header';
import styled from "styled-components";
import Header from "../../../components/Header";
import FullLogo from "../../../components/Header/FullLogo";

import VenueButton from "../../../components/styledComp/VenueButton";

import imageSignUp from "../../../assets/sign_up_image.jpg";
import { isAuthenticated } from "../../../redux/selectors/auth/auth.select";

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

const FieldStyled = styled(Field)`
  height: 50px !important;
  border: 1px solid #cdcfdb !important;
  margin-bottom: 25px !important;
  width: 100% !important;
  display: block;
  padding: 0.375rem 0.75rem;
  order-radius: 0.25rem;
`;

const FooterCopyright = styled.div`
  position: absolute;
  bottom: -150px;
  left: 0;
  padding-bottom: 20px;
  color: #cdcfdb;
  font-size: 18px;
`;

export class CheckEmail extends React.PureComponent {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta, type, placeholder, classFcontrol }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label} </label>
        <input
          {...input}
          autoComplete="off"
          type={type}
          className={classFcontrol}
          placeholder={placeholder}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  registerHandler = async formValues => {
    console.log("formValues", formValues);
    await this.props.checkEmail(formValues);
  };

  // componentWillMount() {
  //   if (localStorage.getItem("token")) this.props.history.push("/home");
  // }
  render() {
    const { isAuthenticated } = this.props;

    return (
      <div className="wrapper">
        <div className="top_header">
          <Header isAuthenticated={isAuthenticated} find={true}></Header>
        </div>
        <div className="container">
          <div className="login_form">
            <div className="login_sec">
              <div className="align-center">
                <img className="fullLogo" src={fullLogo} alt="Full Logo" />
              </div>
              <p className="reset-text">
                Don`t worry! Resetting your password is easy.
                <br />
                Just enter the email you registered to VentVent.
              </p>

              <Form
                onSubmit={this.props.handleSubmit(this.registerHandler)}
                className="form_sec"
              >
                <FormGroup>
                  {/* <label htmlFor="email">Email address:</label> */}
                  <FieldStyled
                    name="email"
                    type="email"
                    component={this.renderInput}
                    placeholder="Email"
                    classFcontrol="form-control"
                  />
                </FormGroup>
                <div className="text-center frm_btn">
                  <button type="submit" className="reset-btn">
                    Submit
                  </button>
                </div>

                {/* <p className="bck_login">
                  <Link to="/home">
                    <i className="fa fa-angle-left" aria-hidden="true"></i>Back to Home
                  </Link>
                </p> */}
              </Form>
            </div>
          </div>
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
  return errors;
};

const formWrapped = reduxForm({
  form: "CheckEmail",
  validate
})(CheckEmail);

const mapStateToProps = state => ({
  loading: state.resetPassword.checkEmailLoading,
  error: state.resetPassword.checkEmailError
});

export default connect(mapStateToProps, { checkEmail })(formWrapped);
