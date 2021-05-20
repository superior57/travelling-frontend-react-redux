import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";
import { getLocation } from "../../redux/actions/places.actions/places.thunk";

const Homes = ({ text }) => (
  <div
    style={{
      color: "green",
      // background: 'grey',
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100%",
      transform: "translate(-50%, -50%)"
    }}
  >
    <img
      src={require("../../assets/icons/marker.png")}
      style={{ height: "40px", width: "40px" }}
    />
    <br />
    {text}
  </div>
);

const Garages = ({ text }) => (
  <div
    style={{
      color: "white",
      // background: 'grey',

      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100%",
      transform: "translate(-50%, -50%)"
    }}
  >
    <img src={require("../../assets/icons/marker.png")} />
    {text}
  </div>
);

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startposition: { lat: 0, lng: 0 }
    };
  }

  userLocation = {
    lat: "",
    lng: ""
  };

  static defaultProps = {
    // center: {
    //   lat: this.props.saveVenue.location.latitude,
    //   lng: this.props.saveVenue.location.longitude
    // },
    zoom: 10
  };
  handleApiLoaded = (map, maps) => {};

  componentDidMount() {
    this.props.getLocation();
  }

  componentDidUpdate() {}

  UNSAFE_componentWillReceiveProps = props => {
    let location = {
      lat: props.saveVenue.location.latitude,
      lng: props.saveVenue.location.longitude
    };

    if (location !== this.state.startposition) {
      this.setState({ startposition: location });
    }
  };

  render() {
    const { google } = window.google;
    // console.log("valuesss===>>", this.props);
    // console.log("--^&%&^%&^%^&>?88888", this.props.saveVenue);
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "90%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBZt87qC93OB0fgzGAcVPBOdaan41YIuqA" }}
          defaultCenter={this.props.center}
          center={this.state.startposition}
          onChange={this.props.onChange}
          draggable={this.props.draggable}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
          {...this.props}
        >
          <Homes
            lat={
              this.props && this.props.coordinates && this.props.coordinates.lat
                ? this.props.coordinates.lat
                : "0"
            }
            lng={
              this.props && this.props.coordinates && this.props.coordinates.lng
                ? this.props.coordinates.lng
                : "0"
            }
          />
        </GoogleMapReact>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    saveVenue: state.place
  };
};

export default connect(mapStateToProps, {
  getLocation
})(MapContainer);
