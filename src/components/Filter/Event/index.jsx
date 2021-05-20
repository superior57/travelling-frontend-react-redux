import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "./style.scss";

function Event({ event, changeState, events }) {
  const [subEvents, setSubEvents] = useState([]);
  const [UList, setUList] = useState();
  const [eventData, setEventData] = useState();

  useEffect(() => {
    if (events.events) {
      let array = [];
      events.events.map(item => {
        item.children.map(subItem => {
          array.push(subItem);
        });
      });

      array.map(item => {
        if (item.id === +event) {
          setEventData(item.label);
        }
      });

      setSubEvents(array);
    }
  }, [events]);

  const handlerChooseEvent = e => {
    let currentId = e.target.getAttribute("data-id");
    let currentName = e.target.getAttribute("data-name");

    console.log(e.target);

    setUList("");
    setEventData(currentName);
    changeState(currentId, "event");
  };

  const handlerSelectEvent = event => {
    let currentUser = event.target.value.trim();
    setEventData(currentUser);

    let currentUsersList = [];
    if (currentUser) {
      subEvents.map(val => {
        if (
          val?.label?.toUpperCase().indexOf(currentUser.toUpperCase()) !== -1
        ) {
          currentUsersList.push(val);
        }
      });
    }
    setUList(currentUsersList);
  };

  return (
    <div className="home-searh-element-wrapper event">
      <input
        style={{ width: "100%" }}
        type="text"
        onChange={handlerSelectEvent}
        value={eventData}
        placeholder={"Select event"}
      />
      {UList?.length ? (
        <div className={"dropdown_list"}>
          {UList.map(val => (
            <p
              data-id={val.id}
              data-name={val.label}
              onClick={handlerChooseEvent}
            >
              {val.label}
            </p>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
const mapStateToProps = state => {
  return {
    events: state.searchPlace.events
  };
};

export default connect(mapStateToProps)(Event);
