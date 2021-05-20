import React, { Component } from "react";
import "./style.scss";
import { Button } from "reactstrap";

class DropDown extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className="dropDown-wrapper">
        <div className="dropDown-wrapper-header">
          <h1 className="title">Price range</h1>
        </div>
        <div className="select-price">
          <div className="price">
            <span>$</span>
            <input placeholder="Min" />
          </div>
          <span>to</span>
          <div className="price">
            <span>$</span>
            <input placeholder="Max" />
          </div>
        </div>
        <div className="buttons">
          <button className="clear-button">
            <spam>Clear</spam>
          </button>
          <button className="done-button">Done</button>
        </div>
      </div>
    );
  }
}

export default DropDown;
