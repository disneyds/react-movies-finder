import PropTypes from 'prop-types';
import React from 'react';
import s from './Reviews.module.css';

export default function ReviewsItem({ review }) {
  return (
    <li className={s.review}>
      <div className={s.authorBox}>
        <h3 className={s.author}>Автор:</h3>
        <p className={s.authorName}>{review.author}</p>
      </div>
      <p className={s.content}>{review.content}</p>
    </li>
  );
}

ReviewsItem.propTypes = {
  rewiew: PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
};
