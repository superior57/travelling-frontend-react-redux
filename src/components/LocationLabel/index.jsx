import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as GeolocationSVG } from './assets/loc.svg';
import './style.scss';

const LocationLabel = ({ address, city }) => {
  return (
    <div className="location">
      <GeolocationSVG />
      <span>
        {city.city_name}, {address.street}
      </span>
    </div>
  );
};

LocationLabel.propTypes = {
  address: PropTypes.object,
  city: PropTypes.object
};

export default LocationLabel;
