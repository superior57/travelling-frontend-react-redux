import React, { Component } from 'react';
import Advantages from '../../../../../components/Advantages';
import PropTypes from 'prop-types';
import SeparateLine from '../../../../../components/SeparateLine';
import Amenities from '../../../../../components/Amenities';
import Avatar from '../../../../../components/Avatar';
import './style.scss';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

class Description extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAmenities: false
    };
  }

  toggleShowAmenities = () => {
    this.setState((prevState) => ({ showAmenities: !prevState.showAmenities }));
  };

  get renderAdvantages() {
    const { advantages } = this.props;
    return (
      <ul className="advantages-items">
        <Advantages advantages={advantages} max={3} />
      </ul>
    );
  }

  render() {
    const { amenities } = this.props;
    const { showAmenities } = this.state;

    return (
      <div>
        <div className="advantages text-content">
          <div>{this.renderAdvantages}</div>
          <div className="advantages-container">
            <Avatar width={155} height={155} />
            <div className="advantages-container-owner-row">Owner</div>
          </div>
        </div>
        <SeparateLine />
        {!!amenities.length && (
          <div className="included">
            <h1>Included in your booking</h1>
            <ul className="amenities">
              <Amenities amenities={amenities} max={3} />
            </ul>
            <span className="included-amenities-count" onClick={this.toggleShowAmenities}>
              See all: {amenities.length}
            </span>

            <Modal isOpen={showAmenities} toggle={this.toggleShowAmenities}>
              <ModalHeader toggle={this.toggleShowAmenities}>Included in your booking</ModalHeader>
              <ModalBody className="included-amenitiesModal">
                <Amenities amenities={amenities} max={Infinity} all={true} />
              </ModalBody>
            </Modal>
          </div>
        )}
      </div>
    );
  }
}

Description.propTypes = {
  advantages: PropTypes.array,
  amenities: PropTypes.array
};

export default Description;
