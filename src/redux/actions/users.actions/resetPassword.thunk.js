import * as actions from "./resetPassword.actions";
import axiosInstance from "../../../api";
import history from "../../../history";
import { toastr } from "react-redux-toastr";

export const checkEmail = ({ email }) => async dispatch => {
  const { origin } = document.location;
  dispatch(actions.checkEmailRequest());
  try {
    const result = await axiosInstance.post("/auth/forgot_password", {
      email,
      link: `${origin}/reset-password`
    });
    dispatch(actions.checkEmailSuccess(result.data));
    toastr.success(
      `We sent an email to your ${email} with a recover password link.`
    );
    history.push("/");
  } catch (error) {
    dispatch(actions.checkEmailFailure({ message: error.data }));
    toastr.error(
      `There is no such email, please, make sure you entered your correct email`
    );
  }
};

export const resetPassword = updatedPassword => async dispatch => {
  dispatch(actions.resetPasswordRequest());
  try {
    const result = await axiosInstance.put(
      `/auth/recover_password`,
      updatedPassword
    );
    dispatch(actions.resetPasswordSuccess()); // result.data
    // alert('Your password has successfully changed.');
    toastr.success("Successfully", "Your password has successfully changed.");
    history.push("/");
  } catch (error) {
    dispatch(actions.resetPasswordFailure({ message: error.data }));
  }
};
