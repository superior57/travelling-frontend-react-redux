import React from "react";
import PropTypes from "prop-types";
import StarRatings from "react-star-ratings";
import { ratingColor } from "../../../constrains";
import user from "../../../../../../assets/testimonials/testimonial-2.png";
import "./style.scss";
import moment from "moment";

export const ReviewItem = ({ review }) => {
  return (
    <div className="review-item">
      <div className="review-item-left">
        <img className="review-item-left-img" src={user} alt="card-image" />
        <div>
          <StarRatings
            rating={review.rateTotal}
            starRatedColor={ratingColor}
            numberOfStars={5}
            starDimension="10px"
            starSpacing="2px"
            name="rating"
          />
        </div>
      </div>
      <div className="review-item-right">
        <div className="review-item-right-header">
          <div className="review-item-right-header-title">
            {`${review.userFirstName} ${review.userLastName}`}
          </div>
          <div className="review-item-right-header-more">
            {moment(review.createdAt).format("ll")}
          </div>
        </div>
        <div className="review-item-right-content">
          Description: {review.text}
        </div>
      </div>
    </div>
  );
};

ReviewItem.propType = {
  review: PropTypes.object
};
