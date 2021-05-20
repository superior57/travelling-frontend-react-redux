import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createAdminSignup,
  getAdminRoles
} from '../../../../redux/actions/users.actions/auth.thunk';
import Header from '../../../../components/Header';
import isEmpty from '../../../../isEmpty';
import { Spinner } from 'reactstrap';

class AdminSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      adminType: '',
      errors: {},
      isEye: false,
      isEye1: false
    };
  }

  componentDidMount() {
    this.props.getAdminRoles();
  }

  componentDidUpdate(prevProps) {
    let errors = {};
    if (this.props.errors && this.props.errors !== prevProps.errors) {
      errors.email = this.props.errors.message;
      this.setState({ errors });
    }

    if (this.props.adminRoles && prevProps.adminRoles !== this.props.adminRoles) {
      const { result } = this.props.adminRoles;
      this.setState({ adminType: result[0] && result[0].id });
    }
  }

  validate() {
    const { firstName, lastName, email, password, phone, confirmPassword } = this.state;
    let emailRegex = /.+@[^@]+\.[^@]{2,}$/;
    let errors = {};

    if (isEmpty(firstName)) {
      errors.firstName = 'First name is required.';
    }

    if (isEmpty(lastName)) {
      errors.lastName = 'Last name is required.';
    }

    if (email && !emailRegex.test(email)) {
      errors.email = 'Email is invalid.';
    }

    if (isEmpty(email)) {
      errors.email = 'Email is required.';
    }

    if (isEmpty(phone)) {
      errors.phone = 'Phone is required.';
    }

    if (password.length < 8) {
      errors.password = 'Password should be at least 8 characters.';
    }

    if (isEmpty(password)) {
      errors.password = 'Password is required.';
    }

    if (password.length >= 8 && password !== confirmPassword) {
      errors.confirmPassword = 'Passwords must be same.';
    }

    if (isEmpty(confirmPassword)) {
      errors.confirmPassword = 'Confirm Password is required.';
    }

    this.setState({ errors });

    return errors;
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, phone, adminType } = this.state;
    const data = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      phone,
      role_id: adminType
    };

    let isValid = isEmpty(this.validate());

    if (isValid) {
      this.props.createAdminSignup(data);
    }
  };

  render() {
    const {
      isAuthenticated,
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      adminType,
      errors,
      isEye,
      isEye1
    } = this.state;
    const { adminRoles } = this.props;
    return (
      <div className="wrapper">
        <div className="container">
          <Header isAuthenticated={isAuthenticated} find={true} isAdmin={true}></Header>
          <div className="login_form">
            <div className="login_sec">
              <h1>Admin Signup</h1>
              <form onSubmit={this.handleSubmit} className="form_sec">
                <div className="form-group">
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    id="firstName"
                    value={firstName}
                    placeholder="Enter your First Name"
                    onChange={this.handleChange}
                  />
                  {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    id="lastName"
                    value={lastName}
                    placeholder="Enter your last name"
                    onChange={this.handleChange}
                  />
                  {errors.lastName && <div className="error-message">{errors.lastName}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    id="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={this.handleChange}
                  />
                </div>
                {errors.email && <div className="error-message">{errors.email}</div>}
                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    id="phone"
                    value={phone}
                    placeholder="Enter your phone"
                    onChange={this.handleChange}
                  />
                </div>
                {errors.phone && <div className="error-message">{errors.phone}</div>}
                <div className="form-group eye_img">
                  <label htmlFor="pwd">Password:</label>
                  <input
                    type={isEye ? 'text' : 'password'}
                    name="password"
                    className="form-control"
                    id="pwd"
                    value={password}
                    placeholder="***********"
                    onChange={this.handleChange}
                  />
                  <a
                    onClick={() => {
                      this.setState({
                        isEye: !isEye
                      });
                    }}
                  >
                    <img src={isEye ? '../images/eye.png' : '../images/eye-slash.png'} />
                  </a>
                </div>
                {errors.password && <div className="error-message">{errors.password}</div>}
                <div className="form-group eye_img">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type={isEye1 ? 'text' : 'password'}
                    name="confirmPassword"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    placeholder="***********"
                    onChange={this.handleChange}
                  />
                  <a
                    onClick={() => {
                      this.setState({
                        isEye1: !isEye1
                      });
                    }}
                  >
                    <img src={isEye1 ? '../images/eye.png' : '../images/eye-slash.png'} />
                  </a>
                </div>
                {errors.confirmPassword && (
                  <div className="error-message">{errors.confirmPassword}</div>
                )}
                <div className="form-group">
                  <label htmlFor="adminType">Admin Type:</label>
                  <select
                    name="adminType"
                    className="form-control height-45"
                    id="adminType"
                    value={adminType}
                    placeholder="Enter your adminType"
                    onChange={this.handleChange}
                  >
                    {adminRoles &&
                      adminRoles.result.map((role, index) => (
                        <option value={role.id} key={index}>
                          {role.role_type}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="text-center">
                  <button type="submit" className="login_btn">
                    {this.props.loading ? <Spinner /> : 'Signup'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  adminRoles: state.auth.adminRoles,
  errors: state.auth.adminSignupError
});

export default connect(mapStateToProps, { createAdminSignup, getAdminRoles })(AdminSignup);
