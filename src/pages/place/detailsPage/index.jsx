import React from "react";
import { connect } from "react-redux";
import { getPlaceDetails } from "../../../redux/actions/places.actions/places.thunk";
import { favoriteBuilding } from "../../../redux/actions/places.actions/places.thunk";
import { getFavoriteBuilding } from "../../../redux/actions/places.actions/places.thunk";
import { getReviews } from "../../../redux/actions/reviews.actions/reviews.thunk";
import { selectOperatingHours } from "../../../redux/selectors/places/places.select";
import { getMoreReviews } from "../../../redux/actions/reviews.actions/reviews.thunk";
import { cleanUpMoreReview } from "../../../redux/actions/reviews.actions/reviews.actions";
import { askUserReview } from "../../../redux/actions/reviews.actions/reviews.thunk";
import { askHostReview } from "../../../redux/actions/reviews.actions/reviews.thunk";
import { getFavoriteState } from "../../../redux/selectors/places/places.select";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Spinner from "reactstrap/lib/Spinner";
import "./style.scss";

import { isAuthenticated } from "../../../redux/selectors/auth/auth.select";
import {
  getReviewsFromState,
  getMoreReviewsFromState
} from "../../../redux/selectors/reviews";
import StartBooking from "../../../components/container/StartBooking";
import RulesPlace from "./components/RulesPlace";
import PhotoTiles from "./components/PhotoTiles";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

import GeneralIntro from "./components/GeneralIntro";

import GeneralIntroMobile from "./components/Mobile/GeneralIntro-mobile";
import StartBookingMobile from "./components/Mobile/StartBooking-mobile";

import Features from "./components/Features";
import PlaceDetails from "./components/PlaceDetails";
import { ReviewItem } from "./components/Reviews/ReviewItem";
import fullLogo from "../../../assets/Full_Logo.png";
import FeaturesMobile from "./components/Mobile/Features-mobile";

const LIMIT_REVIEWS = 4;
const LIMIT_ON_PAGE = 10;
const TYPE_REVIEWS = "venue";

class DetailsPage extends React.PureComponent {
  state = {
    details: null,
    isModal: false,
    modalPageNumber: 0,

    validDateRange: true,
    innerWidth: 0,
    mobileType: false,
    width: 0
  };

  updateDimensions = () => {
    this.setState({ width: window.innerWidth });
    const breakpoint = 1440;

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
    const breakpoint = 1440;
    if (window.innerWidth < breakpoint) {
      this.setState({
        mobileType: true
      });
    }

    window.addEventListener("resize", this.updateDimensions);

    const { id } = this.props.match.params;

    this.props.getPlaceDetails(id);
    this.props.getReviews(id, 1, LIMIT_REVIEWS, TYPE_REVIEWS);
    this.props.getFavoriteBuilding(id);
    this.props.cleanUpMoreReview();
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.match.params;
    if (id !== prevProps.match.params.id) {
      this.props.getPlaceDetails(id);
      this.props.getReviews(id, 1, LIMIT_REVIEWS, TYPE_REVIEWS);
      this.props.getFavoriteBuilding(id);
      this.setState({ modalPageNumber: 0 });
    }
  }

  onToggleModal = () => {
    const { id } = this.props.match.params;

    if (this.state.modalPageNumber === 0) {
      this.props.getMoreReviews(id, 1, LIMIT_ON_PAGE, TYPE_REVIEWS);
      this.setState({ modalPageNumber: 1 });
    }

    this.setState(state => ({ isModal: !state.isModal }));
  };

  renderMoreReviews = () => {
    return this.props.moreReviews.rows.map(review => (
      <ReviewItem review={review} key={review.id} />
    ));
  };

  handleModalScroll = e => {
    let bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if (bottom) {
      const { id } = this.props.match.params;
      const newPage = this.state.modalPageNumber + 1;

      this.props.getMoreReviews(id, newPage, LIMIT_ON_PAGE, TYPE_REVIEWS);
      this.setState({ modalPageNumber: newPage });
    }
  };

