import React, { useState } from "react";
import Range from "./Range";
import useOnclickOutside from "react-cool-onclickoutside";
import { connect } from "react-redux";
import { getAdminReviews } from "../../../redux/actions/admin.action/admin.dashboard.thunk";
import "../styles.scss";

function CombineRange({ filters, setFilters, getAdminReviews }) {
  const [active, setActive] = useState(false);
  const [combineRange, setCombineRange] = useState({});
  const [selectRange, setSelectRange] = useState([]);

  const ref = useOnclickOutside(() => {
    if (active) {
      setFilters({ ...combineRange, ...filters });
      getAdminReviews({ ...filters, ...combineRange });
    }
    setActive(false);
  });

  const handlerShowRanges = () => {
    let actualActive = active;
    setActive(Boolean((actualActive ^= true)));
    if (Boolean((actualActive ^= true))) {
      setFilters({ ...combineRange, ...filters });
      getAdminReviews({ ...filters, ...combineRange });
    }
  };

  return (
    <div ref={ref} className={"combine-range"}>
      <div
        onClick={handlerShowRanges}
        className={`select-range ${selectRange.length && "active"}`}
      >
        <input
          type="text"
          disabled={true}
          value={selectRange.length ? selectRange : "by ranges"}
        />
        <span className={`arrow ${active && "action"}`} />
      </div>
      <div className={`wrapper ${active && "show"}`}>
        <Range
          type={"cleanliness"}
          combineRange={combineRange}
          setCombineRange={setCombineRange}
          range={{ start: 0, end: 5 }}
          defaultValue={0}
          setSelectRange={setSelectRange}
          selectRange={selectRange}
          label={"Filter by cleanliness"}
          step={1}
        />

        <Range
          type={"observance"}
          combineRange={combineRange}
          setCombineRange={setCombineRange}
          range={{ start: 0, end: 5 }}
          defaultValue={0}
          setSelectRange={setSelectRange}
          selectRange={selectRange}
          label={"Filter by observance"}
          step={1}
        />

        <Range
          type={"communication"}
          combineRange={combineRange}
          setCombineRange={setCombineRange}
          range={{ start: 0, end: 5 }}
          defaultValue={0}
          setSelectRange={setSelectRange}
          selectRange={selectRange}
          label={"Filter by communication"}
          step={1}
        />

        <Range
          type={"totalRate"}
          combineRange={combineRange}
          setCombineRange={setCombineRange}
          range={{ start: 0, end: 5 }}
          defaultValue={0}
          setSelectRange={setSelectRange}
          selectRange={selectRange}
          label={"Filter by totalRate"}
          step={0.1}
        />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps, {
  getAdminReviews
})(CombineRange);
