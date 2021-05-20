// import React from "react";
//
//
//
// const ReferralProgram = () => {
//     return(
//         <p>eewewewewew</p>
//     );
// };
//
// export default  ReferralProgram;

import React, { useEffect, useState } from "react";

import Footer from "../../components/Footer";
import "./style.scss";
import copyIcon from "../../assets/copy.svg";
import { Select, MenuItem } from "@material-ui/core/";
import moment from "moment";

import { connect } from "react-redux";
import { checkAuth } from "../../redux/actions/users.actions/auth.thunk";
import {
  deleteUser,
  editAvatar,
  editUser,
  getUser,
  getReferralUsages
} from "../../redux/actions/users.actions/profile.thunk";
import InputLabel from "@material-ui/core/InputLabel";
import fullLogo from "../../assets/Full_Logo.png";
import Header from "../../components/Header";
import { isAuthenticated } from "../../redux/selectors/auth/auth.select";
import { Link } from "react-router-dom";
import history from "../../history";

import BackArrow from "../../assets/icons/back-arrow.svg";

const ReferralProgram = ({
  getReferralUsages,
  checkAuth,
  userData,
  usages,
  isAuthenticated
}) => {
  let [month, setMonth] = useState();
  let [months, setMonths] = useState([]);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (userData.referralCode) {
      // let startDate = moment(userData.createdAt).endOf('month');
      // let endDate = moment(new Date()).endOf('month');
      // const firstMonth = startDate.format("MMMM YYYY");
      // while (startDate.isBefore(endDate)) {
      //   setMonths([...months, startDate.format("MMMM YYYY")]);
      //   startDate.add(1, 'month');
      //   console.log(startDate, endDate);
      // }

      let startDate = moment(userData.createdAt).format();
      let endDate = moment().format();
      const firstMonth = moment(userData.createdAt)
        .endOf("month")
        .format("MMMM YYYY");

      let currentSelect = [];
      while (startDate < endDate) {
        currentSelect.push(moment(startDate).format("MMMM YYYY"));
        startDate = moment(startDate)
          .add(1, "month")
          .format();
      }
      setMonths(currentSelect);
      setMonth(firstMonth);
      getReferralUsages(userData.referralCode, firstMonth);
    }
  }, [userData]);

  const promocode = userData.referralCode;

  const onChangeMonth = e => {
    setMonth(e.target.value);
    getReferralUsages(userData.referralCode, month);
  };

  const earningTable = [
    {
      program: "Guest Affiliate program",
      number: usages || 0,
      earning: usages ? +usages * 50 : 0
    }
  ];

  const goBack = () => {
    history.goBack();
  };
  return (
    <div className="wrapper">
      <Header
        fullLogo={fullLogo}
        classes={"home_header"}
        isAuthenticated={isAuthenticated}
        find={true}
      />

      <div className="page-name">
        {/*<buttom onClick={goBack}>Back</buttom>*/}

        <span>
          <img
            className={"back-arrow"}
            onClick={goBack}
            src={BackArrow}
            alt=""
          />{" "}
          Referral program
        </span>

        {isAuthenticated && (
          <span className={"referral-code desktop"}>
            Your referral code is{" "}
            <span className="referral-referals__field">{promocode}</span>
          </span>
        )}
      </div>
      <div className="ReferralPage">
        <h2 className="ReferralPage__title">Earn a booking bonus</h2>
        <section className="ReferralPage__description">
          <div className="ReferralPage__about referral-about">
            <h3 className="referral-about__title">Guest referral program</h3>
            <p className="referral-about__text">
              As a VentVent associate, you will be earning a commission for
              every booking done with your referral code. You will be assigned a
              code once you sign up.{" "}
            </p>
            <h3 className="referral-about__title">
              Why VentVent? How much money could you earn?{" "}
            </h3>
            <p className="referral-about__text">
              VentVent Guest affiliates could earn up to $50 for each referral.
            </p>
            <p className="referral-about__text referral-about__text_note">
              <strong>Note:</strong> In order to receive a bonus for referring
              new hosts and/or guests, the new hosts or guests have to complete
              a booking whose value is at least $400 USD. Once the new hosts
              have had this type of reservation, you will receive a cash bonus
              as described in your invitation section. This amount may vary from
              country to country - equivalent it’s currency.{" "}
            </p>
          </div>

          {/* {!isAuthenticated && ( */}
          {/*<div className="ReferralPage__join referral-join">*/}
          {/*  <h3 className="referral-join__title">Join the referral program</h3>*/}
          {/*  <div className="referral-join__buttons">*/}
          {/*    <button type="button" className="referral-join__btn referral-join__btn_signIn">Sign In</button>*/}
          {/*    <button type="button" className="referral-join__btn referral-join__btn_signUp">Sign Up</button>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/* )} */}
        </section>

        <section className="ReferralPage__steps">
          <h3 className="ReferralPage__title ReferralPage__title_steps">
            How it works
          </h3>
          <div className="referral-steps">
            <div className="referral-steps__step">
              <div className="referral-steps__num">1</div>
              <div className="referral-steps__text">Share the code</div>
            </div>
            <div className="referral-steps__step">
              <div className="referral-steps__num">2</div>
              <div className="referral-steps__text">
                Your friends to make a reservation and registration new host
              </div>
            </div>
            <div className="referral-steps__step">
              <div className="referral-steps__num">3</div>
              <div className="referral-steps__text">You get a bonus</div>
            </div>
          </div>
        </section>

        {isAuthenticated ? (
          <section className="ReferralPage__refferals referral-referals">
            <div className="referral-referals__getPromocode">
              <div className="referral-referals__promocode">
                <div className="referral-referals__field">{promocode}</div>
                <button
                  type="button"
                  className="referral-referals__copy desktop-hidden"
                >
                  <img src={copyIcon} alt="copy" />
                </button>
              </div>
            </div>
            <button
              type="button"
              className="referral-referals__btn desktop-hidden"
            >
              Share with email
            </button>
            <div className="referral-referals__month referals-month">
              <div className="referals-month__text">Payout month:</div>
              {months && month && (
                <Select
                  className={"referals-month__select"}
                  labelId="month-select"
                  id="months"
                  value={month}
                  defaultValue
                  onChange={onChangeMonth}
                  disableUnderline={true}
                >
                  {months.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </div>
            <div className="referral-referals__table referals-table mobile-hidden">
              <div className="referals-table__row referals-table__row_header">
                <div className="referals-table__col">Programs</div>
                <div className="referals-table__col">Number of referrals</div>
                <div className="referals-table__col">Earning</div>
              </div>
              {earningTable.map((item, index) => (
                <div className="referals-table__row" key={index}>
                  <div className="referals-table__col">{item.program}</div>
                  <div className="referals-table__col">{item.number}</div>
                  <div className="referals-table__col">${item.earning}</div>
                </div>
              ))}
            </div>
            <div className="referral-referals__table referals-table">
              <div className="referals-table__row referals-table__row_header">
                <div className="referals-table__col">Programs</div>
              </div>
              {earningTable.map((item, index) => (
                <div key={index}>
                  <div
                    className="referals-table__row referals-table__row_programm-name"
                    key={index}
                  >
                    {item.program}
                  </div>
                  <div className="referals-table__row">
                    <div className="referals-table__col referals-table__col_field">
                      Number of referrals
                    </div>
                    <div className="referals-table__col referals-table__col_field">
                      Earning
                    </div>
                  </div>
                  <div className="referals-table__row">
                    <div className="referals-table__col">{item.number}</div>
                    <div className="referals-table__col">${item.earning}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="ReferralPage__refferals referral-referals">
            <p className={"info-signin"}>
              Please Sign in for use referral program
            </p>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default connect(
  state => ({
    userData: state.profile.user,
    loading: state.auth.loading,
    error: state.auth.error,
    newAvatar: state.profile.avatar,
    errorProfile: state.profile.errorProfile,
    usages: state.profile.usages,
    isAuthenticated: isAuthenticated(state)
  }),
  {
    checkAuth,
    getUser,
    editUser,
    deleteUser,
    editAvatar,
    getReferralUsages
  }
)(ReferralProgram);
