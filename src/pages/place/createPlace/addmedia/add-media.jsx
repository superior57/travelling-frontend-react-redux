import React from "react";
import { connect } from "react-redux";
import {
  getPlaceDetails,
  uploadMedia
} from "../../../../redux/actions/places.actions/places.thunk";
import { isAuthenticated } from "../../../../redux/selectors/auth/auth.select";
import "./style.scss";
import Dropdown from "../../../../components/Dropdown";
import ReactPlayer from "react-player";
import PhotoDropzone from "../../../../components/PhotoDropzone";
import Dropzone from "react-dropzone";
import Loader from "../../../../assets/icons/tenor.gif";

class AddMedia extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  state = {
    details: null,
    isOpen: false,
    media: [],
    feature: "Select",
    selectedFeatures: [],
    addedFeatures: {
      alcohol: false,
      smocking: false,
      music: false,
      pets: false,
      instruments: false
    },
    fileUploading: false,
    percentage: "",
    filesLength: 0,
    filesProgress: 0
  };

  dropFiles = acceptedFiles => {
    this.setState({
      filesLength: acceptedFiles.length + this.state.filesLength
    });

    acceptedFiles.forEach((file, index) => {
      const formData = new FormData();
      const filetype = file.type.split("/")[0];
      filetype === "image"
        ? formData.append("images", file)
        : formData.append("videos", file);

      this.getFiles(formData, filetype);
    });
  };

  getFiles = (formData, type) => {
    this.setState({
      fileUploading: true
    });

    if (type === "image") {
      this.props.uploadMedia(formData, "images");
    } else {
      this.props.uploadMedia(formData, "videos");
    }
    this.forceUpdate();
    //this.setState({ upload: true, mediaArr: [...this.state.mediaArr, ...file] });
  };

  changeItemActivities = item => {
    let { selectedFeatures } = this.state;
    if (this.state.selectedFeatures.indexOf(item) === -1) {
      selectedFeatures.push(item);
    }
    this.setState({ feature: item, selectedFeatures: selectedFeatures });
  };

  addFeature = () => {
    const { selectedFeatures } = this.state;
    const features = {
      alcohol: selectedFeatures.indexOf("Alcohol") != -1 ? true : false,
      smocking: selectedFeatures.indexOf("Smoking") != -1 ? true : false,
      music: selectedFeatures.indexOf("Music") != -1 ? true : false,
      pets: selectedFeatures.indexOf("Pets") != -1 ? true : false,
      instruments: selectedFeatures.indexOf("Instruments") != -1 ? true : false
    };
    this.setState({
      addedFeatures: features
    });
    this.props.featuresData(this.state.addedFeatures);
  };

  removeActivity = index => {
    console.log(index);
  };

  saveMedia = () => {
    // this.props.step(2);
  };

  render() {
    const { file } = this.props;
    let { media, feature, addedFeatures, fileUploading } = this.state;

    if (file && file.Location) {
      let idx = media.findIndex(rec => {
        if (file.Location === rec.Location) {
          return file;
        }
      });
      if (idx === -1) {
        media.push(file);
      }
      // let { filesProgress } = this.state;
      // filesProgress++;
      this.setState({
        // filesProgress: filesProgress,
        fileUploading: this.state.filesLength === media.length ? false : true
      });
    }
    this.setState({ media: media });

    return (
      <div className="add-media">
        <div className="row">
          <div className="col-md-6 add-media-borderpart">
            <div className="create-place-container-venuesection-heading">
              Add Photos / Videos
            </div>
            <div className="add-media-text">
              Please upload jpg or png files with each photo a max 5MB per photo
              ( Max 6) and upload video mp3 files with each video a Max of 60
              seconds
            </div>
            <div className="row">
              {media.map((item, i) => (
                <div className="col-md-6 mb-20" key={i}>
                  <div className="add-media-imgcontainer">
                    {/* <img src={item.Location} /> */}
                    {item.type === 1 ? (
                      <img src={item.Location} />
                    ) : (
                      <ReactPlayer
                        className="video-item"
                        width="100%"
                        height="100%"
                        controls={true}
                        url={item.Location}
                        playing={false}
                        config={{
                          youtube: {
                            preload: false
                          }
                        }}
                      />
                    )}
                    <span className="add-media-crossicon">x</span>
                  </div>
                </div>
              ))}

              <div className="col-md-6 mb-20">
                {/* {fileUploading ? (<div className="uploading"><PhotoDropzone type="venue" getFiles={this.getFiles} /></div>) : (<PhotoDropzone type="venue" getFiles={this.getFiles} />)} */}
                <Dropzone onDrop={this.dropFiles} accept="image/*, video/*">
                  {({ getRootProps, getInputProps }) => (
                    <div className="add-media-uploadedsection">
                      {fileUploading ? (
                        <div className="uploading">
                          <img src={Loader} />
                        </div>
                      ) : (
                        ""
                      )}
                      <div {...getRootProps({ className: "dropzone-window" })}>
                        <input {...getInputProps()} />
                        <p className="mobile-hidden">
                          Drag files here or{" "}
                          <span className="browse-word">browse</span> to upload
                        </p>
                        <span className="browse-word desktop-hidden">
                          browse
                        </span>
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>
            </div>
          </div>
        </div>
        {this.props.validError && (
          <div className={"error-msg"}>
            <p>please fill in all fields</p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    validError: state.place.validError,
    isAuthenticated: isAuthenticated(state),
    file: state.place.files
  };
};

export default connect(mapStateToProps, { getPlaceDetails, uploadMedia })(
  AddMedia
);
