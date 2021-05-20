import React from 'react';
import StarRatings from 'react-star-ratings';

const StarsRating = (props) => {
  const { name, rate, func } = props;
  return (
    <StarRatings
      rating={rate}
      starRatedColor="#66f3da"
      starHoverColor="#66f3da"
      starEmptyColor="#CCCCCC"
      starWidthAndHeight={'35px'}
      changeRating={func}
      numberOfStars={5}
      name={name}
    />
  );
};
export default StarsRating;
