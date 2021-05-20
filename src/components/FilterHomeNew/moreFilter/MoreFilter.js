import React, { Component } from "react";
import "./style.scss";
import DropDown from "./components/DropDown";

class MoreFilter extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className="filter-wrapper">
        <div className="filter-row">
          <h1 className="title-search">More filters:</h1>

          <input
            type="submit"
            className="search_btn"
            value="51 to 100 people"
            //   onClick={searchHandler}
          />

          <input
            type="submit"
            className="search_btn"
            value="Price range"
            style={{ background: "#E9EBEF", color: "#979797" }}
            //   onClick={searchHandler}
          />

          <input
            type="submit"
            className="search_btn"
            value="Features (2)"
            //   onClick={searchHandler}
          />

          {/* <DropDown /> */}
        </div>
      </div>
    );
  }
}

export default MoreFilter;
