import TextField from "@material-ui/core/TextField";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  createNewUser,
  updateUserByAdmin
} from "../../../../redux/actions/admin.action/admin.dashboard.thunk";
import Dialog from "@material-ui/core/Dialog";
import { Field, Form, reduxForm } from "redux-form";

function MyDialog(props) {
  const {
    onClose,
    selectedValue,
    open,
    createNewUser,
    filters,
    setFilters,
    setOpenModal,
    userDataById,
    modalType,
    updateUserByAdmin,
    host_id,
    handleSubmit,
    reset
  } = props;
  const handleClose = () => {
    reset();
    onClose(selectedValue);
  };

  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return <p className="error message">{error}</p>;
    }
  };

  const handlerClickSave = formValues => {
    if (modalType === "create") {
      setFilters({ offset: 1, ...filters });
      createNewUser(
        { ...formValues, role_id: host_id },
        { offset: 1, ...filters }
      );
    }
    if (modalType === "edit") {
      if (formValues.edit_password?.trim()) {
        updateUserByAdmin(
          userDataById?.id,
          {
            ...userDataById,
            ...formValues,
            password: formValues.edit_password
          },
          filters
        );
      } else {
        updateUserByAdmin(
          userDataById?.id,
          { ...userDataById, ...formValues },
          filters
        );
      }
    }
    onClose(true);
    setOpenModal(false);
    reset();
  };

  const renderInput = ({
    input,
    label,
    meta,
    type,
    placeholder,
    defaultValue,
    ...rest
  }) => {
    return (
      <>
        <TextField
          className={"modal-input"}
          label={label}
          placeholder={placeholder}
          {...input}
          {...rest}
          autoComplete="off"
          type={type}
        />
        {renderError(meta)}
      </>
    );
  };

  return (
    <Dialog
      onClose={handleClose}
      className={"admin modal-window"}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <h1 className={"title"}>
        {modalType === "create" ? "Create user" : "Update user"}
      </h1>

      <Form onSubmit={handleSubmit(handlerClickSave)} className={"wrapper"}>
        <Field
          component={renderInput}
          type="text"
          name="first_name"
          placeholder="First Name*"
          label="First Name"
        />
        <Field
          component={renderInput}
          type="text"
          name="last_name"
          placeholder="Last Name*"
          label="Last Name"
        />
        <Field
          component={renderInput}
          type="email"
          name="email"
          placeholder="Email*"
          label="Email"
        />
        {modalType === "create" && (
          <Field
            component={renderInput}
            type="password"
            name="password"
            placeholder="Password*"
            label="Password"
          />
        )}
        {modalType === "edit" && (
          <Field
            component={renderInput}
            type="password"
            name="edit_password"
            placeholder="Password*"
            label="Password"
          />
        )}

        <button className={"save-btn"}>Save</button>
      </Form>
    </Dialog>
  );
}

const validate = formValues => {
  const errors = {};
  const pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );

  if (!pattern.test(formValues.email)) {
    errors.email = "Email is not correct";
  }
  if (!formValues.first_name) {
    errors.first_name = "You must enter a first name";
  }
  if (!formValues.last_name) {
    errors.last_name = "You must enter a last name";
  }
  if (!formValues.password) {
    errors.password = "You must enter a password";
  }

  return errors;
};

const formWrapped = reduxForm({
  form: "modal",
  validate,
  enableReinitialize: true
})(MyDialog);

const mapStateToProps = state => {
  let userDataById = undefined;
  if (state.dashboard.getStoreModalType === "edit") {
    userDataById = state.dashboard.userDataById;
  }

  return {
    userDataById: userDataById,
    getStoreModalType: state.dashboard.getStoreModalType,
    initialValues: {
      first_name: userDataById && userDataById.first_name,
      last_name: userDataById && userDataById.last_name,
      email: userDataById && userDataById.email
    }
  };
};

export default connect(mapStateToProps, { createNewUser, updateUserByAdmin })(
  formWrapped
);
