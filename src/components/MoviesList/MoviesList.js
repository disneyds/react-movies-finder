import React from 'react';
import MoviesListItem from './MovieListItem';

import s from './MoviesList.module.css';

export default function MoviesList({ movies }) {
  return (
    <div className={s.list}>
      {movies.map(movie => {
        return <MoviesListItem movie={movie} key={movie.id} />;
      })}
    </div>
  );
}
