import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { ReactComponent as ShareSVG } from "./share.svg";
import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  WhatsappIcon,
  EmailIcon
} from "react-share";

class ShareButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      link: window.location.href
    };
  }

  toggle = () => {
    this.setState(prevState => ({ isShow: !prevState.isShow }));
  };

  render() {
    const { isShow, link } = this.state;
    return (
      <div className="share">
        <button className="share-btn" onClick={this.toggle}>
          <ShareSVG className="share-svg" />
        </button>
        <Modal isOpen={isShow} toggle={this.toggle}>
          <ModalHeader>You can copy and share link</ModalHeader>
          <ModalBody>
            <div className="modal-container">
              <div className="allbtn">
                <FacebookShareButton
                  className="modal-container-allbtn-share"
                  url={link}
                >
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
              </div>
              <div className="allbtn">
                <WhatsappShareButton
                  className="modal-container-allbtn-share"
                  url={link}
                >
                  <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>
              </div>
              <div className="allbtn">
                <EmailShareButton
                  className="modal-container-allbtn-share"
                  url={link}
                >
                  <EmailIcon size={32} round={true} />
                </EmailShareButton>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

ShareButton.propTypes = {
  isAuth: PropTypes.bool
};

export default ShareButton;
