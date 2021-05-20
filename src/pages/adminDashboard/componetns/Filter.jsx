import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import CustomInput from "./CustomInput";

function Filter({
  checkUseFilter,
  handlerFilterChange,
  list,
  label,
  type,
  customInput
}) {
  const [currentEvent, setCurrentEvent] = useState({});
  const defaultEvents = { list: [{ name: "", id: "" }] };
  const change = e => {
    let currentName = e.target.firstChild?.getAttribute("data-name");
    let currentId = e.target.firstChild?.getAttribute("data-id") || null;
    handlerFilterChange(type === "type" ? currentName : currentId, type);
    setCurrentEvent({ name: currentName, id: currentId });
  };
  return customInput ? (
    <CustomInput
      type={type}
      handlerFilterChange={handlerFilterChange}
      customInput={customInput}
    />
  ) : (
    <Autocomplete
      value={currentEvent}
      className={`event filter ${checkUseFilter && "active"}`}
      getOptionLabel={option =>
        option?.name || option?.country_name || option?.city_name
      }
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <span
            data-id={option?.id}
            data-name={
              option?.name || option?.country_name || option?.city_name
            }
          />
          {option?.name || option?.country_name || option?.city_name}
        </React.Fragment>
      )}
      options={list || defaultEvents}
      onChange={change}
      popupIcon={<span className="arrow" />}
      renderInput={params => <TextField {...params} placeholder={`${label}`} />}
    />
  );
}

export default Filter;
