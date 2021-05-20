import React, { Component } from "react";
import DateTimePiker from "./DateTimePiker";
import Input from "../Input";
import "./style.scss";
import Calendar from "./assets/calendar.png";
import onClickOutside from "react-onclickoutside";
import moment from "moment";
import { emphasize } from "@material-ui/core";
import { Label } from "reactstrap";
import styled from "styled-components";

const StyledDatePickerWrapper = styled.div`
  @media (max-width: 320px) {
    .DateRangePicker_picker {
      &__directionLeft {
        left: -50px !important;
      }
    }
  }
`;

class Dates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      showModal: false,
      validDateRange: true,
      innerWidth: 0,
      mobileType: false,
      width: 0
    };
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth });
    const breakpoint = 1300;

    if (window.innerWidth < breakpoint) {
      this.setState({
        mobileType: true
      });
    } else {
      this.setState({
        mobileType: false
      });
    }
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  componentDidMount() {
    const breakpoint = 1300;
    if (window.innerWidth < breakpoint) {
      this.setState({
        mobileType: true
      });
    }

    window.addEventListener("resize", this.updateDimensions);
  }

  handleClickOutside = evt => {
    if (this.state.validDateRange) {
      this.setState({ showModal: false });
    } else {
      evt.stopPropagation();
    }
  };

  toggleShowModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  disableClkOutside = bool => {
    this.setState({ validDateRange: bool });
  };

  setDateTimeToParams(value) {
    if (value) {
      this.props.changeState(value.startDate, "startDate");
      this.props.changeState(value.endDate, "endDate");
      this.setState({ startDate: value.startDate, endDate: value.endDate });
    }
    this.toggleShowModal();
  }

  setInputValue = () => {
    const { startDate, endDate } = this.state;
    const firstDate = moment(startDate).format("MMM D");
    const end = moment(endDate).format("MMM D");
    const firstTime =
      firstDate + "-" + end + ", " + moment(startDate).format("h:mm a - ");
    const endTime = moment(endDate).format("h:mm a  ");

    if (firstTime !== "Invalid date" || endTime !== "Invalid date") {
      return `${firstTime}${endTime}`;
    }
    return "When?";
  };

  render() {
    const { showModal } = this.state;
    const { startDate, endDate } = this.props;

    return (
      <div className="home-searh-element-wrapper new-filter">
        <div className="filter-dates event">
          <Input>
            <div
              className="filter-dates-block"
              onClick={() => this.toggleShowModal()}
            >
              {startDate && endDate ? (
                <span className="filter-dates-block-input">
                  {this.setInputValue()}
                </span>
              ) : (
                <>
                  <div className="filter-dates-block-input__wrapper">
                    <em className="filter-dates-block-input">
                      <Label className="home-searh-label">Start Date</Label>
                      <div className="filter-dates-block-input__left-part">
                        --:--
                      </div>
                    </em>
                    <em className="filter-dates-block-input">
                      <Label className="home-searh-label">End Date</Label>
                      <div className="filter-dates-block-input__right-part">
                        --:--
                      </div>
                    </em>
                  </div>
                  <p className="filter-dates-block-input for-mobile">
                    What are you planning ?
                  </p>
                </>
              )}
            </div>
          </Input>
          {showModal && (
            <StyledDatePickerWrapper>
              <DateTimePiker
                mobileType={this.state.mobileType}
                setDateTime={value => this.setDateTimeToParams(value)}
                startDate={startDate}
                endDate={endDate}
                checkValid={this.disableClkOutside}
              />
            </StyledDatePickerWrapper>
          )}
        </div>
      </div>
    );
  }
}

export default onClickOutside(Dates);
