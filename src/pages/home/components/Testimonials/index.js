import React from "react";

import "./index.scss";

import Quotes from "../../../../assets/testimonials/quotes.png";
import Tesimonial1 from "../../../../assets/testimonials/testimonial-1.png";
import Tesimonial2 from "../../../../assets/testimonials/testimonial-2.png";
import Tesimonial3 from "../../../../assets/testimonials/testimonial-3.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PlaceCard from "../../../../components/PlaceCard";
import linesLeft from "../../../../assets/icons/lines-left.png";
import linesRight from "../../../../assets/icons/lines-right.png";
import RectangleIcon from "../../../../assets/icons/rectangle-icon.png";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const SlickButtonLeft = ({ currentSlide, slideCount, ...props }) => {
  const { className } = props;
  return <span {...props} className={className + " prev-arrow"}></span>;
};

const SlickButtonRight = ({ currentSlide, slideCount, ...props }) => {
  const { className } = props;
  return <span {...props} className={className + " next-arrow"}></span>;
};

// const settings = {
//   dots: false,
//   infinite: false,
//   speed: 700,
//   prevArrow: <SlickButtonLeft />,
//   nextArrow: <SlickButtonRight />,
//   slidesToShow: 5,
//   slidesToScroll: 1
// };

const settings = {
  dots: false,
  infinite: false,
  speed: 700,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
  ]
};

const testimonials = [
  {
    image: Tesimonial1,
    name: "Alex Hornn",
    position: "Guest",
    description:
      "Couldn’t have been better. " +
      "The venue/Mansion was beautiful and equipped with21`everything " +
      "I needed (and lots of lovely touches / local design). " +
      "The host was very helpful and the location was great. " +
      "Thank you for helping make my wedding a memory one"
  },
  {
    image: Tesimonial2,
    name: "Alyssa Lucas",
    position: "Guest",
    description:
      "Mr. John’s home is at a perfect location for my birthday" +
      "party and a lot of space for guest parking." +
      "The home was beautiful, neat and has everything we needed." +
      "Mr. Johns was also very helpful since the beginning," +
      " available at all times whenever I had any questions."
  },
  {
    image: Tesimonial3,
    name: "Kim Lee",
    position: "Super-Host",
    description:
      "Great company and overall great people. " +
      "Michael was an awesome point of contact. His communication was awesome. " +
      "I love that you all ensured that my place and tidy and ready for the next guest. " +
      "I refunded the cleaning fees. Thank you again and I look forward to working with you again."
  }
];

const Testimonials = ({ slider }) => {
  const next = () => {
    slider.slickNext();
  };

  const previous = () => {
    slider.slickPrev();
  };

  return (
    <div className="testimonials">
      <div className="container-home">
        <h1 className="PopularSearches__headline">
          Testimonials<span> | Customers’ Quotes</span>
        </h1>
        <h2 className="PopularSearches__subheadline">
          They’ve experienced , Now they’re talking about it.
        </h2>
        <div className="stroke"></div>

        <div className="PopularSearches__sliders">
          {testimonials && (
            <>
              <Slider ref={c => (slider = c)} {...settings}>
                {testimonials.map((place, i) => (
                  <span
                    key={place.id}
                    to={`/place-details/${place.id}`}
                    className="place-link"
                  >
                    <div className="testimonials__card">
                      <div className="testimonials__image">
                        <img src={place.image} alt={place.name} />
                      </div>
                      <img
                        className="testimonials__quotes"
                        src={Quotes}
                        alt="quotes icon"
                      />
                      <p className="etstimonials__text">{place.description}</p>
                      <div className="testimonials__stroke"></div>
                      <span className="testimonials__name">{place.name}</span>
                      <span className="testimonials__position">
                        {place.position}
                      </span>
                    </div>
                  </span>
                ))}
              </Slider>

              {/*linesRight linesLeft*/}
              <div className={"btns"}>
                <div className={"wrapper"}>
                  <img src={linesLeft} alt="" />
                  <button className="button" onClick={previous}>
                    <span></span>
                  </button>
                </div>
                <div className={"wrapper"}>
                  <button className="button" onClick={next}>
                    <span></span>
                  </button>
                  <img src={linesRight} alt="" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
