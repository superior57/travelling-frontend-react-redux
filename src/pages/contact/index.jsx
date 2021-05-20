import React from "react";
import { connect } from "react-redux";

import { sendContacts } from "../../redux/actions/users.actions/profile.thunk";

import history from "../../history";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { toastr } from "react-redux-toastr";

import "./style.scss";
import Autocomplete from "../../components/Filter/Venue/VenueType";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

const mapStateToProps = state => ({
  isSend: state.profile.isSendContacts,
  isAuthenticated: state.auth.isAuthenticated
});

class ContactPage extends React.PureComponent {
  state = {
    name: "",
    email: "",
    message: "",
    ventEmail: "Contact@VentVent.com"
  };

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  componentDidUpdate(prevProps) {
    if (this.props.isSend !== prevProps.isSend) {
      toastr.success("Sended", "We are sended!");
      history.push("/");
    }
  }

  handleChangeContact = event => {
    this.setState({
      ventEmail: event.target.value
    });
  };

  render() {
    const { isAuthenticated } = this.props;
    const { name, email, message, ventEmail } = this.state;

    return (
      <>
        <div className="ContactPage">
          <div className="wrapper">
            <Header isAuthenticated={isAuthenticated} find={true}></Header>
          </div>
          <div className="ContactPage__page-name-wrapper">
            <span className="ContactPage__page-name">Contact Us</span>
          </div>
          <main className="ContactPage-content">
            <div className="ContactPage-content__container">
              <div className="ContactPage-content__card">
                <h1 className="ContactPage-content__title">Contact Us</h1>
                <ul className="ContactPage-content__list">
                  {/*<li className="ContactPage-content__list-item">*/}
                  {/*  <span className="ContactPage-content__icon ContactPage-content__icon_place"></span>*/}
                  {/*  <span className="ContactPage-content__item-text">*/}
                  {/*    734 Walt Whitman Rd. Suite 203, Melville, NY 11747*/}
                  {/*  </span>*/}
                  {/*</li>*/}
                  <li className="ContactPage-content__list-item">
                    <span className="ContactPage-content__icon ContactPage-content__icon_email"></span>

                    <FormControl>
                      <Select
                        style={{ color: "white" }}
                        native
                        value={ventEmail}
                        onChange={this.handleChangeContact}
                      >
                        <option
                          value={"Contact@VentVent.com"}
                          style={{ color: "black" }}
                        >
                          Contact@VentVent.com
                        </option>
                        <option
                          value={"Legal@ventvent.com"}
                          style={{ color: "black" }}
                        >
                          Legal@ventvent.com
                        </option>
                        <option
                          value={"Support@ventvent.com"}
                          style={{ color: "black" }}
                        >
                          Support@ventvent.com
                        </option>
                      </Select>
                    </FormControl>
                  </li>
                  <li className="ContactPage-content__list-item">
                    <span className="ContactPage-content__icon ContactPage-content__icon_phone"></span>
                    <a
                      href="tel:6310003737"
                      className="ContactPage-content__item-text"
                    ></a>
                  </li>
                </ul>
              </div>
              <div className="ContactPage-form-wrapper">
                <h2 className="ContactPage-content__fortitle">Get in Touch</h2>
                <p className="ContactPage-content__text">
                  Feel free to drop us a line below!
                </p>
                <form className="ContactPage-form">
                  <input
                    className="ContactPage-form-input"
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={this.handleChange}
                  />
                  <input
                    className="ContactPage-form-input"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={this.handleChange}
                  />
                  <textarea
                    className="ContactPage-form-textarea"
                    placeholder="Message"
                    name="message"
                    value={message}
                    onChange={this.handleChange}
                  ></textarea>
                  <button
                    disabled={!email || !name || !message}
                    className="ContactPage-form-btn"
                    onClick={event => {
                      event.preventDefault();
                      this.props.sendContacts(this.state);
                    }}
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </>
    );
  }
}

export default connect(mapStateToProps, { sendContacts })(ContactPage);
