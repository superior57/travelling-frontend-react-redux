import React from 'react';
import StarRatings from 'react-star-ratings';
import './styles.scss';

export default function RateLabel({ rate, isLarge, reviewsSum }) {
  return (
    <div className="rate-label">
      <StarRatings rating={rate} starDimension="20px" starSpacing="2px" starRatedColor="#03fcd7" />
      <span className="sum">
        {reviewsSum}
        {isLarge && ' reviews'}
      </span>
    </div>
  );
}
