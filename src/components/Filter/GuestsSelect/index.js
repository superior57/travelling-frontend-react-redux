import React, { useState } from "react";
import Input from "../Input";
import "./styles.scss";

export default function Event({ guests, changeState }) {
  const [show, setShow] = useState(false);
  //const [guest, setGuest] = useState({ count: 'Attendees', price: 0 });

  const change = value => {
    // changeState(value, 'guests');
    setShow(false);
  };

  return (
    <div className="select-element" onClick={() => setShow(!show)}>
      <Input>
        <span className="select-element-text">Guests</span>
      </Input>
      {show && (
        <ul className="select-element-menu">
          <li
            className="select-element-menu-li"
            onClick={() => change({ count: "5-30", price: 0 })}
          >
            <span>1-30 people</span>
            <span>+$0/hr</span>
          </li>
          <li
            className="select-element-menu-li"
            onClick={() => change({ count: "31-200", price: 100 })}
          >
            <span>31-200 people</span>
            <span>+$100/hr</span>
          </li>
        </ul>
      )}
    </div>
  );
}
