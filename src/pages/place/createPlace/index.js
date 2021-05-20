import React from "react";
import { connect } from "react-redux";
import { getPlaceDetails } from "../../../redux/actions/places.actions/places.thunk";
import { changeStep } from "../../../redux/actions/places.actions/places.actions";
import { isAuthenticated } from "../../../redux/selectors/auth/auth.select";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import "./style.scss";
import BasicInfo from "./basicinfo/basicinfo";
import AddMedia from "./addmedia/add-media";
import BackArrow from "../../../assets/icons/back-arrow.svg";
import history from "../../../history";

class CreatePlace extends React.PureComponent {
  state = {
    details: null,
    isOpen: false,
    step: 1
  };

  handlerClick = ({ target }) => {
    const step = target.getAttribute("data-step");
    changeStep(step);
  };

  getStep = step => {
    this.setState({
      step: step
    });
  };

  goBack = () => {
    history.goBack();
  };

  render() {
    const { isAuthenticated } = this.props;
    return (
      <div className="create-place">
        {/* <div className="create-place-header-section">
          <Header isAuthenticated={isAuthenticated} find={true} />
        </div> */}
        <main className="create-place-container">
          <div className="create-place-container-header">
            <img
              className={"back-arrow"}
              onClick={this.goBack}
              src={BackArrow}
              alt=""
            />
            Add a Venue
            <span className="create-place-container-header-border mobile-hidden"></span>
            <span
              onClick={this.handlerClick}
              data-step={1}
              className={
                "create-place-container-header-stepsection" +
                (this.props.currentStep === 1 ? " active" : "") +
                " mobile-hidden"
              }
            >
              Step 1
            </span>
            <span className="create-place-container-header-stepsection mobile-hidden">
              {" "}
              &nbsp; &gt; &nbsp;{" "}
            </span>
            <span
              onClick={this.handlerClick}
              data-step={2}
              className={
                "create-place-container-header-stepsection" +
                (this.props.currentStep === 2 ? " active" : "") +
                " mobile-hidden"
              }
            >
              Step 2
            </span>
            {/* <span className="create-place-container-header-stepsection">
              {" "}
              &nbsp; &gt; &nbsp;{" "}
            </span>
            <span
              className={
                "create-place-container-header-stepsection " +
                (this.state.step === 3 ? "active" : "")
              }
            >
              Step 3
            </span> */}
          </div>
          <div className="create-place-container-subheader">
            Fill quick information about venue
          </div>
          <div className="create-place-container-steps">
            <div
              className={
                "create-place-container-header-stepsection-mobile desktop-hidden" +
                (this.props.currentStep === 1 ? " active" : "")
              }
            >
              1
            </div>
            <div
              onClick={this.handlerClick}
              data-step={1}
              className={
                "create-place-container-header-stepsection  desktop-hidden" +
                (this.props.currentStep === 1 ? " active" : "")
              }
            >
              Step 1
            </div>
            <div className="create-place-container-header-stepsection-line"></div>
            <div className="create-place-container-header-stepsection-mobile desktop-hidden">
              2
            </div>
            <div
              onClick={this.handlerClick}
              data-step={2}
              className={
                "create-place-container-header-stepsection  desktop-hidden" +
                (this.props.currentStep === 2 ? " active" : "")
              }
            >
              Step 2
            </div>
          </div>
          <div className="create-place-container-border  mobile-hidden" />
          <div className="create-place-container-venuesection">
            <BasicInfo step={this.getStep} />
            {/* <AddMedia /> */}
          </div>
        </main>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: isAuthenticated(state),
    currentStep: state.place.currentStep
  };
};

export default connect(mapStateToProps, { getPlaceDetails, changeStep })(
  CreatePlace
);
