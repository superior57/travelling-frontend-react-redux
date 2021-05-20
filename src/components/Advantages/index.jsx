import React, { Component } from "react";
import PropTypes from "prop-types";
import imgClean from "./assets/clean.png";
import imgHome from "./assets/home.png";
import imglocation from "./assets/location.png";
import "./style.scss";

const assetsMap = {
  "1": {
    title: "Apartment at your disposal",
    img: imgClean
  },
  "2": {
    title: "Perfect clean liness",
    img: imgHome
  },
  "3": {
    title: "Great location",
    img: imglocation
  }
};

class Advantages extends Component {
  get listOfAdvantages() {
    return this.props.advantages.slice(0, this.props.max).map(item => {
      return (
        <li className={`item`} key={item.name}>
          <img src={assetsMap[item.id].img} alt={item.name} />
          {item.name}
        </li>
      );
    });
  }

  render() {
    return this.listOfAdvantages;
  }
}

Advantages.propType = {
  advantages: PropTypes.array,
  max: PropTypes.number
};

export default Advantages;
