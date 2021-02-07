import React from 'react';
import PropTypes from 'prop-types';
import s from './LoadMoreButton.module.css';

export default function LoadMoreButton({ loadMore }) {
  return (
    <button type="button" className={s.loadMore} onClick={() => loadMore()}>
      Еще...
    </button>
  );
}

LoadMoreButton.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
