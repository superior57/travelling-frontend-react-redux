import React, { useEffect, useState } from "react";

import Header from "../../../components/Header";
import fullLogo from "../../../assets/Full_Logo.png";
import { isAuthenticated } from "../../../redux/selectors/auth/auth.select";
import Footer from "../../../components/Footer";
import "./style.scss";
import userProof from "../../../assets/proof.svg";
import StarRatings from "react-star-ratings";

import { connect } from "react-redux";
import {
  setCurrentReviews,
  getUserById,
  sendMessage
} from "../../../redux/actions/users.actions/profile.thunk";
import { getPlacesList } from "../../../redux/actions/places.actions/places.thunk";
import moment from "moment";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import VenueFilter from "./VenueFilter";
import Filter from "../../adminDashboard/componetns/Filter";
import BackArrow from "../../../assets/icons/back-arrow.svg";
import history from "../../../history";
import Proof from "../profilePage/assets/proof.png";

const PublicProfile = ({
  setCurrentReviews,
  getPlacesList,
  venues,
  reviews,
  getUserById,
  userById,
  location,
  userData,
  sendMessage,
  answer
}) => {
  const ratingColor = "#FEDE36";
  const svgIconPath =
    "M18.4775 6.45394C18.9386 6.53911 19.1228 7.10065 18.8018 7.44236L14.869 11.6285L15.6242 17.3286C15.6855 17.7918 15.2116 18.1405 14.7876 17.9441L9.4815 15.4853L4.17539 17.9441C3.75134 18.1406 3.27734 17.7917 3.33885 17.3284L4.09557 11.6285L0.161321 7.44245C-0.159806 7.10077 0.0243432 6.53914 0.48544 6.45394L6.14542 5.40808L8.96277 0.306114C9.18819 -0.102092 9.77497 -0.102024 10.0003 0.306234L12.816 5.40808L18.4775 6.45394Z";
  const svgIconViewBox = "0 0 21 21";

  const [activePlace, setActivePlace] = useState(null);
  const [reviewsId, setReviews] = useState(null);
  const [activeType, setActiveType] = useState("");
  const [offset, setOffset] = useState(1);
  const [limit, setLimit] = useState(10);
  const [message, setMessage] = useState("");

  const [filters, setFilters] = useState({ venues: null });

  useEffect(() => {
    let param = window.location.pathname.lastIndexOf("/");
    let id = window.location.pathname.slice(param + 1);
    getPlacesList(id);
    getUserById(id);
    setActivePlace(null);
  }, [activeType, location]);

  useEffect(() => {
    if (userById?.user && userById.user.role.role_type === "Host") {
      setActiveType("venue");

      if (reviewsId !== null) {
        setCurrentReviews({
          id: reviewsId,
          limit,
          offset,
          type: "venue"
        });
      }
    }
  }, [venues, reviewsId, activeType]);

  useEffect(() => {
    let param = window.location.pathname.lastIndexOf("/");
    let id = window.location.pathname.slice(param + 1);
    if (userById?.user && userById.user.role.role_type === "Guest") {
      setActivePlace(true);
      setActiveType("guest");
      setCurrentReviews({
        id,
        limit,
        offset,
        type: "guest"
      });
    }
  }, [userById]);

  const onClickPlaces = (currentName, currentId, index) => {
    setActivePlace(index);
    setReviews(currentId);
  };

  const handlePageChange = pageNumber => {
    setOffset(pageNumber);
  };
  const goBack = () => {
    history.goBack();
  };

  const handlerSend = event => {
    sendMessage(event.target.name, message);
  };

  const handlerSendChange = ({ target }) => {
    setMessage(target.value);
  };

  return (
    <div className="wrapper public-profile">
      <Header
        classes={"home_header"}
        fullLogo={fullLogo}
        isAuthenticated={isAuthenticated}
        find={true}
      />
      <h1 className="page-name">
        <img className={"back-arrow"} onClick={goBack} src={BackArrow} alt="" />
        Public Profile
      </h1>

      <div className="PublicProfilePage">
        {userById && (
          <section className={"wrapper-user-info"}>
            <section className="user-info">
              <div className="user-info__data">
                <div className="user-info__person">
                  <img
                    src={userById?.user?.image}
                    className="user-info__image"
                    alt=""
                  />
                  <div className="user-info__name">
                    {userById?.user?.first_name} {userById?.user?.last_name}
                  </div>
                </div>
                <div className="user-info__statistic">
                  <div className="user-info__rating">
                    <div className="user-info__reviews">
                      Reviews ({userById?.user?.reviews || 0})
                    </div>
                    <StarRatings
                      rating={userById?.user?.rating || 0}
                      starRatedColor={ratingColor}
                      numberOfStars={5}
                      starDimension="19px"
                      starSpacing="3px"
                      name={"userRating"}
                      svgIconPath={svgIconPath}
                      svgIconViewBox={svgIconViewBox}
                    />
                  </div>
                  {/*<img className="user-info__proof" src={userProof} />*/}
                  <img
                    className="user-info__proof"
                    src={
                      userById && userById?.user?.isPhoneValid
                        ? userProof
                        : Proof
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="user-info__about user-about">
                <h4 className="user-about__title">About me</h4>
                <div className="user-about__text">
                  {userById?.user?.description}
                </div>
              </div>
            </section>
          </section>
        )}

        <section className="user-reviews">
          <div className={"wrapper-starRating"}>
            {userById?.user.role.role_type === "Host" && (
              <>
                <VenueFilter
                  handlerFilterChange={onClickPlaces}
                  type={"venue"}
                  checkUseFilter={filters.venues}
                  label={"select venue"}
                  list={venues && venues.buildings}
                />
                <StarRatings
                  className="place-reviews__rating"
                  rating={
                    venues.buildings &&
                    Number(venues.buildings[activePlace]?.rating || 0)
                  }
                  starRatedColor={ratingColor}
                  numberOfStars={5}
                  starDimension="19px"
                  starSpacing="3px"
                  name={"placeRating"}
                  svgIconPath={svgIconPath}
                  svgIconViewBox={svgIconViewBox}
                />
              </>
            )}
          </div>

          {/*{console.log(venues.buildings && activePlace !== null && venues.buildings[activePlace]?.city?.city_name ,  activeType )}*/}

          {activePlace !== null && activeType === "venue" && (
            <div className="user-reviews__places user-places">
              <div className="place-reviews__info">
                <div className="place-reviews__place">
                  <div className="place-reviews__location">
                    {venues.buildings &&
                      venues.buildings[activePlace]?.city?.city_name +
                        ", " +
                        venues.buildings[activePlace]?.address?.zip_code +
                        " " +
                        venues.buildings[activePlace]?.address?.street}
                  </div>
                  {venues.buildings && (
                    <div className="place-reviews__photo">
                      <img src={venues.buildings[activePlace]?.image} alt="" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {activePlace !== null && (
            <div className="user-reviews__reviews place-reviews">
              <h3 className="user-places__title">
                Reviews from {activeType === "venue" ? "guest" : "host"} (
                {reviews?.count || 0})
              </h3>

              {reviews &&
                reviews.rows.map(review => (
                  <div
                    key={review.id}
                    className="place-reviews__item place-reviews-item"
                  >
                    <StarRatings
                      className="place-reviews-item__rating"
                      rating={review.rateTotal}
                      starRatedColor={ratingColor}
                      numberOfStars={5}
                      starDimension="12px"
                      starSpacing="2px"
                      name={"placeRating"}
                      svgIconPath={svgIconPath}
                      svgIconViewBox={svgIconViewBox}
                    />
                    <div className="place-reviews-item__text">
                      {review.text}
                    </div>
                    <div className="place-reviews-item__info">
                      <div className="place-reviews-item__person place-reviews-person">
                        <img
                          className="place-reviews-person__image"
                          src={review.userReview.image}
                          alt=""
                        />
                        {/*review.userId*/}
                        <div className="place-reviews-person__name">
                          <Link
                            to={{
                              pathname: `/user/${review.authorId}`,
                              state: {
                                type: review.type === "Venue" ? "user" : "venue"
                              }
                            }}
                          >
                            {review.userFirstName + " " + review.userLastName}
                          </Link>
                        </div>
                      </div>
                      <div className="place-reviews-item__date">
                        {moment(review.createdAt).format("ll")}
                      </div>
                    </div>
                    {!review.answer ? (
                      <div className={""}>
                        {answer && (
                          <p className={"reply-answer"}>
                            <span>Reply:</span> {answer}
                          </p>
                        )}
                        {!answer && (
                          <div className={"reply-wrapper"}>
                            <input
                              className={"reply-input"}
                              placeholder={"Send reply"}
                              onChange={handlerSendChange}
                              type="text"
                            />
                            <button name={review.id} onClick={handlerSend}>
                              Reply
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className={"reply-answer"}>
                        <span>Reply:</span> {review.answer}
                      </p>
                    )}

                    {/*<button className={''} onClick={handlerReply}>reply</button>*/}
                  </div>
                ))}
            </div>
          )}
        </section>
      </div>
      {/*<Pagination*/}
      {/*  activePage={offset}*/}
      {/*  totalItemsCount={reviews?.count}*/}
      {/*  itemClass={"item-pagination"}*/}
      {/*  onChange={handlePageChange}*/}
      {/*  itemClassPrev={"prev"}*/}
      {/*  itemClassNext={"next"}*/}
      {/*  prevPageText="Previous"*/}
      {/*  nextPageText="Next"*/}
      {/*/>*/}
      <Footer />
    </div>
  );
};
const mapStateToProps = state => {
  return {
    userData: state.profile.user,
    userById: state.profile.userById,
    venues: state.place.places,
    reviews: state.profile.reviews,
    answer: state.profile.answer
  };
};

export default connect(mapStateToProps, {
  setCurrentReviews,
  getPlacesList,
  getUserById,
  sendMessage
})(PublicProfile);
