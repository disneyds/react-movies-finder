import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import s from './MoviesList.module.css';
import defaultPoster from './defaultPoster.png';
import PropTypes from 'prop-types';

const MoviesListItem = ({ movie, type, location }) => {
  return (
    <Link
      to={{
        pathname: `/movies/${movie.id}/${movie.media_type || type}`,
        state: {
          from: location,
        },
      }}
    >
      <li className={s.item}>
        <div className={s.imageBox}>
          {movie.poster_path ? (
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
          ) : (
            <img
              className={s.image}
              src={defaultPoster}
              alt={
                movie.name ||
                movie.title ||
                movie.original_name ||
                movie.original_title
              }
            />
          )}
          <div className={s.overlay}>
            <i className={`material-icons ${s.materialIcons}`}>thumb_up</i>
            <span className={s.rating}>{movie.vote_average}</span>
            <i className={`material-icons ${s.materialIcons}`}>group</i>
            <span className={s.rating}>{movie.vote_count}</span>
          </div>
          {movie.media_type === 'movie' ? (
            <i className={`material-icons ${s.movieIcon}`}>movie</i>
          ) : null}
          {movie.media_type === 'tv' ? (
            <i className={`material-icons ${s.movieIcon}`}>subscriptions</i>
          ) : null}
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
};

export default withRouter(MoviesListItem);

MoviesListItem.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    media_type: PropTypes.string,
    poster_path: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    original_name: PropTypes.string,
    original_title: PropTypes.string,
    vote_average: PropTypes.number,
    vote_count: PropTypes.number,
  }).isRequired,
  getType: PropTypes.func.isRequired,
  type: PropTypes.string,
};
