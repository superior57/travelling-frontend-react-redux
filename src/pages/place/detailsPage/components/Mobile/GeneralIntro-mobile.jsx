import React from "react";
// import "./style.scss";

import ShareButton from "../../../../../components/ShareButton";

import PropTypes from "prop-types";
import { ReactComponent as GeolocationSVG } from "../../../../../components/LocationLabel/assets/loc.svg";
import { ReactComponent as Like } from "../../../../../components/SaveButton/assets/like.svg";
import { ReactComponent as Unlike } from "../../../../../components/SaveButton/assets/unlike.svg";

class GeneralIntroMobile extends React.PureComponent {
  render() {
    const {
      title,
      isAuthenticated,
      rating,
      address,
      city,
      favoriteBuilding,
      isFavorite,
      price
    } = this.props;

    return (
      <div className="general-intro">
        <div className={"wrapper-title"}>
          <h1>{title}</h1>
          <span>{price}/Hour</span>
        </div>
        <div className="general-intro-panel">
          <div className="general-intro-panel-left">
            {/* {rating && <RateLabel rate={rating} reviewsSum={reviewsCount} isLarge />} */}
            {/* <OwnerLabel /> */}

            <div className="location">
              <GeolocationSVG />
              <span>
                {city.city_name}, {address.street}
              </span>
            </div>
            <div className="location-link"></div>
          </div>
          <div className="general-intro-panel-right">
            <div className="save">
              <button className="save-btn" onClick={favoriteBuilding}>
                {isFavorite ? (
                  <span>
                    <Like className="save-svg" />
                  </span>
                ) : (
                  <span>
                    <Unlike className="save-svg" />
                  </span>
                )}
              </button>
            </div>
            <ShareButton isAuth={isAuthenticated} />
          </div>
        </div>
      </div>
    );
  }
}

GeneralIntroMobile.propTypes = {
  title: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  rating: PropTypes.number,
  address: PropTypes.object,
  city: PropTypes.object
};

export default GeneralIntroMobile;
