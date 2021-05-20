import React, { Component } from "react";

export default class AutoCompleteNew extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.autocomplete = null;
    this.textInput = React.createRef();
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
  }

  componentDidMount() {
    let input = this.textInput.current;
    this.autocomplete = new window.google.maps.places.Autocomplete(input);
    console.log("this.autocomplete--", this.autocomplete);
    this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
    // window.addEventListener("scroll",this.handleScroll, true);
  }

  handlePlaceChanged = () => {
    const place = this.autocomplete.getPlace();
    console.log("place--", place);
    this.props.handleAutoComp(place);
  };

  render() {
    const { label, onInputChange, value, placeHolder } = this.props;
    return (
      //   <div>
      //     <div id="pac-container box-input">
      //       <input
      //         {...this.props}
      //         id="pac-input"
      //         type="text"
      //         placeholder="Please enter the location of your space"
      //         ref={this.textInput}
      //         className="form-control autocomplete-class"
      //       />
      //     </div>
      //   </div>
      <div className="input-control">
        <div className="input-control-label">{label}</div>
        <input
          className="inputfield"
          onChange={onInputChange}
          value={value}
          placeholder={placeHolder}
        />
      </div>
    );
  }
}
