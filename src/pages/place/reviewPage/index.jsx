import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./style.scss";
import { addNewReviewForVenue } from "../../../redux/actions/reviews.actions/reviews.thunk";
import { getAddVenueReviewState } from "../../../redux/selectors/reviews";
import StarRatings from "react-star-ratings";
import { MsgDialog } from "./components/MsgForm";

class Review extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userId: 0,
      reservationId: 0,
      isRecommend: null,
      cleanliness: 0,
      communication: 0,
      observance: 0,
      text: "",
      totalRate: 0,
      errors: false
    };
  }

  handleChangeStar = (newRating, name) => {
    this.setState({ [name]: newRating });
  };

  handleChangeText = event => {
    this.setState({ text: event.target.value });
  };

  componentDidMount() {
    const userId =
      this.getUrlParameter("userid", 1) || localStorage.getItem("id");
    const reservationId = this.getUrlParameter("reservationid", 2);

    this.setState({
      reservationId: parseInt(reservationId),
      userId: parseInt(userId)
    });
  }

  componentWillUpdate(nextProps, nextState) {
    const setTotalRate = (
      (nextState.cleanliness + nextState.communication + nextState.observance) /
      3
    ).toFixed(2);
    this.setState({ totalRate: setTotalRate });
  }

  checkErrors = () => {
    const errors =
      this.state.cleanliness != 0 &&
      this.state.communication != 0 &&
      this.state.observance != 0 &&
      this.state.isRecommend != null;
    if (!errors) this.setState({ errors: true });
    return errors;
  };

  getUrlParameter(sParam, item) {
    return window.location.pathname
      .split("&")
      [item].substring(sParam)
      .split("=")[1];
    //
    // let sPageURL = window.location.search.substring(1),
    // sURLVariables = sPageURL.split("&"),
    // sParameterName,
    // i;
    // for (i = 0; i < sURLVariables.length; i++) {
    //   sParameterName = sURLVariables[i].split("=");
    //   if (sParameterName[0] === sParam) {
    //     return sParameterName[1] === undefined
    //       ? true
    //       : decodeURIComponent(sParameterName[1]);
    //   }
    // }
  }

  submitReview = () => {
    if (this.checkErrors()) this.props.addNewReviewForVenue(this.state);
  };

  render() {
    const { isRecommend, totalRate, errors } = this.state;

    const ratingItems = [
      {
        id: 1,
        name: "cleanliness",
        value: "Cleanliness"
      },
      {
        id: 2,
        name: "communication",
        value: "Communication"
      },
      {
        id: 3,
        name: "observance",
        value: "Observance"
      }
    ];

    const ratingColor = "#078089";
    
    return (      
      <div className={"review"}>
        <h2 className={"review__title"}>Review of the place </h2>
        <div className={"review__form review-form"}>
          <div className={"review__content review-content"}>
            <div className={"review-content__question question"}>
              <div className={"question__text"}>
                1. Would you recommend this place to other people?
                {isRecommend === null && errors ? (
                  <span className={"review-content__error"}>*</span>
                ) : (
                  ""
                )}
              </div>
              <div className={"question__buttons"}>
                <input
                  className={"question__button_input"}
                  type="radio"
                  id="recomended-yes"
                  name={"recomended"}
                  onChange={() => this.setState({ isRecommend: true })}
                />
                <label
                  htmlFor="recomended-yes"
                  className={"question__button question__button_yes"}
                >
                  Yes
                </label>
                <input
                  className={"question__button_input"}
                  type="radio"
                  id="recomended-no"
                  name={"recomended"}
                  onChange={() => this.setState({ isRecommend: false })}
                />
                <label
                  htmlFor="recomended-no"
                  className={"question__button question__button_no"}
                >
                  No
                </label>
              </div>
            </div>

            <div className={"review-content__question question"}>
              <div className={"question__text"}>
                2. Evaluate the quality of the service in three ways
              </div>
              <div className={"question__rating rating"}>
                {ratingItems.map((item, index) => {
                  return (
                    <div key={item.id} className={"rating__item"}>
                      <div className={"rating__text"}>
                        {item.value}
                        {this.state[item.name] === 0 && errors ? (
                          <span className={"review-content__error"}>*</span>
                        ) : (
                          ""
                        )}
                      </div>

                      <StarRatings
                        rating={this.state[item.name]}
                        starRatedColor={ratingColor}
                        changeRating={this.handleChangeStar}
                        numberOfStars={5}
                        starDimension="18px"
                        starSpacing="3px"
                        name={item.name}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={"review-content__question question"}>
              <div className={"question__text"}>3. Add a few words</div>
              <textarea
                className={"question__textarea"}
                value={this.state.text}
                onChange={this.handleChangeText}
              />
            </div>

            <div className={"review-content__total"}>
              Total rate: {totalRate > 0 ? totalRate : "---"}
            </div>
          </div>
          <div className={"review-form__publish"}>
            <button
              className={"review-form__button"}
              onClick={() => {
                this.submitReview();
              }}
            >
              Publish
            </button>
            {errors && (
              <div className="review-content__error">
                Please complete all required fields
              </div>
            )}
            <MsgDialog resolve={this.props.addedReview} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    addedReview: getAddVenueReviewState(state)
  };
};

const mapDispatchToProps = {
  addNewReviewForVenue
};

const RatePageWithRouter = withRouter(Review);

export default connect(mapStateToProps, mapDispatchToProps)(RatePageWithRouter);
