import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Spinner, Row } from 'reactstrap';
import Avatar from '../Avatar';
import starPng from './assets/star.png';
import checkOng from './assets/checkmark.png';
import unCheckOng from './assets/uncheck.png';
import moment from 'moment';

export default class Reviews extends Component {
  render() {
    const { reviews } = this.props;
    return (
      <div className="reviews">
        <h1>Reviews ({(reviews && reviews.count) || 0})</h1>
        {reviews.rows ? (
          reviews.rows.map((review) => (
            <Row key={review.id} className="reviews-row">
              <Avatar href={review.img} width={'77px'} height={'77px'} />
              <div className="reviews-row-info">
                <span className="reviews-row-info-name">{review.user.first_name}</span>
                <span className="reviews-row-info-date">
                  {review.date && moment(review.date).format('MMMM yyyy')}
                </span>
                <div className="reviews-row-info-rate">
                  <span className="reviews-row-info-rate-star">
                    <img src={starPng} alt="star" />
                    {review.rate}
                  </span>
                  {review.rate > 3 ? (
                    <span className="reviews-row-info-rate-recommend">
                      <img src={checkOng} alt="check" />
                      <span>Yes, I would book again</span>
                    </span>
                  ) : (
                    <span className="reviews-row-info-rate-recommend unCheck">
                      <img src={unCheckOng} alt="uncheck" />
                      <span>No,I would not book again</span>
                    </span>
                  )}
                </div>
                <span className="reviews-row-info-comment">{review.text}</span>
              </div>
            </Row>
          ))
        ) : (
          <Spinner className="spinner-icon" color="primary" />
        )}
      </div>
    );
  }
}

Reviews.propTypes = {
  reviews: PropTypes.object
};
