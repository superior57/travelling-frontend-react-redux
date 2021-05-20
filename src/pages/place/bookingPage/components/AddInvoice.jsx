import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

function AddInvoice({
  open,
  handleClose,
  inputFields,
  setInputFields,
  addInvoice
}) {
  const [text, setText] = useState("");
  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ description: "", summ: "", itemType: "additional charges" });
    setInputFields(values);
  };

  const handleRemoveFields = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "description") {
      if (event.target.value) values[index].description = event.target.value;
    } else {
      if (event.target.value) values[index].summ = event.target.value;
    }
    setInputFields(values);
  };

  const handleTextChange = ({ target }) => {
    setText(target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("inputFields", inputFields);

    handleClose();
    addInvoice(inputFields, text);
    setText("");
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Add invoice</DialogTitle>
      <div className={"add-invoice-main-description"}>
        <label htmlFor="mainDescr">Description</label>
        <textarea
          rows={3}
          className="form-control"
          value={text}
          onChange={handleTextChange}
        />
      </div>
      <form className={"dialog-invoice-details"} onSubmit={handleSubmit}>
        <h5 htmlFor="">Invoice details</h5>
        <div className="form-row">
          {inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
              <div className="form-group col-sm-9">
                <label htmlFor="firstName">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={inputField.description}
                  onChange={event => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-3">
                <label htmlFor="lastName">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="summ"
                  name="summ"
                  value={inputField.summ}
                  onChange={event => handleInputChange(index, event)}
                />
              </div>
            </Fragment>
          ))}
        </div>
        <div className="submit-button">
          <button
            className="btn btn-link"
            type="button"
            onClick={() => handleAddFields()}
          >
            Add details
          </button>
        </div>
        <div className="submit-button">
          <button
            className="btn btn-primary mr-2"
            type="submit"
            onSubmit={handleSubmit}
          >
            Save
          </button>
          <button
            className="btn btn-link"
            type="button"
            onClick={() => handleClose()}
          >
            Cancel
          </button>
        </div>
      </form>
    </Dialog>
  );
}

const mapStateToProps = state => ({
  // currentReservation: state.booking.currentReservation
});

const mapDispatchToProps = {
  // getReservation,
  // getRModal
};

export default connect(mapStateToProps, mapDispatchToProps)(AddInvoice);
