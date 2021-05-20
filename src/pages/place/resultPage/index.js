import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { searchPlace } from '../../../redux/actions/places.actions/searchPlace.thunk';

export class ResultPage extends React.PureComponent {
  renderList() {
    return this.props.data.map((elem) => {
      const {
        storage,
        name,
        city: { city_name },
        price
      } = elem;
      return (
        <tr key={Math.random()}>
          <td>{storage[0] && <img src={`${storage[0].path}`} alt={`${storage[0].title}`} />}</td>
          <td data-label="Name">{name}</td>

          <td data-label="Description">{city_name}</td>
          <td data-label="Price">{price}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <>
        <div>
          <h1>Hello</h1>
        </div>

        <div>
          <Table component={this.setTable}>
            <thead>
              <tr>
                <th scope="row">Photo</th>
                <th scope="row">Name</th>
                <th scope="row">Address</th>
                <th scope="row">Price</th>
              </tr>
            </thead>
            <tbody>{this.props.data && this.renderList()}</tbody>
          </Table>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.searchPlace.place.filteredBuildingsInfo,
    loading: state.searchPlace.place.searchPlaceLoading,
    error: state.searchPlace.place.searchPlaceLoading
  };
};

export default connect(mapStateToProps, {
  searchPlace
})(ResultPage);
