import React, { useState } from "react";
import { withRouter } from "react-router";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { NavbarToggler } from "reactstrap";
import "./style.scss";
import FullLogo from "../FullLogo";
import SearchForm from "../../../components/SearchForm/index";

const NavMenu = props => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);
  const { match, isAdmin, classes, fullLogo } = props;
  const url = match.path;

  return (
    <div className={`NavMenu ${classes}`}>
      <div className="NavMenu-container">
        <Link className="NavMenu-container-link" to="/">
          <FullLogo fullLogo={fullLogo} />
        </Link>
        {/* {url === '/home' || url === '/listing' || isAdmin ? null : <SearchForm />} */}
      </div>
      <NavbarToggler onClick={toggle} />
      {isOpen && props.children}
    </div>
  );
};

NavMenu.propTypes = {
  find: PropTypes.bool
};

export default withRouter(NavMenu);
