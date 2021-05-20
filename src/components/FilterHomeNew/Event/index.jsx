import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./style.scss";

function Event({ event, changeState, events }) {
  // const [currentEvent, setCurrentEvent] = useState({});
  // const defaultEvents = { events: [{ label: "", id: "" }] };

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
    <div className="home-searh-element-wrapper">
      <div className="search-location-input">
        <label className="home-searh-label">Enter Activity</label>
        <input
          style={{ width: "160px" }}
          type="text"
          onChange={handlerSelectEvent}
          value={eventData}
          placeholder={"What are you planning"}
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
    </div>
  );
}
const mapStateToProps = state => {
  return {
    events: state.searchPlace.events
  };
};

export default connect(mapStateToProps)(Event);
