import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import "./style.scss";

const limitList = ["10", "20", "30", "40"];

function Limit({ limit, changeLimitState }) {
  const change = ({ target }) => {
    changeLimitState(target.value);
  };

  return (
    <FormControl className="sortBy">
      <Select
        value={limit}
        onChange={change}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        IconComponent={() => <span className="arrow" />}
      >
        <MenuItem value={"5"}>
          <em>5</em>
        </MenuItem>

        {limitList &&
          limitList.map((item, i) => (
            <MenuItem value={item} className="event-menu-li" key={`event_${i}`}>
              <span>{item}</span>
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
export default Limit;
