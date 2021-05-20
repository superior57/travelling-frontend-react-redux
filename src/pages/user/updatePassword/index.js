import React from "react";
import { connect } from "react-redux";
import { updatePassword } from "../../../redux/actions/users.actions/updatePassword.thunk";

import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { Form, FormGroup, Label, Col, Row, Spinner } from "reactstrap";
import styled from "styled-components";
import Header from "../../../components/Header";
import { isAuthenticated } from "../../../redux/selectors/auth/auth.select";

import VenueButton from "../../../components/styledComp/VenueButton";

import imageSignUp from "../../../assets/sign_up_image.jpg";
import { toastr } from "react-redux-toastr";

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
  background: #00dabf;
  padding: 10px 70px;
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

export class UpdatePassword extends React.PureComponent {
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
          placeholder={placeholder}
          className={classFcontrol}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  updateHandler = async formValues => {
    const { id } = this.props.match.params;
    if (
      formValues.password !== "" &&
      formValues.new_password !== formValues.repeat_password &&
      formValues.password === formValues.newPassword
    )
      return false;
    await this.props.updatePassword({
      newPassword: formValues.new_password,
      id: localStorage.getItem("id"),
      password: formValues.password
    });

    return <div>dwqdqwdqw</div>;
  };

  render() {
    const { isAuthenticated } = this.props;

    return (
      <div className="wrapper">
        <Header isAuthenticated={isAuthenticated} find={true}></Header>
        <div className="container">
          <div className="login_form">
            <div className="login_sec">
              <h1>Update your password?</h1>
              <p>Please Choose as new password to finish signing in.</p>

              <Form
                onSubmit={this.props.handleSubmit(this.updateHandler)}
                className="form_sec"
              >
                <FormGroup>
                  <Label htmlFor="password">Current password</Label>

                  <FieldStyled
                    classFcontrol="form-control"
                    name="password"
                    type="password"
                    component={this.renderInput}
                    placeholder="**********"
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="new_password">Enter new password</Label>
                  <FieldStyled
                    classFcontrol="form-control"
                    name="new_password"
                    type="password"
                    component={this.renderInput}
                    placeholder="**********"
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="repeat_password">Repeat password</Label>
                  <FieldStyled
                    classFcontrol="form-control"
                    name="repeat_password"
                    type="password"
                    component={this.renderInput}
                    placeholder="**********"
                  />
                </FormGroup>
                <div className="text-center frm_btn">
                  <button type="submit" className="login_btn">
                    Update Password
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
  if (!formValues.password) {
    errors.password = "You must enter Currents password";
  }
  if (!formValues.new_password) {
    errors.new_password = "You must enter a  New password";
  }
  if (formValues.repeat_password !== formValues.new_password) {
    errors.repeat_password = "Your passwords must match";
  }
  if (formValues.password === formValues.new_password) {
    errors.repeat_password =
      "Your passwords cannot be same as current password";
  }
  return errors;
};

// const mapStateToProps = (state) => ({
//   checkAuthError: state.auth.checkAuthError,

// });

const formWrapped = reduxForm({
  form: "UpdatePassword",
  validate
})(UpdatePassword);

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state),

  loading: state.updatePassword.updatePasswordLoading,
  error: state.updatePassword.updatePasswordError
});

export default connect(mapStateToProps, { updatePassword })(formWrapped);
