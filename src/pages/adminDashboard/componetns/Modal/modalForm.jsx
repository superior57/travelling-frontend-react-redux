import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import MyDialog from "./Dialog";
import { setStoreModalType } from "../../../../redux/actions/admin.action/admin.dashboard.action";
import { connect } from "react-redux";

const emails = ["username@gmail.com", "user02@gmail.com"];

function ModalForm({
  filters,
  setFilters,
  openForEdit,
  setOpenModal,
  setModalType,
  modalType,
  host_id,
  setStoreModalType
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (openForEdit && modalType) {
      setOpen(true);
    }
  });

  const handleClickOpen = () => {
    setUser({});
    setOpen(true);
    setModalType("create");
    setStoreModalType("create");
  };

  const handleClose = value => {
    setOpen(false);
    setOpenModal(false);
    setSelectedValue(value);
  };

  return (
    <>
      <Button className={"modal-btn"} onClick={handleClickOpen}>
        Create User
      </Button>
      <MyDialog
        host_id={host_id}
        modalType={modalType}
        setOpenModal={setOpenModal}
        setFilters={setFilters}
        filters={filters}
        setUser={setUser}
        user={user}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}

export default connect("", { setStoreModalType })(ModalForm);
