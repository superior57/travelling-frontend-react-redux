import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import CustomInput from "./CustomInput";

function CombineFilter({ currentType, handlerFilterChange, list }) {
  const [guest, setGuest] = useState({});
  const [host, setHost] = useState({});
  const [role, setRole] = useState({});

  const defaultEvents = { list: [{ name: "", id: "" }] };

  const change = e => {
    let currentName = e.target.firstChild?.getAttribute("data-name");
    let currentType = e.target.firstChild?.getAttribute("data-types");
    let currentId = e.target.firstChild?.getAttribute("data-id") || null;
    handlerFilterChange(
      currentId,
      currentType === "role" ? "role_id" : "userId",
      currentType
    );
    switch (currentType) {
      case "guests":
        setGuest({ name: currentName, id: currentId });
        setHost({});
        setRole({});
        break;
      case "hosts":
        setGuest({});
        setRole({});
        setHost({ name: currentName, id: currentId });
        break;
      case "role":
        setGuest({});
        setHost({});
        setRole({ name: currentName, id: currentId });
        break;
      default:
        setGuest({});
        setHost({});
        setRole({});
    }
  };
  return (
    <>
      <Autocomplete
        value={guest}
        className={`event filter ${currentType === "guests" && "active"}`}
        getOptionLabel={option => option?.name}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <span
              data-types={"guests"}
              data-id={option?.id}
              data-name={option?.name}
            />
            {option?.name}
          </React.Fragment>
        )}
        options={list?.guests || defaultEvents}
        onChange={change}
        popupIcon={<span className="arrow" />}
        renderInput={params => (
          <TextField {...params} placeholder={`by guests`} />
        )}
      />
      <Autocomplete
        value={host}
        className={`event filter ${currentType === "hosts" && "active"}`}
        getOptionLabel={option => option?.name}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <span
              data-types={"hosts"}
              data-id={option?.id}
              data-name={option?.name}
            />
            {option?.name}
          </React.Fragment>
        )}
        options={list?.hosts || defaultEvents}
        onChange={change}
        popupIcon={<span className="arrow" />}
        renderInput={params => (
          <TextField {...params} placeholder={`by hosts`} />
        )}
      />

      <Autocomplete
        value={role}
        className={`event filter ${currentType === "role" && "active"}`}
        getOptionLabel={option => option?.name}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <span
              data-types={"role"}
              data-id={option?.id}
              data-name={option?.name}
            />
            {option?.name}
          </React.Fragment>
        )}
        options={list?.role || defaultEvents}
        onChange={change}
        popupIcon={<span className="arrow" />}
        renderInput={params => (
          <TextField {...params} placeholder={`by roles`} />
        )}
      />
    </>
  );
}

export default CombineFilter;
