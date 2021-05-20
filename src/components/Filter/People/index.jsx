import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./style.scss";

function People({ peopleRange, changeState }) {
  const [currentPeople, setCurrentPeople] = useState({});
  const defaultEvents = { peopleRange: [{ name: "", id: "" }] };

  console.log(peopleRange);

  // useEffect(() => {
  //   people.people &&
  //     people.people.map(item => {
  //       if (item.id === +peopleId) {
  //         setCurrentEvent({ name: item.name, id: item.id });
  //       }
  //     });
  // }, [people]);

  const change = e => {
    let currentName = e.target.firstChild?.getAttribute("data-name");
    let currentId = e.target.firstChild?.getAttribute("data-id");

    changeState(currentName);
    setCurrentPeople({ name: currentName, id: currentId });
  };
  return (
    <Autocomplete
      value={currentPeople}
      className="event"
      getOptionLabel={option => option?.name}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <span data-id={option?.id} data-name={option?.name} />
          {option?.name}
        </React.Fragment>
      )}
      options={peopleRange}
      onChange={change}
      popupIcon={<span className="arrow" />}
      renderInput={params => (
        <TextField {...params} placeholder="Select people" />
      )}
    />
  );
}
// const mapStateToProps = state => {
//   return {
//     people: state.searchPlace.people
//   };
// };

export default People;
