import React from 'react';
import { connect } from 'react-redux';
import TopNav from '../../../components/container/TopNav';
import {
  getPlaceDetails,
  editPlace,
  deletePlace
} from '../../../redux/actions/places.actions/editPlace.thunk';
import { reduxForm } from 'redux-form';
import Button from '../../../components/styledComp/Button';
import Title from '../../../components/styledComp/Title';

// import history from '../../history';

export class EditPlace extends React.PureComponent {
  componentDidMount() {
    this.props.getPlaceDetails(this.props.match.params.id);
  }

  state = {
    name: '',
    description: '',
    price: '',
    capacity: '',
    square: '',
    time_from: '',
    time_to: '',
    renter_email: '',
    rules: ''
  };

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };
  changeDescription = (e) => {
    this.setState({ description: e.target.value });
  };
  changePrice = (e) => {
    this.setState({ price: e.target.value });
  };
  changeCapacity = (e) => {
    this.setState({ capacity: e.target.value });
  };
  changeSquare = (e) => {
    this.setState({ square: e.target.value });
  };
  changeTimeFrom = (e) => {
    this.setState({ time_from: e.target.value });
  };
  changeTimeTo = (e) => {
    this.setState({ time_to: e.target.value });
  };
  changeRenterEmail = (e) => {
    this.setState({ renter_email: e.target.value });
  };
  changeRules = (e) => {
    this.setState({ rules: e.target.value });
  };

  onEdit = async (e) => {
    const { id } = this.props.place.building;

    const reducer = (acc, prop_key) => {
      if (!this.state[prop_key]) return acc;
      acc[prop_key] = this.state[prop_key];
      return acc;
    };
    const stateValues = Object.keys(this.state).reduce(reducer, {});

    if (!e.target.value) e.preventDefault();
    await this.props.editPlace({ ...stateValues, id });
  };

  onDelete = async () => {
    const { id } = this.props.place.building;
    await this.props.deletePlace(id);
  };

  render() {
    if (!this.props.place.building) return null;
    const { building } = this.props.place;
    const { time_from, time_to } = building.schedule;
    const { name, description, price, capacity, square, renter_email, rules } = building;

    return (
      <>
        {/* <TopNav /> */}
        <form className="ui form error container" onSubmit={this.onEdit}>
          <div>
            <Title>Place Edit</Title>
          </div>
          <div>
            <label htmlFor="name">Name: {name}</label>
            <input id="name" type="text" onChange={this.onChangeName} />
          </div>

          <div>
            <label htmlFor="description">Description: {description}</label>
            <input id="description" type="text" onChange={this.changeDescription} />
          </div>

          <div>
            <label htmlFor="price">Price: {price}</label>
            <input id="price" type="number" onChange={this.changePrice} />
          </div>

          <div>
            <label htmlFor="capacity">Capacity: {capacity.total}</label>
            <input id="capacity" type="number" onChange={this.changeCapacity} />
          </div>

          <div>
            <label htmlFor="square">Square: {square}</label>
            <input id="square" type="number" onChange={this.changeSquare} />
          </div>

          <div>
            <label htmlFor="timeFrom">Time From: {time_from}</label>
            <input id="timeFrom" type="time" onChange={this.changeTimeFrom} />
          </div>

          <div>
            <label htmlFor="timeTo">Time To: {time_to}</label>
            <input id="timeTo" type="text" onChange={this.changeTimeTo} />
          </div>

          <div>
            <label htmlFor="renterEmail">Renter Email: {renter_email}</label>
            <input id="renterEmail" type="text" onChange={this.changeRenterEmail} />
          </div>

          <div>
            <label htmlFor="rules">Rules: {rules.rules}</label>
            <input id="rules" type="text" onChange={this.changeRules} />
          </div>

          {/* <div>
            {rules.map((rule, i) => {
              return (
                <div key={i}>
                  <label htmlFor="rules">Rules: {rule.rules}</label>
                  <input id="rules" type="text" onChange={this.changeRules} />
                </div>
              );
            })}
          </div> */}

          <Button type="button" onClick={this.onEdit} className="btn">
            Edit
          </Button>
          <Button onClick={this.onDelete}>Delete</Button>
        </form>
      </>
    );
  }
}

const formWrapped = reduxForm({
  form: 'EditPlace'
})(EditPlace);

const mapStateToProps = (state) => ({
  userData: state.auth.user,
  place: state.editPlace.place,
  loading: state.auth.loading,
  error: state.auth.error
});

export default connect(mapStateToProps, {
  getPlaceDetails,
  editPlace,
  deletePlace
})(formWrapped);
