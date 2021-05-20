import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { ReactComponent as Unlike } from './assets/unlike.svg';
import { ReactComponent as Like } from './assets/like.svg';

function SaveButton({ toggleFavorite, isFavorite }) {
  return (
    <div className="save">
      <button className="save-btn" onClick={toggleFavorite}>
        {isFavorite ? (
          <span>
            <Like className="save-svg" /> Saved
          </span>
        ) : (
          <span>
            <Unlike className="save-svg" /> Save
          </span>
        )}
      </button>
    </div>
  );
}

SaveButton.propTypes = {
  isFavorite: PropTypes.bool,
  toggleFavorite: PropTypes.func
};

export default SaveButton;
