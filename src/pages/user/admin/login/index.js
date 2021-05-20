import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createAdminLogin } from "../../../../redux/actions/users.actions/auth.thunk";
import validationRules from "./loginValidate";
import { validate } from "./validate";
import Header from "../../../../components/Header";

const mapStateToProps = state => ({
  loading: state.adminLogin.loginLoading
});

class AdminLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: {},
      isEye: false
    };
  }

  // componentDidMount() {
  //   if (localStorage.getItem('token')) {
  //     this.props.history.push('/admin/dashboard');
  //   }
  // }
  //
  // componentDidUpdate() {
  //   if (localStorage.getItem('token')) {
  //     this.props.history.push('/admin/dashboard');
  //   }
  // }

  _validation() {
    let validRes = validate(this.state, validationRules);
    this.setState(() => ({ error: validRes.errors }));
    return validRes.isValid;
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const data = { email, password };
    if (this._validation()) {
      if (email && password) {
        this.props.createAdminLogin(data);
      }
    }
  };

  render() {
    const { isAuthenticated, email, password, error, isEye } = this.state;

    return (
      <div className="wrapper">
        <div className="container">
          <Header
            isAuthenticated={isAuthenticated}
            find={true}
            isAdmin={true}
          ></Header>
          <div className="login_form">
            <div className="login_sec">
              <h1>Welcome Admin</h1>
              <form onSubmit={this.handleSubmit} className="form_sec">
                <div className="form-group">
                  <label htmlFor="email">Email address:</label>
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
                {"email" in error && (
                  <div className="error-message">{error["email"]}</div>
                )}
                <div className="form-group eye_img">
                  <label htmlFor="pwd">Password:</label>
                  <input
                    type={isEye ? "text" : "password"}
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
                    <img
                      src={isEye ? "images/eye.png" : "images/eye-slash.png"}
                    />
                  </a>
                </div>
                {"password" in error && (
                  <div className="error-message">{error["password"]}</div>
                )}
                <div className="checkbox">
                  <label className="cstm_check"></label>
                  <Link to="/admin/forgot">Forgot Password</Link>
                </div>
                <div className="text-center">
                  <button type="submit" className="login_btn">
                    Log In
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

export default connect(mapStateToProps, { createAdminLogin })(AdminLogin);
