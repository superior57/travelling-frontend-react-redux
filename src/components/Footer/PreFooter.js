import React from "react";
import "./styles.scss";

const PreFooter = () => {
  return (
    <div className="prefooter">
      <div className="container-home">
        <div className="container prefooter__wrapper">
          <div className="prefooter__left">
            <div className="prefooter__block">
              <img src="/images/icons/phone-icon.svg" alt="phone icon" />
              {/*<span className="prefooter__text">631.000.3737</span>*/}
            </div>
            <div className="prefooter__block">
              <img src="/images/icons/email-icon.svg" alt="email icon" />
              <a href="mailto:Contact@VentVent.com" className="prefooter__text">
                Contact@VentVent.com
              </a>
            </div>
            {/*<div className="prefooter__block">*/}
            {/*  <img src="/images/icons/location-icon.svg" alt="location icon" />*/}
            {/*  <span className="prefooter__text">*/}
            {/*    734 Walt Whitman Rd. Suite 203, Melville, NY 11747*/}
            {/*  </span>*/}
            {/*</div>*/}
          </div>

          <div className="prefooter__right">
            <a
              href="https://www.instagram.com/ventvent_venues/"
              className="prefooter__link"
              target="_blank"
            >
              <img
                className="prefooter__icon"
                src="/images/icons/insta.svg"
                alt="insta icon"
              />
            </a>
            <a
              href="https://www.youtube.com/channel/UCNHO_AevBM5S7c7UemKdrIQ/featured?view_as=subscriber"
              className="prefooter__link"
              target="_blank"
            >
              <img
                className="prefooter__icon"
                src="/images/icons/you.svg"
                alt="youtube icon"
              />
            </a>
            <a
              href="https://www.tiktok.com/@ventvent_venues?lang=en"
              className="prefooter__link"
              target="_blank"
            >
              <img
                className="prefooter__icon"
                src="/images/icons/tiktok.svg"
                alt="youtube icon"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreFooter;
