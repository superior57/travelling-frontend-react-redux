import * as actions from "./admin.actions";
import axiosInstance from "../../../api";

export const getUsersList = () => async dispatch => {
  dispatch(actions.adminRequest());
  try {
    const result = await axiosInstance.get("/api/users");
    dispatch(actions.adminSuccess(result.data));
    // console.log(result.data);
  } catch (error) {
    dispatch(actions.adminFailure({ message: error.message }));
  }
};

export const getCurrentChat = authorId => async dispatch => {
  dispatch(actions.adminRequest());
  try {
    const result = await axiosInstance.post("/messages", { authorId });

    dispatch(actions.getCurrentChatSuccess(result.data));
  } catch (error) {
    // dispatch(actions.adminFailure({ message: error.message }));
  }
};

export const sendCurrentMessage = (authorId, message) => async dispatch => {
  dispatch(actions.adminRequest());
  try {
    const result = await axiosInstance.post("/message", { authorId, message });
    dispatch(actions.sendCurrentMessageSuccess(result.data));
  } catch (error) {
    // dispatch(actions.adminFailure({ message: error.message }));
  }
};

export const getChattingUsers = () => async dispatch => {
  dispatch(actions.adminRequest());
  try {
    const result = await axiosInstance.get("/chats");

    dispatch(actions.getChattingUsersSuccess(result.data));
  } catch (error) {
    // dispatch(actions.adminFailure({ message: error.message }));
  }
};
