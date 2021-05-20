import React, { Component } from "react";
import InformationCard from "../InformationCard";

const rulesMap = {
  smocking: "Smoking is strictly prohibited in the space ",
  music:
    "Loud Music are permitted weekdays after 5:00 pm and anytime on weekends",
  pets: "Pets are not allowed",
  instruments:
    "Live Instrumentation are permitted weekdays after 5:00 pm and anytime on weekends"
};

export default class RulesPlace extends Component {
  get renderRules() {
    // const rules = Object.keys(this.props.rules);
    // return rules.map((item, index) => (
    //   <div key={index} className="item-rule body-2">
    //     *{rulesMap[item]}
    //   </div>
    // ));

    return <div className="item-rule body-2">{this.props.rules}</div>;
  }
  render() {
    return <InformationCard title="Rules">{this.renderRules}</InformationCard>;
  }
}
