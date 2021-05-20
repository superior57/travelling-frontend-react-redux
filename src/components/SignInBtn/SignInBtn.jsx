import React, { useState } from "react";
import signIn from "../../assets/icons/sign_in.png";
import "./style.scss";
import SignInModal from "../SignInModal";
import { Link } from "react-router-dom";

const SignInBtn = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className={"signIn-btn_wrapper"}>
      <Link to="/signIn" className="signIn-btn" onClick={toggle}>
        Sign In
      </Link>
      {/* <SignInModal toggle={toggle} modal={modal} /> */}
    </div>
  );
};

export default SignInBtn;
