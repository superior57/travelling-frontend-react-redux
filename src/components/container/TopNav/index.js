import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import history from "../../../history";
import Button from "../../styledComp/Button";
import NavigationLink from "../NavigationLink";

export class TopNav extends React.PureComponent {
  onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("permissions");
    localStorage.removeItem("role_type");
    localStorage.removeItem("role_id");
    history.push("/");
  };

  render() {
    let pathname;
    if (this.props.location) {
      pathname = this.props.location.pathname;
    }
    return (
      <div>
        <Nav tabs>
          <Nav className="ml-auto">
            <NavItem>
              <NavigationLink
                active={pathname === "/buildings"}
                route="/buildings"
              >
                Place
              </NavigationLink>
            </NavItem>
            <NavItem>
              <NavigationLink active={pathname === "/listing"} route="/listing">
                Listing
              </NavigationLink>
            </NavItem>
            <NavItem>
              <NavigationLink active={pathname === "/host"} route="/host">
                Host
              </NavigationLink>
            </NavItem>
            <NavItem>
              <NavigationLink active={pathname === "/admin"} route="/admin">
                Admin
              </NavigationLink>
            </NavItem>
            <NavItem>
              <NavigationLink active={pathname === "/profile"} route="/profile">
                Profile
              </NavigationLink>
            </NavItem>
            <NavItem>
              <NavigationLink active={pathname === "/"} route="/">
                Home
              </NavigationLink>
            </NavItem>
            <NavItem>
              <Button onClick={this.onLogout} active>
                LogOut
              </Button>
            </NavItem>
          </Nav>
        </Nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  roleId: state.auth.user.role.id
});

export default connect(mapStateToProps)(withRouter(TopNav));
