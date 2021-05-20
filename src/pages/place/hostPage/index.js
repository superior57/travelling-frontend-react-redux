import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import { getPlacesList } from "../../../redux/actions/places.actions/places.thunk";
import history from "../../../history";
import { Link } from "react-router-dom";
import { checkAuth } from "../../../redux/actions/users.actions/auth.thunk";
import styled from "styled-components";

const TdStyled = styled.td`
  width: 300px;

  > img {
    width: 100%;
  }
`;

export class Host extends React.PureComponent {
  componentDidUpdate(prevProps) {
    if (
      !this.props.currentUser ||
      !this.props.currentUser.role ||
      this.props.currentUser.role.role_type !== "Host"
    ) {
      history.push("/profile");
    } else {
      if (this.props.currentUser.id !== prevProps.currentUser.id) {
        this.props.checkAuth();
        this.props.getPlacesList(this.props.currentUser.id);
      }
    }
  }

  renderList() {
    return this.props.data.map(elem => {
      const { name, description, price, storage, id } = elem;
      return (
        <tr key={Math.random()}>
          <TdStyled>
            {storage[0] && (
              <img src={`${storage[0].path}`} alt={`${storage[0].title}`} />
            )}
          </TdStyled>
          <td data-label="Name">
            <Link to={`/edit-place/${id}`}>{name}</Link>
          </td>

          <td data-label="Description">{description}</td>
          <td data-label="Price">{price}</td>
        </tr>
      );
    });
  }

  editHandler = (email, first_name, last_name, password) => {
    this.props.editUser((email, first_name, last_name, password));
  };

  render() {
    if (!this.props.userData || !this.props.userData.email) return null;
    const {
      userData: { email = "", first_name = "" }
    } = this.props;
    return (
      <>
        <div>
          <h1>Hello, my name is {first_name} </h1>
        </div>
        <div>
          <Link to={"/profile"}>Edit Profile</Link>
        </div>
        <div>
          <label htmlFor="email">Email: {email}</label>
        </div>
        <div>
          <Link to={"/buildings"}>Add Venue</Link>
        </div>
        <div>
          <Table component={this.setTable}>
            <thead>
              <tr>
                <th scope="row">Photo</th>
                <th scope="row">Name</th>
                <th scope="row">Description</th>
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

const mapStateToProps = state => {
  return {
    userData: state.auth.user,
    loading: state.auth.loading,
    error: state.auth.error,
    data: state.place.places.buildings,
    currentUser: state.auth.user
  };
};

export default connect(mapStateToProps, {
  checkAuth,
  getPlacesList
})(Host);
