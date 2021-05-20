// import React from "react";
// import { geolocated } from "react-geolocated";

// class UserLocation extends React.Component {
//   setLatlong = data => {
//     // console.log("lllllllllllllll",data.latitude)
//     console.log("lat long-->", data.latitude, data.longitude);
//     let latLng = {
//       lat: data.latitude,
//       lng: data.longitude
//     };

//   };
//   render() {
//     return !this.props.isGeolocationAvailable ? (
//       <div>
//         Your browser does not support Geolocation
//         {(localStorage.setItem("lat", ""), localStorage.setItem("lng", ""))}
//       </div>
//     ) : !this.props.isGeolocationEnabled ? (
//       <div>
//         Geolocation is not enabled
//         {(localStorage.setItem("lat", ""), localStorage.setItem("lng", ""))}
//       </div>
//     ) : this.props.coords ? (
//       <table>
//         <tbody>
//           {this.setLatlong(this.props.coords)}
//           {/* <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
//               <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
//               <tr><td>altitude</td><td>{this.props.coords.altitude}</td></tr>
//               <tr><td>heading</td><td>{this.props.coords.heading}</td></tr>
//               <tr><td>speed</td><td>{this.props.coords.speed}</td></tr> */}
//         </tbody>
//       </table>
//     ) : (
//       <div>Getting the location data&hellip; </div>
//     );
//   }
// }

// export default geolocated({
//   positionOptions: {
//     enableHighAccuracy: false
//   },
//   userDecisionTimeout: 5000
// })(Location);
