import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { ReviewItem } from "./ReviewItem";

export const Reviews = ({ reviews, onToggleModal }) => {
  if (reviews.count === 0) {
    return null;
  }

  return (
    <div className="reviews">
      <div className="header">
        <div className="heading-2">
          Reviews <span className="number">({reviews.count})</span>
        </div>
        {reviews.count > 4 && (
          <div className="header-more" onClick={onToggleModal}>
            View More
          </div>
        )}
      </div>
      <div className="content">
        {reviews.rows.map(review => (
          <ReviewItem review={review} key={review.id} />
        ))}
      </div>
    </div>
  );
};

Reviews.propType = {
  reviews: PropTypes.object,
  onToggleModal: PropTypes.func
};
