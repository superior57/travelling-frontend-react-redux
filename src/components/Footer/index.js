import React, { useState } from "react";
import Logo from "../Header/FullLogo";
import { Link } from "react-router-dom";
import moment from "moment";
import "./styles.scss";
import PreFooter from "./PreFooter";
import Facebook from "../../assets/icons/Facebook.svg";
import Instagram from "../../assets/icons/Instagram.svg";

export default () => {
  const [input, setInput] = useState("");
  const [showInvalidEmail, setInvalidEmail] = useState(false);
  let isVisibleFooterList = [
    { visible: false, text: "+" },
    { visible: false, text: "+" },
    { visible: false, text: "+" },
    { visible: false, text: "+" }
  ];
  const [toggleLetter0, changeToggleLetter0] = useState({
    sign: "+",
    visible: false
  });
  const [toggleLetter1, changeToggleLetter1] = useState({
    sign: "+",
    visible: false
  });
  const [toggleLetter2, changeToggleLetter2] = useState({
    sign: "+",
    visible: false
  });
  const [toggleLetter3, changeToggleLetter3] = useState({
    sign: "+",
    visible: false
  });
  let footerClassNames = "footer__nav mobile-hidden";
  const validateEmail = mail => {
    const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(String(mail).toLowerCase());
  };
  const subscribeUser = () => {
    if (validateEmail(input)) {
      console.log("Subscribe user here!");
      setInvalidEmail(false);
    } else {
      setInvalidEmail(true);
    }
  };

  const handleTitleClick0 = e => {
    const target = e.currentTarget;
    const listContent = target.nextSibling.nextSibling;
    const targetChild = target.children[0];
    if (toggleLetter0.visible === false) {
      listContent.classList.remove("mobile-hidden");
      target.classList.add("green");
      targetChild.classList.add("green");
      changeToggleLetter0({ sign: "-", visible: true });
    } else {
      changeToggleLetter0({ sign: "+", visible: false });
      listContent.classList.add("mobile-hidden");
      target.classList.remove("green");
      targetChild.classList.remove("green");
    }
  };

  const handleTitleClick1 = e => {
    const target = e.currentTarget;
    const listContent = target.nextSibling.nextSibling;
    const targetChild = target.children[0];
    if (toggleLetter1.visible === false) {
      listContent.classList.remove("mobile-hidden");
      target.classList.add("green");
      targetChild.classList.add("green");
      changeToggleLetter1({ sign: "-", visible: true });
    } else {
      changeToggleLetter1({ sign: "+", visible: false });
      listContent.classList.add("mobile-hidden");
      target.classList.remove("green");
      targetChild.classList.remove("green");
    }
  };

  const handleTitleClick2 = e => {
    const target = e.currentTarget;
    const listContent = target.nextSibling.nextSibling;
    const targetChild = target.children[0];
    if (toggleLetter2.visible === false) {
      listContent.classList.remove("mobile-hidden");
      target.classList.add("green");
      targetChild.classList.add("green");
      changeToggleLetter2({ sign: "-", visible: true });
    } else {
      changeToggleLetter2({ sign: "+", visible: false });
      listContent.classList.add("mobile-hidden");
      target.classList.remove("green");
      targetChild.classList.remove("green");
    }
  };

  const handleTitleClick3 = e => {
    const target = e.currentTarget;
    const listContent = target.nextSibling.nextSibling;
    const targetChild = target.children[0];
    if (toggleLetter3.visible === false) {
      listContent.classList.remove("mobile-hidden");
      target.classList.add("green");
      targetChild.classList.add("green");
      changeToggleLetter3({ sign: "-", visible: true });
    } else {
      changeToggleLetter3({ sign: "+", visible: false });
      listContent.classList.add("mobile-hidden");
      target.classList.remove("green");
      targetChild.classList.remove("green");
    }
  };

  return (
    <>
      <PreFooter />
      <footer className="footer">
        <div className="container footer__wrapper">
          <div className="footer__large-box">
            <h2
              className="footer__title"
              data-number="0"
              onClick={handleTitleClick0}
            >
              About us{" "}
              <span className="footer__title-span">{toggleLetter0.sign}</span>
            </h2>
            <div className="footer__separator"></div>
            <p className="footer__text">
              <p>Our goal at VentVent is to deliver WOW.</p>
              We hope to be remembered, not only as a Marketplace for venues
              but as a service company that brought happiness to our customers.
            </p>
          </div>

          <div className="footer__block">
            <h2
              className="footer__title"
              data-number="1"
              onClick={handleTitleClick1}
            >
              Additional Links{" "}
              <span className="footer__title-span">{toggleLetter1.sign}</span>
            </h2>
            <div className="footer__separator"></div>
            <ul className={footerClassNames}>
              <li>
                <a className="footer__link" href="#">
                  About
                </a>
              </li>
              <li>
                <a className="footer__link" href="#">
                  Term
                </a>
              </li>
              <li>
                <a className="footer__link" href="/privacy">
                  Privacy policy
                </a>
              </li>
              <li>
                <a className="footer__link" href="#">
                  Career
                </a>
              </li>
              <li>
                <a className="footer__link" href="/referral">
                  Referral Program
                </a>
              </li>
              <li>
                <a className="footer__link" href="/contact">
                  Contact Us
                </a>
              </li>
              <li>
                <a className="footer__link" href="/faq">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__block">
            <h2
              className="footer__title"
              data-number="2"
              onClick={handleTitleClick2}
            >
              Host{" "}
              <span className="footer__title-span">{toggleLetter2.sign}</span>
            </h2>
            <div className="footer__separator"></div>
            <ul className={footerClassNames}>
              <li>
                <a className="footer__link" href="#">
                  Host Community
                </a>
              </li>
              <li>
                <a className="footer__link" href="#">
                  Host FAQ
                </a>
              </li>
              <li>
                <a className="footer__link" href="/privacy">
                  Cancellation policy
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__block">
            <h2
              className="footer__title"
              data-number="3"
              onClick={handleTitleClick3}
            >
              Guest{" "}
              <span className="footer__title-span">{toggleLetter3.sign}</span>
            </h2>
            <div className="footer__separator"></div>
            <ul className={footerClassNames}>
              <li>
                <a className="footer__link" href="#">
                  Guest community
                </a>
              </li>
              <li>
                <a className="footer__link" href="#">
                  Guest FAQ
                </a>
              </li>
              <li>
                <a className="footer__link" href="/privacy">
                  Open Venues
                </a>
              </li>
              <li>
                <a className="footer__link" href="#">
                  New Venues
                </a>
              </li>
              <li>
                <a className="footer__link" href="/privacy">
                  Cancellation policy
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__connect">
            <h2 className="footer__heading toggler-true">
              Subscribe for important updates
            </h2>
            {/*<h2 className="footer__numbers">631.000.3737</h2>*/}
            <div className="footer__input--wrapper">
              <input
                className="footer__input"
                type="text"
                placeholder="Enter your email or phone number"
              />
              <button className="footer__button" type="button">
                Submit
              </button>
            </div>
            <div className="footer__apps-wrapper">
              <a href="/" className="footer__apps-link">
                <img src="/images/icons/appstore.png" />
              </a>
              <a href="/" className="footer__apps-link">
                <img src="/images/icons/android.png" />
              </a>
            </div>
          </div>
        </div>
        <div className="container footer__wrapper">
          <div className="footer__copy-right">
            2020 © Vent All rights reserved
          </div>
        </div>
      </footer>
    </>
  );
};
