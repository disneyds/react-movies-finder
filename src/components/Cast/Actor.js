import PropTypes from 'prop-types';
import React from 'react';
import s from './Cast.module.css';
import defAvatar from './defAvatar.png';

export default function Actor({ actor }) {
  return (
    <li className={s.cast}>
      {actor.profile_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
          alt={actor.name}
          className={s.img}
        />
      ) : (
        <img src={defAvatar} alt={actor.name} className={s.img} />
      )}

      <h3 className={s.name}>{actor.name}</h3>
      <p className={s.role}>{actor.character}</p>
    </li>
  );
}

Actor.propTypes = {
  actor: PropTypes.shape({
    name: PropTypes.string.isRequired,
    character: PropTypes.string,
    profile_path: PropTypes.string,
  }).isRequired,
};
