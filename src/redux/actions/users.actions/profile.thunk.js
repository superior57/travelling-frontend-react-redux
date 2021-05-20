import * as actions from "./profile.actions";
import history from "../../../history";
import axiosInstance from "../../../api";
import { errorSaveUser } from "./profile.actions";

export const getUser = () => async dispatch => {
  dispatch(actions.getUserRequest());
  try {
    const result = await axiosInstance.get("/api/user");
    dispatch(actions.getUserSuccess(result.data.user));
  } catch (error) {
    dispatch(actions.getUserFailure({ message: error.data }));
  }
};
export const getReferralUsages = (code, date) => async dispatch => {
  try {
    const result = await axiosInstance.get(
      `/api/user/referral/${code}/usages/${date}`
    );
    dispatch(actions.getReferralUsagesSuccess(result.data.usages));
  } catch (e) {
    dispatch(actions.getReferralUsagesFailure(e.data));
  }
};
export const editUploadId = fileData => async dispatch => {
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  try {
    let result = await axiosInstance.post(
      "/api/user/idimage",
      fileData,
      config
    );
    dispatch(actions.editUploadIdSuccess(result.Location));
  } catch (error) {
    // dispatch(actions.editFailure({ message: error.data }));
  }
};
export const editAvatar = (fileData, handlerLoader) => async dispatch => {
  handlerLoader(true);
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  try {
    let result = await axiosInstance.post(
      "/api/user/picture",
      fileData,
      config
    );
    const success = await dispatch(
      actions.editAvatarSuccess(result.data.Location)
    );
    if (success) {
      handlerLoader(false);
    }
    localStorage.setItem("avatar", result.data.Location || "");
  } catch (error) {
    dispatch(actions.editFailure({ message: error.data }));
  }
};
export const editUser = (data, verifyPhone) => async dispatch => {
  try {
    let result = await axiosInstance.put("/api/users", data);
    dispatch(actions.editSuccess(result.data.result));

    if (verifyPhone && result.data.result) {
      dispatch(actions.verifyModalPhoneRequest(true));
    }
  } catch (error) {
    dispatch(actions.editFailure({ message: error.data }));
  }
};

export const checkPhoneCodeRequest = data => async dispatch => {
  try {
    let result = await axiosInstance.post("/api/user/phone", {
      code: Number(data)
    });

    dispatch(actions.editSuccess(result.data));
    dispatch(actions.checkPhoneCodeFail(false));
    dispatch(actions.verifyModalPhoneRequest(false));
    dispatch(actions.verifyPhoneSuccess(true));
  } catch (error) {
    dispatch(actions.checkPhoneCodeFail(true));
  }
};

export const deleteUser = () => async dispatch => {
  dispatch(actions.deleteUserRequest());
  try {
    const result = await axiosInstance.delete("/api/users");
    dispatch(actions.deleteUserSuccess(result.data));
    localStorage.removeItem("token");
    history.push("/");
  } catch (error) {
    dispatch(actions.deleteUserFailure({ message: error.data }));
  }
};

export const sendContacts = data => async dispatch => {
  try {
    await axiosInstance.post("/api/contacts", { ...data });
    dispatch(actions.sendContactsSuccess());
  } catch (error) {
    dispatch(actions.sendContactsFailure({ message: error.data }));
  }
};

export const setCurrentReviews = data => async dispatch => {
  const { limit, offset, type } = data;
  try {
    const result = await axiosInstance.post(`/api/reviews/${data.id}`, {
      limit,
      offset,
      type
    });
    dispatch(actions.getReviewsSuccess(result.data));
  } catch (error) {
    // dispatch(actions.sendReviewsFailure({ message: error.data }));
  }
};

export const getUserById = id => async dispatch => {
  try {
    const result = await axiosInstance.get(`/api/user/${id}`);
    dispatch(actions.userByIdSuccess(result.data));
  } catch (error) {
    // dispatch(actions.sendReviewsFailure({ message: error.data }));
  }
};

export const sendMessage = (id, answer) => async dispatch => {
  try {
    const result = await axiosInstance.post(`/api/reviews/answer/${id}`, {
      answer
    });
    dispatch(actions.sendMessageSuccess(result.data?.answer));
  } catch (error) {
    // dispatch(actions.sendReviewsFailure({ message: error.data }));
  }
};
