import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createFilterOptions } from "@material-ui/lab";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";

const filter = createFilterOptions();

const useStyles = makeStyles({
  "@global": {
    '.MuiAutocomplete-option[data-focus="true"]': {
      background: "#078089",
      color: "white"
    }
  }
});

function VenueType({ categories, changeState, venue, AddnewVenueType }) {
  const [currentEvent, setCurrentEvent] = useState({});
  const defaultVenue = { categories: [{ name: "", id: "" }] };
  const classes = useStyles();

  const [customEvent, setCustomEvent] = useState(false);

  useEffect(() => {
    categories &&
      categories.map(item => {
        if (item.id === +venue) {
          setCurrentEvent({ name: item.name, id: item.id });
        }
      });
  }, [categories]);

  const Link = ({ children, ...other }) => {
    const newVenueTypeClick = event => {
      event.preventDefault();
      setCustomEvent(!customEvent);
    };

    return (
      <Paper {...other}>
        <p onMouseDown={newVenueTypeClick} className={"new-venue-type"}>
          <span>Add new Venue type</span>
        </p>
        {children}
      </Paper>
    );
  };

  const change = e => {
    let currentName = e.target.firstChild?.getAttribute("data-name");
    let currentId = e.target.firstChild?.getAttribute("data-id");
    changeState(currentId, "venue", currentName);
    setCurrentEvent({ name: currentName, id: currentId });
  };
  const setCustomVenue = e => {
    if (!e.target.value.trim()) {
      setCustomEvent(!customEvent);
    }
    changeState(null, "venue", e.target.value);
  };

  return !customEvent ? (
    <Autocomplete
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        if (
          AddnewVenueType &&
          filtered.length === 0 &&
          params.inputValue !== ""
        ) {
          changeState(null, "venue", params.inputValue);
        }

        return filtered;
      }}
      value={currentEvent}
      className={`venue addVenue`}
      getOptionLabel={option => option?.name}
      freeSolo={AddnewVenueType}
      renderOption={(option, { selected }) => (
        <div className={option?.name === currentEvent?.name && "active"}>
          <span data-id={option?.id} data-name={option?.name} />
          {option?.name}
        </div>
      )}
      options={categories || defaultVenue}
      onChange={change}
      popupIcon={<span className="arrow" />}
      renderInput={params => <TextField {...params} placeholder="" />}
      PaperComponent={Link}
    />
  ) : (
    <input
      onChange={setCustomVenue}
      type="text"
      placeholder={"new Venue Type"}
      style={{
        height: "40px",
        border: "solid 1px #e9e9e9",
        borderRadius: "5px",
        width: "100%",
        padding: "5px 10px"
      }}
    />
  );
}
const mapStateToProps = state => {
  return {
    // events: state.searchPlace.events,
    categories: state.place.categories
  };
};

export default connect(mapStateToProps)(VenueType);
