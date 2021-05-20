import React, { useEffect, useState } from "react";
import "./style.scss";
import LocationIcon from "./assets/location.png";
import Input from "../Input";
import { connect } from "react-redux";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Popper from "@material-ui/core/Popper/Popper";

function Location({
  changeState,
  location,
  onPlaceSelected,
  cities,
  PopperComponent
}) {
  const [currentLocation, setCurrentLocation] = useState({});
  const defaultLocation = { cities: [{ city_name: "", id: "" }] };

  useEffect(() => {
    cities.cities &&
      cities.cities.map(item => {
        if (item.id === +location) {
          setCurrentLocation({ city_name: item.city_name, id: item.id });
        }
      });
  }, [cities]);

  const change = ({ target }) => {
    let currentName = target.firstChild?.getAttribute("data-name");
    let currentId = target.firstChild?.getAttribute("data-id");
    setCurrentLocation({ city_name: currentName, id: currentId });
    changeState(currentId, "locationSelected");
  };

  return (
    <Autocomplete
      PopperComponent={PopperComponent}
      value={currentLocation}
      className="event"
      getOptionLabel={option => option?.city_name}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <span data-id={option?.id} data-name={option?.city_name} />
          {option?.city_name}
        </React.Fragment>
      )}
      options={cities?.cities || defaultLocation}
      onChange={change}
      popupIcon={<span className="arrow" />}
      renderInput={params => (
        <TextField {...params} placeholder="Select city" />
      )}
    />
  );
}

const mapStateToProps = state => {
  return {
    cities: state.searchPlace.cities
  };
};

export default connect(mapStateToProps)(Location);
