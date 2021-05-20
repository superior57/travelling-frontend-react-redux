import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SliderBlock from '../../SliderBlock';
import { selectSimilarPlaces } from '../../../redux/selectors/places/places.select';
import { getSimilarPlaces } from '../../../redux/actions/places.actions/places.thunk';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.scss';

const mapStateToProps = (state) => {
  return { similarPlaces: selectSimilarPlaces(state) };
};

const LIMIT_PLACES = 10;

class SimilarPlaces extends Component {
  componentDidMount() {
    if (!this.props.similarPlaces) {
      this.props.getSimilarPlaces(this.props.id, 0, LIMIT_PLACES);
    }
  }

  render() {
    const { similarPlaces } = this.props;

    return (
      <div className="similar-places">
        <h1 className="similar-places-headline">Similar spaces you might also be interested in </h1>
        {similarPlaces && <SliderBlock places={similarPlaces.rows} />}
      </div>
    );
  }
}

SimilarPlaces.propType = {
  id: PropTypes.string
};

export default connect(mapStateToProps, { getSimilarPlaces })(SimilarPlaces);
