import React from 'react';
import Header from '../../../../components/Header';

const EmailSent = () => {
  return (
    <>
      <Header isAdmin />
      <div className="container">
        <div className="alert alert-success">
          <h4 className="text-center text-success">
            Your account request has been received, once it gets approved, you'll be notified.
          </h4>
        </div>
      </div>
    </>
  );
};

export default EmailSent;
