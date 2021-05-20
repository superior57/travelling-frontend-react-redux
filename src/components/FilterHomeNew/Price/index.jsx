import React, { Component } from "react";
import RangeSlider from "../RangeSlider";
import onClickOutside from "react-onclickoutside";
import Input from "../Input";
import "./style.scss";

class Price extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      price_min: parseInt(this.props.price[0]) || 100,
      price_max: parseInt(this.props.price[1]) || 5000,
      price_valid_max: true,
      price_bottom_value: 100,
      price_top_value: 5000
    };
  }

  handleClickOutside = () => {
    const { show, price_min, price_max } = this.state;
    if (show) {
      this.props.changeState([price_min, price_max], "price");
    }
    this.setState({ show: false });
  };

  toggleModal = () => {
    const { show, price_min, price_max } = this.state;
    if (show) {
      this.props.changeState([price_min, price_max], "price");
    }
    this.setState({ show: !show });
  };
  handleRangeChange = (type, value) => {
    this.setState({
      [`${type}_min`]: value[0],
      [`${type}_max`]: value[1]
    });
  };

  handleInputChangeMin = (evt, type) => {
    if (
      isNaN(evt.target.value) ||
      parseInt(evt.target.value) > this.state[`${type}_max`]
    ) {
      return;
    }

    if (evt.target.value === "") {
      this.setState({
        [`${type}_min`]: this.state[`${type}_bottom_value`]
      });
      return;
    }

    this.setState({
      [`${type}_min`]: parseInt(evt.target.value)
    });
  };

  handleInputChangeMax = (evt, type) => {
    if (isNaN(evt.target.value)) {
      return;
    }

    if (parseInt(evt.target.value) < this.state[`${type}_min`]) {
      this.setState({
        [`${type}_valid_max`]: false,
        canSearch: false
      });
    } else {
      this.setState({
        [`${type}_valid_max`]: true
      });
    }

    if (evt.target.value === "") {
      this.setState({
        [`${type}_max`]: this.state[`${type}_max`]
      });
      return;
    }

    this.setState({
      [`${type}_max`]: parseInt(evt.target.value)
    });
  };

  render() {
    const {
      show,
      price_min,
      price_max,
      price_bottom_value,
      price_top_value,
      price_valid_max
    } = this.state;

    return (
      <div className="filter-people">
        <Input>
          <div className="filter-price-block" onClick={this.toggleModal}>
            <span className="filter-price-name">{`${price_min} - ${price_max} Price`}</span>
          </div>
        </Input>
        {show && (
          <RangeSlider
            title="Price range"
            type="price"
            min={price_bottom_value}
            max={price_top_value}
            validMax={price_valid_max}
            currentValue={[price_min, price_max]}
            handleRangeChange={this.handleRangeChange}
            handleInputChangeMin={this.handleInputChangeMin}
            handleInputChangeMax={this.handleInputChangeMax}
          />
        )}
      </div>
    );
  }
}
export default onClickOutside(Price);
