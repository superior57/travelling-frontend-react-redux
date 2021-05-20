import React, { useEffect, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import "./style.scss";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
function SpaceType({ space, changeSpaceTypeState, categories }) {
  const [currentCategory, setCurrentCategories] = useState({});
  const defaultCategories = [{ city_name: "", id: "" }];

  useEffect(() => {
    categories &&
      categories.map(item => {
        if (item.id === +space) {
          setCurrentCategories({ name: item.name, id: item.id });
        }
      });
  }, [categories]);

  const change = ({ target }) => {
    let currentName = target.firstChild?.getAttribute("data-name");
    let currentId = target.firstChild?.getAttribute("data-id");
    setCurrentCategories({ name: currentName, id: currentId });
    changeSpaceTypeState(currentId);
  };

  return (
    <Autocomplete
      value={currentCategory}
      className="event"
      getOptionLabel={option => option?.name}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <span data-id={option?.id} data-name={option?.name} />
          {option?.name}
        </React.Fragment>
      )}
      options={(categories && categories) || defaultCategories}
      onChange={change}
      popupIcon={<span className="arrow" />}
      renderInput={params => <TextField {...params} placeholder="Space type" />}
    />
  );
}
const mapStateToProps = state => {
  return {
    categories: state.place.categories
  };
};
export default connect(mapStateToProps)(SpaceType);
