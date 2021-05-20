import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import onClickOutside from "react-onclickoutside";

import { logOut } from "../../../redux/actions/users.actions/auth.actions";
import history from "../../../history";
import Avatar from "../../Avatar";
import arrowDown from "../../../assets/icons/arrow_down.png";
import "./style.scss";
import defaultPhoto from "../../../pages/user/profilePage/assets/defaultPhoto.png";

function DropdownProfile(props) {
  const [isOpen, setIsOpen] = useState(false);

  const { user, newAvatar } = props;

  const onLogout = () => {
    props.logOut();
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    localStorage.removeItem("avatar");

    history.push("/");
  };

  const toggleModal = () => {
    history.push("/profile");
    setIsOpen(!isOpen);
  };

  DropdownProfile.handleClickOutside = () => setIsOpen(false);
  return (
    <div className="DropdownProfile">
      <div className="DropdownProfile__user" onClick={toggleModal}>
        <Avatar
          image={
            newAvatar ||
            localStorage.getItem("avatar") ||
            user?.image ||
            defaultPhoto
          }
          account={true}
          height={50}
          width={50}
        />
        {/*<img src={arrowDown} alt="arrow" className="DropdownProfile__arrow" />*/}
      </div>
      {/*{isOpen && (*/}
      {/*  <ul className="DropdownProfile__menu">*/}
      {/*    <Link to="/profile">*/}
      {/*      <li className="DropdownProfile__item">My profile</li>*/}
      {/*    </Link>*/}
      {/*    <Link to="/referral">*/}
      {/*      <li className="DropdownProfile__item">Referral program</li>*/}
      {/*    </Link>*/}
      {/*    <Link className="Menu-header-item" to="/reservations">*/}
      {/*      <li className="DropdownProfile__item">Reservations</li>*/}
      {/*    </Link>*/}
      {/*    {user.role.role_type === "Host" && (*/}
      {/*      <Link className="Menu-header-item" to="/balance-history">*/}
      {/*        <li className="DropdownProfile__item">My balance</li>*/}
      {/*      </Link>*/}
      {/*    )}*/}
      {/*    <Link to="#">*/}
      {/*      <li className="DropdownProfile__item">Reviews</li>*/}
      {/*    </Link>*/}
      {/*    {user.role.role_type === "Host" && (*/}
      {/*      <Link to="/buildings">*/}
      {/*        <li className="DropdownProfile__item">Add Venue</li>*/}
      {/*      </Link>*/}
      {/*    )}*/}
      {/*    <li className="DropdownProfile__item" onClick={onLogout}>*/}
      {/*      Log Out*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*)}*/}
    </div>
  );
}
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    newAvatar: state.profile.avatar
  };
};

const clickOutsideConfig = {
  handleClickOutside: () => DropdownProfile.handleClickOutside
};

export default connect(mapStateToProps, { logOut })(
  onClickOutside(DropdownProfile, clickOutsideConfig)
);
