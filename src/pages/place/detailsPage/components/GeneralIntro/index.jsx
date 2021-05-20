import React from "react";
import "./style.scss";
// import RateLabel from '../../../../../components/RateLabel';
// import OwnerLabel from '../../../../../components/OwnerLabel';
import ShareButton from "../../../../../components/ShareButton";
import SaveButton from "../../../../../components/SaveButton";
import LocationLabel from "../../../../../components/LocationLabel";
import PropTypes from "prop-types";

class GeneralIntro extends React.PureComponent {
  render() {
    const {
      title,
      isAuthenticated,
      rating,
      address,
      city,
      reviewsCount,
      favoriteBuilding,
      isFavorite
    } = this.props;

    return (
      <div className="general-intro">
        <h1>{title}</h1>
        <div className="general-intro-panel">
          <div className="general-intro-panel-left">
            {/* {rating && <RateLabel rate={rating} reviewsSum={reviewsCount} isLarge />} */}
            {/* <OwnerLabel /> */}
            <LocationLabel address={address} city={city} />
            <div className="location-link"></div>
          </div>
          <div className="general-intro-panel-right">
            <SaveButton
              toggleFavorite={favoriteBuilding}
              isFavorite={isFavorite}
            />
            <ShareButton isAuth={isAuthenticated} />
          </div>
        </div>
      </div>
    );
  }
}

GeneralIntro.propTypes = {
  title: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  rating: PropTypes.number,
  address: PropTypes.object,
  city: PropTypes.object
};

export default GeneralIntro;
