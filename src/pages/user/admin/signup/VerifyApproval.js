import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { verifyApproval } from '../../../../redux/actions/users.actions/auth.thunk';
import { Spinner } from 'reactstrap';
import Header from '../../../../components/Header';

const VerifyApproval = ({
  verifyApproval,
  match: {
    params: { token, verification_code }
  },
  loading,
  approved,
  approvalError
}) => {
  useEffect(() => {
    verifyApproval(token, verification_code);
  }, []);

  return (
    <div>
      <Header isAdmin />
      {loading && (
        <div className="pageCenter">
          <Spinner />
        </div>
      )}
      {approvalError && !loading && (
        <div className="container">
          <div className="alert alert-danger">
            <h4 className="text-center text-danger">
              Sorry, the token is either expired or invalid.
            </h4>
          </div>
        </div>
      )}
      {approved && approved.role && !loading && (
        <div className="container">
          <div className="alert alert-success">
            <h4 className="text-center text-success">
              You just approved&nbsp;
              <b>
                {approved.first_name && approved.first_name}&nbsp;
                {approved.last_name && approved.last_name}&nbsp;({approved.email})
              </b>
              &nbsp;as&nbsp;
              <b>{approved.role.role_type}</b>.
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  approved: state.auth.approved,
  approvalError: state.auth.approvalError
});

export default connect(mapStateToProps, { verifyApproval })(withRouter(VerifyApproval));
