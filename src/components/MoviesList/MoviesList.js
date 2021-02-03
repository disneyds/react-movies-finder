import React from 'react';
import { Link } from 'react-router-dom';
import s from './MoviesList.module.css';

export default function MoviesList({ movies }) {
  return (
    <div className={s.list}>
      {movies.map(movie => {
        return (
          <Link>
            <li className={s.item} key={movie.id}>
              <div className={s.imageBox}>
                <img
                  className={s.image}
                  src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                  alt={
                    movie.name ||
                    movie.title ||
                    movie.original_name ||
                    movie.original_title
                  }
                />
                <div className={s.overlay}>
                  <i className={`material-icons ${s.materialIcons}`}>
                    thumb_up
                  </i>
                  <span className={s.rating}>{movie.vote_average}</span>
                  <i className={`material-icons ${s.materialIcons}`}>group</i>
                  <span className={s.rating}>{movie.vote_count}</span>
                </div>
              </div>

              <p className={s.name}>
                {movie.name ||
                  movie.title ||
                  movie.original_name ||
                  movie.original_title}
              </p>
            </li>
          </Link>
        );
      })}
    </div>
  );
}
