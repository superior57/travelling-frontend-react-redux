import React from 'react';
import { connect } from 'react-redux';
import { TopNav } from '../../../components/container/TopNav';
import { Table } from 'reactstrap';
import { getUsersList } from '../../../redux/actions/users.actions/admin.thunk';
import history from '../../../history';

export class Admin extends React.PureComponent {
  componentDidMount() {
    if (
      !this.props.currentUser ||
      !this.props.currentUser.role ||
      this.props.currentUser.role.role_type !== 'Supervisor'
    ) {
      history.push('/profile');
    } else {
      this.props.getUsersList();
    }
  }

  renderList() {
    return this.props.data.users.map((elem) => {
      const { role, email, first_name, last_name } = elem;
      return (
        <tr key={Math.random()}>
          <td data-label="User Role">{role.role_type}</td>
          <td data-label="Email">{email}</td>
          <td data-label="First Name">{first_name}</td>
          <td data-label="Last Name">{last_name}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <>
        {/* <TopNav /> */}
        <div>
          <h1>ADMIN</h1>
        </div>
        <div>
          <Table component={this.setTable}>
            <thead>
              <tr>
                <th scope="row">USER ROLE</th>
                <th scope="row">EMAIL</th>
                <th scope="row">FIRST NAME</th>
                <th scope="row">LAST NAME</th>
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
    data: state.admin.data,
    loading: state.admin.loading,
    error: state.admin.error,
    currentUser: state.auth.user
  };
};

export default connect(mapStateToProps, {
  getUsersList
})(Admin);
