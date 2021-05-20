import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import bg1 from "../../assets/header-bg/bg-1.png";
import bg2 from "../../assets/header-bg/bg-2.png";
import bg3 from "../../assets/header-bg/bg-3.png";
import bg4 from "../../assets/header-bg/bg-4.png";
import bg5 from "../../assets/header-bg/bg-5.png";
import bg6 from "../../assets/header-bg/bg-6.png";
import bg7 from "../../assets/bg7.jpg";
import bgLast from "../../assets/header-bg/bg-last.jpeg";
import { connect } from "react-redux";
import { checkAuth } from "../../redux/actions/users.actions/auth.thunk";
import { getRatedPlaces } from "../../redux/actions/places.actions/places.thunk";
import { getLastPlaces } from "../../redux/actions/places.actions/places.thunk";

import { isAuthenticated } from "../../redux/selectors/auth/auth.select";
import { getFirstRatedPlaces } from "../../redux/selectors/places/places.select";
import { getSecondRatedPlaces } from "../../redux/selectors/places/places.select";
import { getLastPlacesSelect } from "../../redux/selectors/places/places.select";

import Header from "../../components/Header";
import Section1 from "./components/Section1";
import RatedPlaces from "./components/RatedPlaces/index";
import LastPlaces from "./components/LastPlaces/index";
import Footer from "../../components/Footer";
import ExpressLove from "./components/ExpressLove";
import DiscoverPlaces from "./components/DiscoverPlaces";
import PopularPlaces from "./components/PopularPlaces";
import Brands from "./components/Brands";
import Testimonials from "./components/Testimonials";

import NewYork from "../../assets/slider/new-york.png";
import USA from "../../assets/slider/usa.png";
import Belgium from "../../assets/slider/belgium.png";
import India from "../../assets/slider/india.png";
import Peru from "../../assets/slider/peru.png";

import fullLogo from "../../assets/Full_Logo.png";

import "./style.scss";
import ListingPage from "../listing/ListingPage";
import ListingPageHome from "../../components/FilterHome/ListingPageHome";
import Filter from "../../components/Filter";

const places = [
  {
    id: 1,
    name: "New York",
    text: "Lorem ipsum dolor sit amet",
    price: "200.00",
    per: "person",
    persons: "40-50",
    rate: "4.5",
    image: NewYork
  },
  {
    id: 2,
    name: "USA",
    text: "Lorem ipsum dolor sit amet",
    price: "500.00",
    per: "hour",
    persons: "1000-1500",
    rate: "4.2",
    image: USA
  },
  {
    id: 3,
    name: "Belgium",
    text: "Lorem ipsum dolor sit amet",
    price: "200.00",
    per: "person",
    persons: "40-50",
    rate: "4.5",
    image: Belgium
  },
  {
    id: 4,
    name: "India",
    text: "Lorem ipsum dolor sit amet",
    price: "100.00",
    per: "person",
    persons: "20-25",
    rate: "4.5",
    image: India
  },
  {
    id: 5,
    name: "Peru",
    text: "Lorem ipsum dolor sit amet",
    price: "600",
    per: "hour",
    persons: "1500-2000",
    rate: "4.5",
    image: Peru
  },
  {
    id: 6,
    name: "New York",
    text: "Lorem ipsum dolor sit amet",
    price: "200.00",
    per: "person",
    persons: "40-50",
    rate: "4.5",
    image: NewYork
  },
  {
    id: 7,
    name: "USA",
    text: "Lorem ipsum dolor sit amet",
    price: "500.00",
    per: "hour",
    persons: "1000-1500",
    rate: "4.2",
    image: USA
  },
  {
    id: 8,
    name: "Belgium",
    text: "Lorem ipsum dolor sit amet",
    price: "200.00",
    per: "person",
    persons: "40-50",
    rate: "4.5",
    image: Belgium
  }
];

const bgs = [bg1, bg2, bg3, bg4, bg5, bg6];

class HomePage extends React.PureComponent {
  componentDidMount() {
    this.props.checkAuth();
    this.props.getRatedPlaces();
    this.props.getLastPlaces();
    setTimeout(this.change, 5000);
  }

  state = {
    background: bgs[0]
  };

  changeBg = bg => {
    this.setState(state => ({ background: bg }));
  };

  change = () => {
    let next = bgs.indexOf(this.state.background) + 1;
    if (next === bgs.length) {
      next = 0;
    }
    this.changeBg(bgs[next]);
    setTimeout(this.change, 5000);
  };

  render() {
    const { isAuthenticated } = this.props;

    return (
      <div className="wrapper">
        <Header
          fullLogo={fullLogo}
          classes={"home_header"}
          isAuthenticated={isAuthenticated}
          find={true}
        />
        <main>
          <div className="header">
            <img
              src={bgLast}
              className="bg-img"
              // style={{opacity: background === bg1 ? 1 : 0}}
            />
            <div className="container-home">
              <div className="header-content">
                <h1>Happiness is here</h1>
                <p>Share your time with loved ones</p>
                <div className="stroke"></div>

                <ListingPageHome classes={"search_home"} />
              </div>
            </div>
          </div>
          <PopularPlaces />
          <Testimonials /> {/* <ExpressLove /> */}
          <Brands />
          <DiscoverPlaces />
          <Footer />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state),
  checkAuthError: state.auth.checkAuthError,
  loginError: state.auth.loginError,
  firstPlaces: getFirstRatedPlaces(state),
  secondPlaces: getSecondRatedPlaces(state),
  lastPlaces: getLastPlacesSelect(state)
});

export default connect(mapStateToProps, {
  checkAuth,
  getRatedPlaces,
  getLastPlaces
})(HomePage);
