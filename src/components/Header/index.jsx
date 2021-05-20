import React, { Component } from "react";
import PropTypes from "prop-types";
import NavMenu from "./NavMenu";
import Menu from "./Menu";
import "./style.scss";
import fullLogoHome from "../../assets/Full_Logo_Home.png";
import fullLogo from "../../assets/Full_Logo.png";
export default class Header extends Component {
  // defClass = 'top_header';

  render() {
    const { isAuthenticated, find, isAdmin } = this.props;
    const currentLocation = window.location.pathname;
    console.log(currentLocation);
    return (
      <NavMenu
        fullLogo={currentLocation === "/" ? fullLogoHome : fullLogo}
        classes={"home_header"}
        find={find}
        isAdmin={isAdmin}
      >
        <Menu isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
      </NavMenu>
    );
  }
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  find: PropTypes.bool
};
