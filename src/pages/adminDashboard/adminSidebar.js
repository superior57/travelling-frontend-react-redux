import React, { Component, Fragment } from "react";
// import { Rating, Dashboard, Transaction, User, Venue, Booking } from '../../adminDashboardImages';
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

export class AdminSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.location.pathname.split("/")[2]
    };
  }

  handlerClick = event => {
    let urlArr = this.props.location.pathname.split("/")[2];
    let currentPage = event.currentTarget.getAttribute("data-item");
    if (urlArr === currentPage) {
      this.setState({
        active: currentPage
      });
    }
  };

  render() {
    const { location } = this.props;
    let urlArr = location.pathname.split("/")[2];
    const permissions = [
      "dashboard",
      // "employees",
      "bookings",
      "reviews",
      "feedback",
      "transactions",
      "guests",
      // "chats",
      "hosts",
      "venues"
      // "notifications",
      // "guest-emails",
      // "host-emails"
    ];

    return (
      <>
        <div className="left_sidebar">
          <ul className="sidebar_menu">
            {permissions.map((item, index) => (
              <li
                key={index}
                data-item={item}
                className={this.state.active === item && "active"}
                onClick={this.handlerClick}
              >
                <Link
                  to={`/admin/${item}`}
                  className={urlArr === { item } ? "active" : ""}
                >
                  {/* <img alt="icon" src={Transaction} /> */}
                  <span className="text-capitalize">
                    {item.replace("-", " ")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default AdminSidebar;
