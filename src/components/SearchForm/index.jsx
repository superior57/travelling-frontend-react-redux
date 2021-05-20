import React from 'react';
import './style.scss';

class SearchForm extends React.PureComponent {
  render() {
    return (
      <div className="SearchForm">
        <input className="SearchForm-input" placeholder="Where are you going?" />
        <button className="SearchForm-btn">Search</button>
      </div>
    );
  }
}

export default SearchForm;
