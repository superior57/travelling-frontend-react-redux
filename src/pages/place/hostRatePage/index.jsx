import React from "react";
import jwtDecode from "jwt-decode";

import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { addNewReviewForUser } from "../../../redux/actions/reviews.actions/reviews.thunk";
import { getAddHostReviewState } from "../../../redux/selectors/reviews";

import Avatar from "../../../components/Avatar/index";
import StarsRating from "../../../components/StarsRating/index";
import likeImg from "./assets/like.svg";
import disImg from "./assets/dislike.svg";
import likeFill from "./assets/like-fill.svg";
import disFill from "./assets/dis-fill.svg";

import "./style.scss";

class HostRatePage extends React.PureComponent {
  constructor(props) {
    super(props);
    const { user_id, host_id, host_name } = jwtDecode(
      this.props.match.params.token
    );

    this.state = {
      accuracy: 0,
      observance: 0,
      cleanliness: 0,
      communication: 0,
      text: "",
      recommend: 0,
      user_id,
      host_id,
      host_name
    };
  }

  handleChangeStar = (newRating, name) => {
    this.setState({ [name]: newRating });
  };

  handleChangeLike = number => {
    this.setState({ recommend: number });
  };

  handleChangeText = event => {
    this.setState({ text: event.target.value });
  };

  redirect = () => {
    alert("added");
    return <Redirect to="/" />;
  };

  render() {
    const {
      cleanliness,
      communication,
      observance,
      recommend,
      hostName
    } = this.state;
    return (
      <div className="rate">
        <h1 className="rate-headline">Rate and review</h1>
        <div className="rate-user-block">
          <Avatar width={"162px"} heigth={"158px"} />
          <span className="rate-user-name">Host name{hostName}</span>
        </div>
        <div className="rate-describe-block">
          <h1 className="rate-describe-headline">Describe your experience</h1>
          <p className="rate-describe-tagline">
            Your review will be public on your hosts’s profile
          </p>
          <textarea
            className="rate-text"
            placeholder="What was it like to host this guest"
            value={this.state.text}
            onChange={this.handleChangeText}
          ></textarea>
        </div>

        <div className="rate-star-block">
          <h1 className="rate-star-headline">Cleanliness</h1>
          <p className="rate-star-tagline">
            Did the cleanliness match your expectations of the place?
          </p>
          <StarsRating
            rate={cleanliness}
            name={"cleanliness"}
            func={this.handleChangeStar}
          />
        </div>
        <div className="rate-star-block">
          <h1 className="rate-star-headline">Communication</h1>
          <p className="rate-star-tagline">
            How responsive and accessible was the host before and during your
            stay?
          </p>
          <StarsRating
            rate={communication}
            name={"communication"}
            func={this.handleChangeStar}
          />
        </div>
        <div className="rate-star-block">
          <h1 className="rate-star-headline"> Observance of house rules</h1>
          <p className="rate-star-tagline">
            Did the guest observe the house rules you provided?
          </p>
          <StarsRating
            rate={observance}
            name={"observance"}
            func={this.handleChangeStar}
          />
        </div>
        <div className="rate-recommend-block">
          <h1 className="rate-star-headline">
            Would you recommend this guest?
          </h1>
          <div className="rate-recommend-events">
            <div
              className="rate-event-container"
              onClick={() => {
                this.handleChangeLike(1);
              }}
            >
              <img
                src={recommend === 1 ? disFill : disImg}
                alt="arm"
                className="rate-recommend-img"
              />
              <span className="rate-recommend-event">No</span>
            </div>
            <div
              className="rate-event-container"
              onClick={() => {
                this.handleChangeLike(2);
              }}
            >
              <img
                src={recommend === 2 ? likeFill : likeImg}
                alt="arm"
                className="rate-recommend-img"
              />
              <span className="rate-recommend-event">Yes!</span>
            </div>
          </div>
        </div>
        <button
          className="rate-submit"
          onClick={() => {
            this.props.addNewReviewForUser(this.state);
          }}
        >
          Submit
        </button>
        {this.props.addedReview && this.redirect()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    addedReview: getAddHostReviewState(state)
  };
};

const RatePageWithRouter = withRouter(HostRatePage);

export default connect(mapStateToProps, {
  addNewReviewForUser
})(RatePageWithRouter);
