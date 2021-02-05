import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './MovieDetails.module.css';

export default function MovieDetiles({ movie, url }) {
  return (
    <div className={s.wrapper}>
      <h1 className={s.movieName}>
        {movie.title} ({movie.original_title})
      </h1>
      <div
        className={s.porter}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`,
          backgroundSize: 'cover',
        }}
      >
        <div className={s.posterOverlay}></div>
        <div className={s.dicription}>
          <div className={s.image}>
            <img
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path} `}
              alt={movie.original_title}
            />
            <a
              className={s.movieHomepage}
              href={movie.homepage}
              target="_blank"
              rel="noreferrer"
            >
              Домашняя страница фильма
            </a>
          </div>
          <div className={s.info}>
            <h2 className={s.mainTitle}>{movie.tagline}</h2>
            <div className={s.box}>
              <h3 className={s.title}>Рейтинг:</h3>
              <i className={`material-icons ${s.materialIcons}`}>thumb_up</i>
              <span className={s.rating}>{movie.vote_average}</span>
              <i className={`material-icons ${s.materialIcons}`}>group</i>
              <span className={s.rating}>{movie.vote_count}</span>
            </div>

            <div className={s.box}>
              <h3 className={s.title}>Жанр:</h3>
              <ul className={s.genres}>
                {movie.genres &&
                  movie.genres.map(({ id, name }) => (
                    <li className={s.genre} key={id}>
                      {name}
                    </li>
                  ))}
              </ul>
            </div>

            <div className={s.box}>
              <h3 className={s.title}>Дата релиза:</h3>
              <p>{movie.release_date}</p>
            </div>

            <div className={s.box}>
              <h3 className={s.title}>Время:</h3>
              <p>{movie.runtime} мин.</p>
            </div>

            <div className={s.box}>
              <h3 className={s.title}>О чём "{movie.title}":</h3>
              <p className={s.descr}>{movie.overview}</p>
            </div>

            <nav className={s.nav}>
              <NavLink
                to={`${url}/casts`}
                className={s.link}
                activeClassName={s.activLink}
              >
                Актёры
              </NavLink>
              <NavLink
                to={`${url}/reviews`}
                className={s.link}
                activeClassName={s.activLink}
              >
                Отзывы
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
