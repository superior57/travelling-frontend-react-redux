import React from "react";

import "./index.scss";
import BrandsImages from "../../../../assets/brands.png";

const Brands = () => {
  return (
    <div className="brands">
      <div className="container-home">
        <h1 className="PopularSearches__headline">
          Trusted Clients<span> | Top Brands</span>
        </h1>
        <h2 className="PopularSearches__subheadline">
          Our top rated Clients share business with us
        </h2>
        <div className="stroke"></div>
        <div className="brands__list">
          <img src={BrandsImages} alt="brands" />
        </div>
      </div>
    </div>
  );
};

export default Brands;
