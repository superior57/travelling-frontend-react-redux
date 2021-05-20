import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Form } from "reactstrap";

import { uploadFiles } from "../../../redux/actions/places.actions/places.thunk";
import { getPlaceDetails } from "../../../redux/actions/places.actions/editPlace.thunk";

import styled from "styled-components";
import Dropzone, { useDropzone } from "react-dropzone";
import Loader from "../../../assets/icons/tenor.gif";

const PageTitle = styled.h2`
  font-weight: 800;
  font-size: 36px;

  > span {
    opacity: 0.5;
  }
`;

class UploadFiles extends React.PureComponent {
  fileInput = React.createRef();

  state = {
    file: null,
    filename: "",
    fileHashed: "",
    fileData: ""
  };

  componentDidMount() {
    this.props.getPlaceDetails(this.props.match.params.id);
  }

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta, type }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label} </label>
        <input {...input} autoComplete="off" type={type} />
        {this.renderError(meta)}
      </div>
    );
  };

  uploadFilesHandler = async acceptedFiles => {
    const { fileData } = this.state;

    const formData = new FormData();
    acceptedFiles.forEach((file, index) => {
      formData.append("images", file);
      this.props.uploadFiles(formData, this.props.match.params?.id);
    });
  };

  onChooseImg = async () => {
    const file = this.fileInput.current.files[0];

    this.setState(() => ({ fileData: file }));
  };

  render() {
    const { file } = this.state;
    return (
      <>
        <PageTitle>
          Venue Info <span>· Part 2</span>
        </PageTitle>

        <Dropzone onDrop={this.uploadFilesHandler} accept="image/*, video/*">
          {({ getRootProps, getInputProps }) => (
            <div className="add-media-uploadedsection">
              <div {...getRootProps({ className: "dropzone-window" })}>
                <input {...getInputProps()} />
                <p>
                  Drag files here or <span className="browse-word">browse</span>{" "}
                  to upload
                </p>
              </div>
            </div>
          )}
        </Dropzone>

        {/*<Form onSubmit={e => this.uploadFilesHandler(e, "multer")}>*/}
        {/*  <input*/}
        {/*    type="file"*/}
        {/*    name="files"*/}
        {/*    onChange={this.onChooseImg}*/}
        {/*    label="Add an image"*/}
        {/*    ref={this.fileInput}*/}
        {/*  />*/}
        {/*  <button onClick={e => this.uploadFilesHandler(e, "multer")}>*/}
        {/*    Upload*/}
        {/*  </button>*/}
        {/*</Form>*/}
        <br />
        {file && (
          <img
            src={this.state.fileHashed}
            style={{ maxWidth: "300px" }}
            alt="img"
          />
        )}
      </>
    );
  }
}

const formWrapped = reduxForm({
  form: "Files"
})(UploadFiles);

const mapStateToProps = state => ({
  place: state.editPlace.place.building,
  loading: state.place.uploadFilesLoading,
  error: state.place.uploadFilesError
});

export default connect(mapStateToProps, { uploadFiles, getPlaceDetails })(
  formWrapped
);
