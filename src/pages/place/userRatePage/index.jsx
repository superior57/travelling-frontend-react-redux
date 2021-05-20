import React from "react";
import jwtDecode from "jwt-decode";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ReactPlayer from "react-player";

import { addNewReviewForBuilding } from "../../../redux/actions/reviews.actions/reviews.thunk";
import { addNewMediaForBuildingReview } from "../../../redux/actions/reviews.actions/reviews.thunk";
import { getAddUserReviewState } from "../../../redux/selectors/reviews";
import { getMediaUrl } from "../../../redux/selectors/reviews";
import { getStateUpload } from "../../../redux/selectors/reviews";
import PhotoDropzone from "../../../components/PhotoDropzone";
import VideoDropzone from "../../../components/VideoDropzone";
import Avatar from "../../../components/Avatar/index";
import StarsRating from "../../../components/StarsRating/index";
import likeImg from "./assets/like.svg";
import disImg from "./assets/dislike.svg";
import likeFill from "./assets/like-fill.svg";
import disFill from "./assets/dis-fill.svg";

import "./style.scss";

class UserRatePage extends React.PureComponent {
  constructor(props) {
    super(props);
    const { userId, buildingId, userName } = jwtDecode(
      this.props.match.params.token
    );

    this.state = {
      accuracy: 0,
      check_in: 0,
      cleanliness: 0,
      communication: 0,
      text: "",
      recommend: 0,
      userId,
      buildingId,
      userName,
      mediaLinks: [],
      mediaArr: [],
      upload: false,
      completed: 0,
      showVideoBtn: true
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

  getFiles = (formData, file, type) => {
    if (type === 1) {
      this.props.addNewMediaForBuildingReview(
        formData,
        this.showProgress,
        "images"
      );
    } else {
      this.setState({ showVideoBtn: false });
      this.props.addNewMediaForBuildingReview(
        formData,
        this.showProgress,
        "videos"
      );
    }
    this.setState({
      upload: true,
      mediaArr: [...this.state.mediaArr, ...file]
    });
  };

  redirect = () => {
    alert("added");
    return <Redirect to="/" />;
  };

  showProgress = progressEvent => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    this.setState({ completed: percentCompleted });
  };

  componentDidUpdate(prevProps) {
    if (this.props.mediaUrl !== prevProps.mediaUrl) {
      this.setState({
        upload: false,
        mediaLinks: [...this.state.mediaLinks, this.props.mediaUrl]
      });
    }
  }

  render() {
    const {
      accuracy,
      check_in,
      cleanliness,
      communication,
      recommend,
      userName,
      completed,
      upload,
      mediaArr,
      mediaLinks,
      showVideoBtn
    } = this.state;

    return (
      <div className="container">
        <div className="rate">
          <h1 className="rate-headline">Rate and review</h1>
          <div className="rate-user-block">
            <Avatar width={"162px"} heigth={"158px"} />
            <span className="rate-user-name">{userName}</span>
          </div>
          <div className="rate-describe-block">
            <h1 className="rate-describe-headline">Describe your experience</h1>
            <p className="rate-describe-tagline">
              Your review will be public on your guest’s profile
            </p>
            <textarea
              className="rate-text"
              placeholder="What was it like to host this guest"
              value={this.state.text}
              onChange={this.handleChangeText}
            ></textarea>
          </div>
          <div className="rate-media-block container">
            <div className="rate-media-items">
              {mediaLinks.map(item => {
                return item.type === 1 ? (
                  <img
                    key={item.link}
                    className="rate-media-preview"
                    src={item.link}
                    alt="preview"
                  />
                ) : (
                  <div className="rate-media-preview-wrapper" key={item.link}>
                    <video
                      height="224"
                      width="330"
                      preload="metadata"
                      className="rate-media-preview-video"
                      controls
                      src={item.link}
                    />
                  </div>
                );
              })}
              {upload && (
                <div className="rate-media-downloaded">
                  <div className="rate-media-downloaded-block">
                    Uploading
                    <br />
                    <span>{mediaArr[mediaArr.length - 1].name}</span>
                    <div className="rate-media-downloaded-all" />
                    <div
                      className="rate-media-downloaded-progress"
                      style={{ width: `${completed}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="rate-photo-dropzone-block">
              <div>
                Your photos of the place
                <PhotoDropzone type="rating" getFiles={this.getFiles} />
              </div>
              {showVideoBtn && (
                <div>
                  Or emded a video
                  <VideoDropzone getFiles={this.getFiles} />
                </div>
              )}
            </div>
          </div>
          <div className="rate-star-block">
            <h1 className="rate-star-headline">Accuracy</h1>
            <p className="rate-star-tagline">
              How accurately photos and discription represent the actual place??
            </p>
            <StarsRating
              rate={accuracy}
              name={"accuracy"}
              func={this.handleChangeStar}
            />
          </div>
          <div className="rate-star-block">
            <h1 className="rate-star-headline">Check In</h1>
            <p className="rate-star-tagline">
              How smooth was the check in process, within control of the host?
            </p>
            <StarsRating
              rate={check_in}
              name={"check_in"}
              func={this.handleChangeStar}
            />
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
            <h1 className="rate-star-headline"> Communication</h1>
            <p className="rate-star-tagline">
              How responsive and accessible was the host before and during your
              stay?{" "}
            </p>
            <StarsRating
              rate={communication}
              name={"communication"}
              func={this.handleChangeStar}
            />
          </div>
          <div className="rate-recommend-block">
            <h1 className="rate-star-headline">
              Would you recommend this host?
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
              this.props.addNewReviewForBuilding(this.state);
            }}
          >
            Submit
          </button>
          {this.props.addedReview && this.redirect()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    addedReview: getAddUserReviewState(state),
    mediaUrl: getMediaUrl(state),
    uploading: getStateUpload(state)
  };
};

const RatePageWithRouter = withRouter(UserRatePage);

export default connect(mapStateToProps, {
  addNewReviewForBuilding,
  addNewMediaForBuildingReview
})(RatePageWithRouter);
