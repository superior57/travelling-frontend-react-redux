import React from 'react';
import './styles.scss';

export default function OwnerLabel() {
  return (
    <div className="owner-label">
      <span role="img" aria-label="medal" className="medal">
        &#129351;
      </span>
      <span className="owner">Super Owner</span>
    </div>
  );
}
