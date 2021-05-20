import React, { useState } from "react";
import { connect } from "react-redux";
import { resetPassword } from "../../../redux/actions/users.actions/resetPassword.thunk";

import { Field, reduxForm } from "redux-form";
import { Form, FormGroup, Label, Col, Row, Spinner } from "reactstrap";
// import Header from '../../../components/Header';
import styled from "styled-components";
import FullLogo from "../../../components/Header/FullLogo";

import VenueButton from "../../../components/styledComp/VenueButton";

import imageSignUp from "../../../assets/sign_up_image.jpg";

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
  background-color: #078089;
  color: #fff;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  width: 222px;
  line-height: 47px;
  font-size: 16px;
  font-family: "Inter";
  padding: 0;
  margin-top: 25px;
`;

const FieldStyled = styled(Field)`
  height: 50px !important;
  border: 1px solid #cdcfdb !important;
  margin-bottom: 25px !important;
`;

const FooterCopyright = styled.div`
  position: absolute;
  bottom: -150px;
  left: 0;
  padding-bottom: 20px;
  color: #cdcfdb;
  font-size: 18px;
`;

const FormGroupStyled = styled(FormGroup)`
  margin-bottom: 25px !important;
`;

export class ResetPassword extends React.PureComponent {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta, type, placeholder }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    const [inputType, setType] = useState(type);
    const changeType = () => {
      const newType = inputType === "password" ? "text" : "password";
      setType(newType);
    };

    return (
      <>
        <div className={className}>
          <label>{label} </label>
          <input
            {...input}
            autoComplete="off"
            type={inputType}
            placeholder={placeholder}
          />
          <img
            className="show-password"
            onClick={changeType}
            src="/images/show-password.svg"
            alt="eye icon"
          />
        </div>
        {this.renderError(meta)}
      </>
    );
  };

  registerHandler = async formValues => {
    const { token } = this.props.match.params;
    await this.props.resetPassword({
      password: formValues.new_password,
      token: token
    });
    return <div>dwqdqwdqw</div>;
  };

  render() {
    return (
      <ContainerMy>
        <ColLeft>
          <Row>
            <Col xs="12">
              {/* <Header></Header> */}

              <Form
                onSubmit={this.props.handleSubmit(this.registerHandler)}
                className="ui form error"
                style={{ marginTop: "200px" }}
              >
                <div className="align-center">
                  <FullLogo />
                </div>
                <p className="reset-text reset-bold">Reset Password</p>

                <FormGroupStyled>
                  {/* <Label>Enter a new password</Label> */}
                  <FieldStyled
                    name="new_password"
                    type="password"
                    component={this.renderInput}
                    placeholder="New Password"
                  />
                </FormGroupStyled>

                <FormGroupStyled>
                  {/* <Label>Repeat password</Label> */}
                  <FieldStyled
                    name="repeat_password"
                    type="password"
                    component={this.renderInput}
                    placeholder="Confirm Password"
                  />
                </FormGroupStyled>
                <div className="align-center">
                  <NextButton>Reset</NextButton>
                </div>
              </Form>

              <FooterCopyright>© Vent Inc. All rights reserved</FooterCopyright>
            </Col>
          </Row>
        </ColLeft>
        <ColRight></ColRight>
      </ContainerMy>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.new_password) {
    errors.new_password = "You must enter a password";
  }
  if (formValues.repeat_password !== formValues.new_password) {
    errors.repeat_password = "Your passwords must match";
  }
  return errors;
};

const formWrapped = reduxForm({
  form: "ResetPassword",
  validate
})(ResetPassword);

const mapStateToProps = state => ({
  loading: state.resetPassword.resetPasswordLoading,
  error: state.resetPassword.resetPasswordError
});

export default connect(mapStateToProps, { resetPassword })(formWrapped);
