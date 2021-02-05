import React, { Component } from 'react';
import { requestCredits } from 'services/API';
import s from './Cast.module.css';

export default class Cast extends Component {
  state = {
    casts: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    await requestCredits(movieId).then(resp => {
      console.log(resp);
      this.setState({ casts: resp.cast });
    });
  }

  render() {
    const { casts } = this.state;
    return (
      <div className={s.wrapper}>
        <ul className={s.castList}>
          {casts.map(cast => {
            return (
              <li className={s.cast} key={cast.cast_id}>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${cast.profile_path}`}
                  alt={cast.name}
                  className={s.img}
                />
                <h3 className={s.name}>{cast.name}</h3>
                <p className={s.role}>{cast.character}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

// adult
// :
// false

// cast_id
// :
// 63
// character
// :
// "Teenage Girl"
// credit_id
// :
// "6014217fbe2d49003ffdb2a7"
// gender
// :
// 1
// id
// :
// 2941461
// known_for_department
// :
// "Acting"
// name
// :
// "Samantha Cormier"
// order
// :
// 30
// original_name
// :
// "Samantha Cormier"
// popularity
// :
// 0.6
// profile_path
// :
// "/mkklBzfS3ZT9LkN9fnjvDTORQK4.jpg"
// new entry
// :
