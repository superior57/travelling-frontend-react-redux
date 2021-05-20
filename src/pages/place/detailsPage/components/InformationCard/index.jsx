import React from "react";
import "./style.scss";
import PropTypes from "prop-types";

class InformationCard extends React.PureComponent {
  render() {
    const { title, children } = this.props;
    return (
      <div className="information-card">
        <h1 className="information-card-title heading-2">{title}</h1>
        <div className="information-card-content">{children}</div>
      </div>
    );
  }
}

InformationCard.propTypes = {
  title: PropTypes.string,
  moreSettings: PropTypes.string
};

export default InformationCard;
