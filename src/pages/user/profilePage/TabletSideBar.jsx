import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import defaultPhoto from "./assets/defaultPhoto.png";
import Dropzone from "react-dropzone";
import Proof from "./assets/proof.png";
import Mark from "./assets/Vector.png";
import React from "react";

function TabletSideBar({ isLoading, newAvatar, handlerChangePhoto }) {
  return (
    <aside className={"side-bar-tablet"}>
      <div className={"wrapper-proof"}>
        {isLoading ? (
          <CircularProgress className={"loader"} />
        ) : (
          <div className={"wrapper-img"}>
            <img
              src={newAvatar || localStorage.getItem("avatar") || defaultPhoto}
              alt=""
            />
          </div>
        )}
        <div className={"proof-info"}>
          <div className={"logo-proof"}>
            <img src={Proof} alt="" />
          </div>
          <h2 className={"title-proof"}>Proof of identity</h2>
          <h2 className={"desc-proof"}>
            The "Identity confirmed" icon will show the community members that
            it is really you.
          </h2>
        </div>
      </div>

      <div className={"wrapper-btns"}>
        <div className={"change-photo"}>
          <Dropzone onDrop={handlerChangePhoto} accept="image/*, video/*">
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <label htmlFor="save-photo">Choose photo</label>
              </div>
            )}
          </Dropzone>
        </div>
        <div className={"confirmed-id"}>
          <label className={"save-photo"} htmlFor="">
            {"Get an icon"}
          </label>
        </div>
      </div>

      <div className={"wrapper-confirmed"}>
        <h1 className={"confirmed-title"}>User confirmed</h1>
        <ul>
          <li>
            <img src={Mark} alt="" />
            <span>Email address</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default TabletSideBar;
