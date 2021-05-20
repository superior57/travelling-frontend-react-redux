import React, { Component } from 'react';
import { Logo, Userman } from '../../adminDashboardImages';
import { Link } from 'react-router-dom';

export class AdminHeader extends Component {
  onLogout = () => {
    const { history } = this.props;
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('permissions');
    localStorage.removeItem('role_type');
    localStorage.removeItem('role_id');
    history.push('/admin');
  };

  render() {
    return (
      <header className="adminHeader">
        <div className="header_row">
          <div className="logo">
            <div className="header_icon">
              <img src={Logo} alt="" />
            </div>
            <Link to="" className="logo_img"></Link>
          </div>
          <ul className="nav_list">
            {/* <li>
              <span className="cstm_srch_wrap">
                <input type="text" className="form-control cstm_srch" placeholder="Search Here.." />
                <i className="fa fa-search"></i>
              </span>
            </li> */}
            <li className="list_icon">
              <Link to="" className="profile_icn">
                <i className="fa fa-bell-o" aria-hidden="true"></i> Hello! Admin
              </Link>
              <img src={Userman} alt="" />
            </li>
            <li>
              <Link to="#" className="profile_icn" onClick={this.onLogout}>
                <i className="fa fa-lock" aria-hidden="true"></i> Logout
              </Link>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}

export default AdminHeader;
