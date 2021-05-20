import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar/index';
import arrow from './assets/arrow.png';
import onClickOutside from 'react-onclickoutside';

import './style.scss';

class Account extends React.PureComponent {
  state = {
    drop: false
  };
  handleClickOutside = (evt) => {
    this.setState({ drop: false });
  };
  toggleDropDown = () => {
    this.setState({ drop: !this.state.drop });
  };
  render() {
    return (
      <div className="account-wrapper">
        <Link className="account-link" to="">
          Inbox
        </Link>
        <div className="account-dropdown" onClick={this.toggleDropDown}>
          <Avatar account={true} width={'45px'} height={'45px'} />
          <img className={this.state.drop ? 'rotate-arrow' : ''} src={arrow} alt="arrow" />
        </div>
        {this.state.drop && (
          <div className="drop-menu">
            <ul>
              <li>Reviews</li>
              <li>
                <Link className="account-link" to="/buildings">
                  Add new venue
                </Link>
              </li>
              <li>Profile</li>
              <li>Log Out</li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}
export default onClickOutside(Account);
