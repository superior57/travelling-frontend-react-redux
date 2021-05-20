import React, { useEffect, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import "./style.scss";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Popper from "@material-ui/core/Popper/Popper";

const dataOrder = [
  { title: "Rating - lowest", Value: "ASC", Name: "rating" },
  { title: "Rating - highest", Value: "DESC", Name: "rating" },
  { title: "Hourly rate - lowest", Value: "ASC", Name: "price" },
  { title: "Hourly rate - highest", Value: "DESC", Name: "price" }
];

function SortOrder({
  filterName,
  filterOrder,
  filter,
  changeFilterState,
  PopperComponent
}) {
  const [currentFilter, setCurrentFilter] = useState({});

  useEffect(() => {
    dataOrder &&
      dataOrder.map(item => {
        if (item.Value === filterOrder && item.Name === filterName) {
          setCurrentFilter({
            title: item.title,
            Value: item.Value,
            Name: item.Name
          });
        }
      });
  }, [dataOrder]);

  const change = ({ target }) => {
    const value = target.firstChild?.getAttribute("order-value");
    const name = target.firstChild?.getAttribute("order-name");
    const title = target.firstChild?.getAttribute("order-title");

    setCurrentFilter({ title, Value: value, Name: name });

    changeFilterState({ Value: value, Name: name });
  };

  return (
    <Autocomplete
      PopperComponent={PopperComponent}
      value={currentFilter}
      className="event"
      getOptionLabel={option => option?.title}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <span
            order-value={option.Value}
            order-name={option.Name}
            order-title={option.title}
          />
          {option?.title}
        </React.Fragment>
      )}
      options={dataOrder}
      onChange={change}
      popupIcon={<span className="arrow" />}
      renderInput={params => <TextField {...params} placeholder="Order by" />}
    />
  );
}
export default SortOrder;
