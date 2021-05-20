import React, { Component } from "react";
import RangeSlider from "../RangeSlider";
import onClickOutside from "react-onclickoutside";
import Input from "../Input";
import "./style.scss";

class People extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      people_min: 5,
      people_max: 300,
      people_valid_max: true,
      people_bottom_value: 5,
      people_top_value: 300
    };
  }

  componentDidMount() {
    const { people_min, people_max } = this.state;
    this.props.changeState([people_min, people_max], "people");
  }

  handleClickOutside = () => {
    const { show, people_min, people_max } = this.state;
    if (show) {
      this.props.changeState([people_min, people_max], "people");
    }
    this.setState({ show: false });
  };

  toggleModal = () => {
    const { show, people_min, people_max } = this.state;
    if (show) {
      this.props.changeState([people_min, people_max], "people");
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
      people_min,
      people_max,
      people_bottom_value,
      people_top_value,
      people_valid_max
    } = this.state;

    return (
      <div className="filter-people">
        <Input>
          <div className="filter-price-block" onClick={this.toggleModal}>
            <span className="filter-price-name">{`${people_min} - ${people_max} People`}</span>
          </div>
        </Input>
        {show && (
          <RangeSlider
            title="People range"
            type="people"
            min={people_bottom_value}
            max={people_top_value}
            validMax={people_valid_max}
            currentValue={[people_min, people_max]}
            handleRangeChange={this.handleRangeChange}
            handleInputChangeMin={this.handleInputChangeMin}
            handleInputChangeMax={this.handleInputChangeMax}
          />
        )}
      </div>
    );
  }
}
export default onClickOutside(People);
