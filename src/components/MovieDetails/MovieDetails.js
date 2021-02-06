import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import s from './MovieDetails.module.css';
import plus0 from './0-plus-1-48.png';
import plus18 from './18-plus-2-48.png';
import paths from 'components/Routes/paths';

const MovieDetiles = ({ movie, match, history, location }) => {
  const goBack = () => {
    // if (location.state && location.state.from){
    //   return history.push(location.state.from)}
    // history.push(paths.HOME)

    history.push(location?.state?.from || paths.HOME);
  };
  return (
    <div className={s.wrapper}>
      <h1 className={s.movieName}>
        {movie.title || movie.name} (
        {movie.original_title || movie.original_name})
      </h1>
      <button className={s.goBack} type="button" onClick={goBack}>
        Назад
      </button>
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
              className={s.smallImg}
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path} `}
              alt={movie.original_name}
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
              <p>{movie.release_date || movie.first_air_date}</p>
            </div>

            <div className={s.box}>
              <h3 className={s.title}>Время:</h3>
              <p>{movie.runtime || movie.episode_run_time} мин.</p>
            </div>

            <div className={s.box}>
              <h3 className={s.title}>О чём "{movie.title || movie.name}":</h3>
              <p className={s.descr}>{movie.overview}</p>
            </div>

            <nav className={s.nav}>
              <NavLink
                to={`${match.url}/casts`}
                className={s.link}
                activeClassName={s.activLink}
              >
                Актёры
              </NavLink>
              <NavLink
                to={`${match.url}/reviews`}
                className={s.link}
                activeClassName={s.activLink}
              >
                Отзывы
              </NavLink>
            </nav>
            {movie.adult && movie.adult ? (
              <div className={s.adult}>
                {' '}
                <img src={plus18} alt="18+" />{' '}
              </div>
            ) : (
              <div className={s.adult}>
                {' '}
                <img src={plus0} alt="0+" />{' '}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(MovieDetiles);
