// import React from 'react';

// import styled from 'styled-components';
// import { checkAuth } from '../../../redux/actions/users.actions/auth.thunk';
// import { connect } from 'react-redux';
// import { Container, Row, Col, Form } from 'reactstrap';
// import LeftMenu from './LeftMenu';
// import './MainBlock.scss';

// class MainBlock extends React.PureComponent {
//     componentDidMount() {
//         this.props.checkAuth();
//     }

//     render() {

//         return (
//             <Container style={{ height: '100%' }}>
//                 <Row className="mainContainerListing" style={{ height: '100%' }}>
//                     <Col xs="12" className="pl-0 pr-0 w-100">
//                         <LeftMenu />
//                     </Col>
//                 </Row>
//             </Container>
//         )
//     }
// }

// const mapStateToProps = state => ({
//     isAuthenticated: state.auth.isAuthenticated,
//     checkAuthError: state.auth.checkAuthError,
//     loginError: state.auth.loginError
// });

// export default connect(mapStateToProps, {
//     checkAuth
// })(MainBlock);
