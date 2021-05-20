import * as actions from "./auth.actions";
import history from "../../../history";
import axiosInstance from "../../../api";

export const createSignup = formValues => async dispatch => {
  dispatch(actions.signupRequest());
  try {
    const result = await axiosInstance.post("/auth/signup", formValues);
    localStorage.setItem("token", result.data.token);
    localStorage.setItem("id", result.data.user.id);
    dispatch(actions.signupSuccess(result.data));
    axiosInstance.post("/auth/send_activation", {
      headers: {
        authorization: result.data.token
      }
    });
    history.push("/activate");
  } catch (error) {
    dispatch(actions.signupFailure({ message: error.message }));
    alert(error.response.data.message);
  }
};

export const activeLogin = param => async dispatch => {
  dispatch(actions.activeRequest());
  try {
    const result = await axiosInstance.post(`/auth/activation`, param);
    dispatch(actions.activeSuccess(result.data));
    history.push("/profile");
  } catch (error) {
    dispatch(actions.activeFailure({ message: error.message }));
  }
};

export const createLogin = formValues => async dispatch => {
  dispatch(actions.loginRequest());
  try {
    const result = await axiosInstance.post("/auth/login", formValues);
    dispatch(actions.loginSuccess(result.data));
    localStorage.setItem("token", result.data.token);
    localStorage.setItem("id", result.data.user.id);
    if (result.data.user.isActivated) {
      history.push("/profile");
    } else {
      history.push("/activate");
    }
  } catch (error) {
    dispatch(actions.loginFailure(error.message));
    alert("Check the input of email and password");
  }
};

export const checkAuth = () => async dispatch => {
  dispatch(actions.checkauthRequest());
  try {
    const result = await axiosInstance.get("/auth");
    dispatch(
      actions.checkauthSuccess({
        ...result.data,
        phoneNumber: result.data?.countryCode + result.data?.phoneNumber
      })
    );
  } catch (error) {
    dispatch(actions.checkauthFailure({ message: error.message }));
  }
};

export const createAdminLogin = formValues => async dispatch => {
  dispatch(actions.loginAdminRequest());
  try {
    const result = await axiosInstance.post("/auth/admin/login", formValues, {
      headers: { "Content-Type": "application/json" }
    });
    dispatch(actions.loginAdminSuccess(result.data));
    localStorage.setItem("token", result.data.token);
    localStorage.setItem("role_id", result.data.user.role_id);
    localStorage.setItem("role_type", result.data.user.role.role_type);
    localStorage.setItem(
      "permissions",
      JSON.stringify(result.data.user.role.permissions)
    );
    // if (result.data.user.role_id === 1) {
    history.push("/admin/dashboard");
    // } else {
    //   history.push('/admin');
    // }
  } catch (error) {
    dispatch(actions.loginAdminFailure(error.message));
    alert("Check the input of email and password");
  }
};

//Admin Signup
export const createAdminSignup = signupData => dispatch => {
  dispatch(actions.setLoading());
  axiosInstance
    .post("/auth/admin/signup", signupData)
    .then(res => {
      dispatch(actions.adminSignupAction(res.data));
      history.push("/email-sent");
    })
    .catch(err => dispatch(actions.adminSignupFailure(err.response.data)));
};

//Get Admin Roles
export const getAdminRoles = () => dispatch => {
  axiosInstance.get("/api/admin/roles").then(res => {
    dispatch(actions.adminRoles(res.data));
  });
  // .catch(err => dispatch(actions.adminSignupFailure(err.response.data)));
};

//Verify Approval
export const verifyApproval = (token, verificationCode) => dispatch => {
  dispatch(actions.setLoading());
  axiosInstance
    .get(`/auth/admin/activation?token=${token}&code=${verificationCode}`)
    .then(res => {
      res && dispatch(actions.approvalStatus(res.data));
    })
    .catch(err => {
      dispatch(actions.approvalFailure(err.response && err.response.data));
    });
};

//Admin Permissions
export const getAdminPermissions = slug => dispatch => {
  axiosInstance
    .get(`/auth/admin/permissions?q=${slug}`)
    .then(res => {
      // dispatch(actions.adminRoles(res.data));
    })
    .catch(err => {
      // history.push('/admin/dashboard')
    });
};
