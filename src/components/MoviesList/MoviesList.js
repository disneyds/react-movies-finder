import React from 'react';
import { withRouter } from 'react-router-dom';
import MoviesListItem from './MovieListItem';
import PropTypes from 'prop-types';

import s from './MoviesList.module.css';

const MoviesList = ({ movies, type }) => {
  return (
    <div className={s.list}>
      {movies.map(movie => {
        return <MoviesListItem movie={movie} key={movie.id} type={type} />;
      })}
    </div>
  );
};
export default withRouter(MoviesList);

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  getType: PropTypes.func.isRequired,
  type: PropTypes.string,
};
