import React, { Component } from 'react';
import PropTypes from 'prop-types';
import imgElevator from './assets/elevator.png';
import imgTV from './assets/television.png';
import imgWifi from './assets/wifi.png';
import './style.scss';

const assetsMap = {
  '1': {
    title: 'Wi-fi',
    img: imgWifi
  },
  '2': {
    title: 'SmartTV',
    img: imgTV
  },
  '3': {
    title: 'Elevator',
    img: imgElevator
  },
  '4': {
    title: 'Iron',
    img: imgElevator
  },
  '5': {
    title: 'Washing machine',
    img: imgElevator
  },
  '6': {
    title: 'Heating',
    img: imgElevator
  },
  '7': {
    title: 'Essentials',
    img: imgElevator
  },
  '8': {
    title: 'Hot water',
    img: imgElevator
  },
  '9': {
    title: 'Kitchen',
    img: imgElevator
  },
  '10': {
    title: 'Air conditioning',
    img: imgElevator
  },
  '11': {
    title: 'Parking',
    img: imgElevator
  },
  '12': {
    title: 'Fridge',
    img: imgElevator
  },
  '13': {
    title: 'Separate entrance',
    img: imgElevator
  }
};

class Amenities extends Component {
  get listOfAmenities() {
    return this.props.amenities
      .filter((item) => (this.props.all ? true : item.value))
      .slice(0, this.props.max)
      .map((item, i) => (
        <li className={`Amenities ${!item.value && 'cross'}`} key={`amenities_${i}`}>
          <img src={assetsMap[item.id].img} alt={item.name} />
          {assetsMap[item.id].title}
        </li>
      ));
  }

  render() {
    return this.listOfAmenities;
  }
}

Amenities.propType = {
  amenities: PropTypes.array,
  max: PropTypes.number,
  all: PropTypes.bool
};

export default Amenities;
