import React from "react";

import "./index.scss";

const ExpressLove = () => (
  <section className="express-love">
    <div className="express-love__wrapper">
      <h3 className="express-love__title">Express your love with us </h3>
      <p className="express-love__about">
        Explore top rated wedding venues across USA
      </p>
      <button className="express-love__explore">
        Explore{" "}
        <img
          className="express-love__right-arrow"
          src={require("../../../../assets/icons/right-arrow.svg")}
          alt="right-arrow"
        />
      </button>
    </div>
  </section>
);

export default ExpressLove;
