import * as actions from "./updatePassword.actions";
import axiosInstance from "../../../api";
import history from "../../../history";
import { toastr } from "react-redux-toastr";
export const updatePassword = ({
  password,
  newPassword,
  id
}) => async dispatch => {
  dispatch(actions.updatePasswordRequest());
  try {
    const result = await axiosInstance.put(`/auth/change_password/`, {
      password,
      newPassword,
      id
    });
    dispatch(actions.updatePasswordSuccess()); // result.data
    // alert('Your password has successfully changed.');
    history.push("/");
    toastr.success(
      "Successfully",
      "your profile has been successfully updated!"
    );
  } catch (error) {
    dispatch(actions.updatePasswordFailure({ message: error.data }));
    toastr.error("There was an error while Updating!!");
  }
};
