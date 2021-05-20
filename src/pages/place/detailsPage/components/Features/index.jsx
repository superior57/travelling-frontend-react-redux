import React, { Component } from "react";
import PropTypes from "prop-types";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import SeparateLine from "../../../../../components/SeparateLine";
import "./style.scss";

class Features extends Component {
  render() {
    const { title, showRightMenu, cardData } = this.props;
    return (
      <div className="special-features">
        <div className="special-features-card-header">
          <div className="heading-2">{title}</div>
          {showRightMenu && <div className="body-2">Show all 32 amenities</div>}
        </div>
        <Row className="separate-line">
          {[...cardData].map((feature, i) => (
            <Col
              sm="2"
              md="2"
              xs={"4"}
              className="special-features-card"
              key={`feature-${i}`}
            >
              <img
                className="special-features-card-img"
                src={feature.path}
                alt="feature"
              />
              <div>
                <span className="special-features-card-text body-2">
                  {feature.name}
                </span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

Features.propTypes = {
  title: PropTypes.string,
  cardData: PropTypes.array
};

export default Features;
