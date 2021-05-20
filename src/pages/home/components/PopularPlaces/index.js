import React from "react";

import "./index.scss";

import PlaceCard from "../../../../components/PlaceCard";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import ExploreIcon from "../../../../assets/icons/explore-icon.png";
import RectangleIcon from "../../../../assets/icons/rectangle-icon.png";
import linesLeft from "../../../../assets/icons/lines-left.png";
import linesRight from "../../../../assets/icons/lines-right.png";

import Calefornia from "../../../../assets/popular/Rectangle.png";
import Florida from "../../../../assets/popular/Rectangle (1).png";
import Texas from "../../../../assets/popular/Rectangle (2).png";
import Virginia from "../../../../assets/popular/Rectangle (3).png";
import NewJersey from "../../../../assets/popular/Rectangle (4).png";
import { connect } from "react-redux";
import { getLocation } from "../../../../redux/actions/places.actions/places.thunk";
import { getSearchPlace } from "../../../../redux/actions/places.actions/searchPlace.thunk";
import history from "../../../../history";
import NoImage from "../../../../assets/NoImage.jpg";
import HeartIcon from "../../../../assets/icons/heart-icon.png";
const settings = {
  dots: false,
  infinite: false,
  speed: 700,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        rows: 2
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4
      }
    }
  ]
};

class PopularPlaces extends React.PureComponent {
  popularPlaces = [
    {
      name: "Alabama",
      abbreviation: "AL",
      image: Calefornia
    },
    {
      name: "Alaska",
      abbreviation: "AK",
      image: Florida
    },
    {
      name: "American Samoa",
      abbreviation: "AS",
      image: Texas
    },
    {
      name: "Arizona",
      abbreviation: "AZ",
      image: Virginia
    },
    {
      name: "Arkansas",
      abbreviation: "AR",
      image: NewJersey
    },
    {
      name: "California",
      abbreviation: "CA"
    },
    {
      name: "Colorado",
      abbreviation: "CO"
    },
    {
      name: "Connecticut",
      abbreviation: "CT"
    },
    {
      name: "Delaware",
      abbreviation: "DE"
    },
    {
      name: "District Of Columbia",
      abbreviation: "DC"
    },
    {
      name: "Federated States Of Micronesia",
      abbreviation: "FM"
    },
    {
      name: "Florida",
      abbreviation: "FL"
    },
    {
      name: "Georgia",
      abbreviation: "GA"
    },
    {
      name: "Guam",
      abbreviation: "GU"
    },
    {
      name: "Hawaii",
      abbreviation: "HI"
    },
    {
      name: "Idaho",
      abbreviation: "ID"
    },
    {
      name: "Illinois",
      abbreviation: "IL"
    },
    {
      name: "Indiana",
      abbreviation: "IN"
    },
    {
      name: "Iowa",
      abbreviation: "IA"
    },
    {
      name: "Kansas",
      abbreviation: "KS"
    },
    {
      name: "Kentucky",
      abbreviation: "KY"
    },
    {
      name: "Louisiana",
      abbreviation: "LA"
    },
    {
      name: "Maine",
      abbreviation: "ME"
    },
    {
      name: "Marshall Islands",
      abbreviation: "MH"
    },
    {
      name: "Maryland",
      abbreviation: "MD"
    },
    {
      name: "Massachusetts",
      abbreviation: "MA"
    },
    {
      name: "Michigan",
      abbreviation: "MI"
    },
    {
      name: "Minnesota",
      abbreviation: "MN"
    },
    {
      name: "Mississippi",
      abbreviation: "MS"
    },
    {
      name: "Missouri",
      abbreviation: "MO"
    },
    {
      name: "Montana",
      abbreviation: "MT"
    },
    {
      name: "Nebraska",
      abbreviation: "NE"
    },
    {
      name: "Nevada",
      abbreviation: "NV"
    },
    {
      name: "New Hampshire",
      abbreviation: "NH"
    },
    {
      name: "New Jersey",
      abbreviation: "NJ"
    },
    {
      name: "New Mexico",
      abbreviation: "NM"
    },
    {
      name: "New York",
      abbreviation: "NY"
    },
    {
      name: "North Carolina",
      abbreviation: "NC"
    },
    {
      name: "North Dakota",
      abbreviation: "ND"
    },
    {
      name: "Northern Mariana Islands",
      abbreviation: "MP"
    },
    {
      name: "Ohio",
      abbreviation: "OH"
    },
    {
      name: "Oklahoma",
      abbreviation: "OK"
    },
    {
      name: "Oregon",
      abbreviation: "OR"
    },
    {
      name: "Palau",
      abbreviation: "PW"
    },
    {
      name: "Pennsylvania",
      abbreviation: "PA"
    },
    {
      name: "Puerto Rico",
      abbreviation: "PR"
    },
    {
      name: "Rhode Island",
      abbreviation: "RI"
    },
    {
      name: "South Carolina",
      abbreviation: "SC"
    },
    {
      name: "South Dakota",
      abbreviation: "SD"
    },
    {
      name: "Tennessee",
      abbreviation: "TN"
    },
    {
      name: "Texas",
      abbreviation: "TX"
    },
    {
      name: "Utah",
      abbreviation: "UT"
    },
    {
      name: "Vermont",
      abbreviation: "VT"
    },
    {
      name: "Virgin Islands",
      abbreviation: "VI"
    },
    {
      name: "Virginia",
      abbreviation: "VA"
    },
    {
      name: "Washington",
      abbreviation: "WA"
    },
    {
      name: "West Virginia",
      abbreviation: "WV"
    },
    {
      name: "Wisconsin",
      abbreviation: "WI"
    },
    {
      name: "Wyoming",
      abbreviation: "WY"
    }
  ];

