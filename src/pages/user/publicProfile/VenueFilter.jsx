import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

function VenueFilter({
  checkUseFilter,
  handlerFilterChange,
  list,
  label,
  type
}) {
  const [currentEvent, setCurrentEvent] = useState({});
  const defaultEvents = { list: [{ name: "", id: "" }] };
  const change = e => {
    let currentName = e.target.firstChild?.getAttribute("data-name");
    let currentId = e.target.firstChild?.getAttribute("data-id") || null;
    let index = null;

    list.map((value, i) => {
      if (value.id === Number(currentId)) {
        index = i;
      }
    });

    handlerFilterChange(currentName, currentId, index);
    setCurrentEvent({ name: currentName, id: currentId });
  };
  return (
    <Autocomplete
      value={currentEvent}
      className={`event filter ${checkUseFilter && "active"}`}
      getOptionLabel={option => option?.name}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <span data-id={option?.id} data-name={option?.name} />
          {option?.name}
        </React.Fragment>
      )}
      options={list || defaultEvents}
      onChange={change}
      popupIcon={<span className="arrow" />}
      renderInput={params => <TextField {...params} placeholder={`${label}`} />}
    />
  );
}

export default VenueFilter;
