import React from 'react';
import { withRouter } from 'react-router-dom';
import MoviesListItem from './MovieListItem';

import s from './MoviesList.module.css';

const MoviesList = ({ movies, getType, type }) => {
  return (
    <div className={s.list}>
      {movies.map(movie => {
        return (
          <MoviesListItem
            movie={movie}
            key={movie.id}
            getType={getType}
            type={type}
          />
        );
      })}
    </div>
  );
};
export default withRouter(MoviesList);