  constructor(props) {
    super(props);
    this.state = {
      event: "",
      locationSelected: "",
      startDate: "",
      endDate: "",
      guests: [5, 300],
      price: ["", ""],
      skip: 0,
      offset: 1,
      limit: 10,
      filter: "",
      filterName: "",
      filterOrder: "",
      space: "",
      gettingAllVenues: false
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  componentDidMount() {
    this.props.getLocation();
  }
  next() {
    this.slider.slickNext();
  }

  previous() {
    this.slider.slickPrev();
  }

  handlerByState = event => {
    const eventType = event.target.getAttribute("data-name");
    let searchString = "?";

    if (eventType) {
      searchString += `state=${eventType}&`;
    }

    history.push({ pathname: `/listing`, search: searchString });
  };

  handlerByEventTypeAll = () => {
    this.setState({ gettingAllVenues: !this.state.gettingAllVenues });
  };

  render() {
    const { location, places, popularVenues } = this.props;
    return (
      <div className="popular-places">
        <div className="container-home">
          <h1 className="PopularSearches__headline">
            Popular Destinations
            <span> | {location?.country_name}</span>
          </h1>
          <h2 className="PopularSearches__subheadline">
            Lorem  ipsum dolor sit amet, consectetur adiplscing elit.
            {/*across the {location?.country_name}*/}
          </h2>
          <div className="stroke__wrapper">
            <div className="stroke"></div>

            <div
              className="slider__arrows"
              onClick={this.handlerByEventTypeAll}
            >
              <div className="explore">
                <Link to={"/listing"} className="explore__text">
                  <img src={ExploreIcon} alt="explore icon" />
                  &nbsp;&nbsp;Show all
                </Link>
              </div>
            </div>
          </div>

          <div className="PopularSearches__sliders">
            <>
              {/*places.rows*/}

              <>
                {!this.state.gettingAllVenues ? (
                  <Slider ref={c => (this.slider = c)} {...settings}>
                    {this.popularPlaces.map((place, i) => (
                      <span //Link
                        data-name={place.name}
                        onClick={this.handlerByState}
                        key={i}
                        className="place-link"
                      >
                        <div className="place-card home-places">
                          <div className="place-card-image home-places" style={{width: '90%', borderRadius: '5%'}}>
                            <img
                              data-name={place.name}
                              src={place.image || NoImage}
                              className="place-card-image-img home-places"
                            />
                          </div>
                          <div className="place-card-title-wrapper  home-places"
                            style={{ marginLeft: '0px'}}
                          >
                            <span
                              data-name={place.name}
                              className="place-card-title  home-places"
                              style={{ color:'#000000', marginLeft: '0px'}}
                              title={place.name}
                            >
                              {place.name}
                            </span>
                          </div>
                          {(
                            <>
                              <p
                                className="place-card-text"
                                style={{marginBottom:'3px'}}
                                title={
                                  place?.city?.city_name +
                                  ", " +
                                  place?.address?.zip_code +
                                  ", " +
                                  place?.country?.country_name
                                }
                              >
                                {/* {place
                                  ? place.city?.city_name +
                                    ", " +
                                    place.address?.zip_code +
                                    ", " +
                                    place.country?.country_name
                                  : "address doesn't exist"} */}
                                   Lorem  ipsum dolor sit amet
                              </p>
                              <div className="place-card__price-and-capacity">
                                <div className="place-card-price-wrapper">
                                  <span className="place-card-price">${place.price || "0"}</span>/
                                  <span className="place-card-persons">
                                    {place.priceType || "hour"}
                                  </span>
                                </div>
                              </div>
                              <div className="place-card-capacity">
                                <span className="place-card-capacity-amount">
                                  {place.persons || ""}
                                </span>
                                <div className="place-card-rate-wrapper">
                                    <img src={HeartIcon} alt="heart icon" />
                                  <span className="place-card-rate">{place.rating || "0"}</span>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </span>
                    ))}
                  </Slider>
                ) : (
                  <div className={"wrapper-states"}>
                    {this.popularPlaces.map((place, i) => (
                      <span //Link
                        data-name={place.name}
                        onClick={this.handlerByState}
                        key={i}
                        className="place-link"
                      >
                        <div className="place-card home-places">
                          <div className="place-card-image home-places">
                            <img
                              data-name={place.name}
                              src={place.image || NoImage}
                              className="place-card-image-img home-places"
                            />
                          </div>
                          <div className="place-card-title-wrapper  home-places">
                            <span
                              data-name={place.name}
                              className="place-card-title  home-places"
                              title={place.name}
                            >
                              {place.name}
                            </span>
                          </div>
                        </div>
                      </span>
                    ))}
                  </div>
                )}
              </>

              {/*linesRight linesLeft*/}
              <div className={"btns"}>
                <div className={"wrapper"}>
                  <img src={linesLeft} alt="" />
                  <button className="button" onClick={this.previous}>
                    <span></span>
                  </button>
                </div>
                <div className={"wrapper"}>
                  <button className="button" onClick={this.next}>
                    <span></span>
                  </button>
                  <img src={linesRight} alt="" />
                </div>
              </div>
              <div
                className="mobile slider__arrows"
                onClick={this.handlerByEventTypeAll}
              >
                <div className="explore">
                  <img src={RectangleIcon} alt="explore icon" />
                  <span className="explore__text">Explore all</span>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.place.location,
  places: state.searchPlace.places,
  popularVenues: state.place.popularVenues
});

export default connect(mapStateToProps, {
  getLocation,
  getSearchPlace
})(PopularPlaces);
