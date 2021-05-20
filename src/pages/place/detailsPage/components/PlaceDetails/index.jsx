import React, { Component } from "react";
import PropTypes from "prop-types";
import InformationCard from "../InformationCard";

class PlaceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  render() {
    return (
      <InformationCard title="Place Details">
        <div className="body-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
      </InformationCard>
    );
  }
}

PlaceDetails.propTypes = {
  aboutSpace: PropTypes.object,
  content: PropTypes.string
};

export default PlaceDetails;