  render() {
    const {
      isAuthenticated,
      place,
      reviews,
      moreReviews,
      favoriteBuilding,
      isFavorite,
      operatingHours,
      match
    } = this.props;
    const { id } = match.params;
    return (
      <>
        <div className="wrapper DetailsPage">
          <div className="wrapper">
            <Header
              classes={"home_header"}
              fullLogo={fullLogo}
              isAuthenticated={isAuthenticated}
              find={true}
            />
          </div>
          {place ? (
            <div className="booking-page details">
              <div className="booking-page__wrapper details">
                <PhotoTiles mainImage={place?.image} images={place.images} />
                <div className="booking-page__content details">
                  {place && (
                    <GeneralIntro
                      title={place.name}
                      isAuth={isAuthenticated}
                      isFavorite={isFavorite}
                      favoriteBuilding={favoriteBuilding}
                      rating={place.rating}
                      address={place.address}
                      city={place.city}
                      reviewsCount={(reviews && reviews.count) || 0}
                    />
                  )}
                  <Features
                    title="Amenities"
                    cardData={place.amenities}
                    showRightMenu={true}
                  />
                  <Features
                    title="Special Features"
                    cardData={place.specialFeatures}
                  />
                  <PlaceDetails content={place.aboutspace} />
                  <RulesPlace rules={place.rulemsg} />
                </div>
              </div>
              <div className={"booking-page__sidebar details"}>
                <StartBooking
                  placeId={id}
                  operatingHours={operatingHours}
                  price={place.price}
                  mobileType={this.state.mobileType}
                />
              </div>
            </div>
          ) : (
            <Spinner />
          )}
          <Footer />

          <Modal
            className="reviews-modal"
            isOpen={this.state.isModal}
            className="reviews-modal"
            scrollable={true}
            toggle={this.onToggleModal}
          >
            <ModalHeader style={{ textAlign: "center" }}>
              All reviews
            </ModalHeader>
            {moreReviews && (
              <ModalBody onScroll={this.handleModalScroll}>
                {this.renderMoreReviews()}
              </ModalBody>
            )}
          </Modal>
        </div>

        <div className="wrapper DetailsPage-mobile">
          <div className="wrapper">
            <Header
              classes={"home_header"}
              fullLogo={fullLogo}
              isAuthenticated={isAuthenticated}
              find={true}
            />
          </div>
          {place ? (
            <div className="booking-page details">
              <div className="booking-page__wrapper details">
                <PhotoTiles mainImage={place?.image} images={place.images} />
                <div className="booking-page__content details">
                  {place && (
                    <GeneralIntroMobile
                      price={place.price}
                      title={place.name}
                      isAuth={isAuthenticated}
                      isFavorite={isFavorite}
                      favoriteBuilding={favoriteBuilding}
                      rating={place.rating}
                      address={place.address}
                      city={place.city}
                      reviewsCount={(reviews && reviews.count) || 0}
                    />
                  )}

                  <div className={"booking-page__sidebar details"}>
                    <StartBookingMobile
                      placeId={id}
                      operatingHours={operatingHours}
                      price={place.price}
                      mobileType={this.state.mobileType}
                    />
                  </div>
                </div>

                <FeaturesMobile
                  title="Amenities"
                  cardData={place.amenities}
                  showRightMenu={true}
                />

                <Features
                  title="Special Features"
                  cardData={place.specialFeatures}
                />
                <PlaceDetails content={place.aboutspace} />
                <RulesPlace rules={place.rulemsg} />
              </div>
            </div>
          ) : (
            <Spinner />
          )}
          <Footer />

          <Modal
            className="reviews-modal"
            isOpen={this.state.isModal}
            className="reviews-modal"
            scrollable={true}
            toggle={this.onToggleModal}
          >
            <ModalHeader style={{ textAlign: "center" }}>
              All reviews
            </ModalHeader>
            {moreReviews && (
              <ModalBody onScroll={this.handleModalScroll}>
                {this.renderMoreReviews()}
              </ModalBody>
            )}
          </Modal>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    place: state.place.placeDetails,
    isAuthenticated: isAuthenticated(state),
    reviews: getReviewsFromState(state),
    moreReviews: getMoreReviewsFromState(state),
    isFavorite: getFavoriteState(state),
    operatingHours: selectOperatingHours(state)
  };
};

export default connect(mapStateToProps, {
  getPlaceDetails,
  getReviews,
  getMoreReviews,
  cleanUpMoreReview,
  favoriteBuilding,
  getFavoriteBuilding,
  askUserReview,
  askHostReview
})(DetailsPage);
