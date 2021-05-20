import React, { Component } from "react";
import moment from 'moment';
import "./style.scss";

export default class Time extends Component {
  constructor(props) {
    super(props);    
  }

	isEarlierThanEndLimit = (timeValue, endLimit, lastValue) => {
    let timeValueIsEarlier = moment(timeValue, 'h:mm').diff(moment(endLimit, 'h:mm')) < 0
		let timeValueIsLaterThanLastValue = lastValue === undefined ? true : moment(lastValue, 'h:mm').diff(moment(timeValue, 'h:mm')) < 0
		return timeValueIsEarlier && timeValueIsLaterThanLastValue;
	}

	render () {
    let {timeFieldName, text, defaultValue, name, timeException} = this.props;
		let timeValue = this.props.beginLimit || "12:00";
		let lastValue;
    let endLimit = this.props.endLimit || "11:59";
		let step = this.props.step || 30;

    let options = [];
    timeValue = moment(timeValue, 'HH:mm').format('HH:mm');
    endLimit =  moment(endLimit, 'HH:mm').format('HH:mm');
    options.push(timeValue);
    
    
    while ( this.isEarlierThanEndLimit(timeValue, endLimit, lastValue) ) {
      lastValue = timeValue;
      timeValue = moment(timeValue, 'HH:mm').add(step, 'minutes').format('HH:mm');      
      options.push(timeValue);
    }
    return(
      <div className="timeChoice" defaultValue={defaultValue} name={name}>
        <h4  className="timeChoice__title">{text}</h4>
        {options.map(timeValue => {
          let key = Date.now()+ moment(timeValue, 'HH:mm');
          let exception = timeException.filter(e => (e.startTime <= timeValue) && (e.endTime >= timeValue)).length>0;

          return <div key={key} className="timeChoice__button"><input type="radio" name={timeFieldName} id={key} value={timeValue} disabled={exception}  /><label htmlFor={key}>{moment(timeValue, 'HH:mm').format("hh:mm a")}</label><button type="button" className="timeChoice__confirm"   onClick={()=>this.props.onConfirmTime(moment(timeValue, 'HH:mm').format())}>Confirm</button></div>
        })}
      </div>
    )
	}
}
