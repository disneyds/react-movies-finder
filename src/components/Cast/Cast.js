import paths from 'components/Routes/paths';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { requestCredits } from 'services/API';
import Actor from './Actor';
import s from './Cast.module.css';

export default class Cast extends Component {
  state = {
    casts: [],
  };

  async componentDidMount() {
    const { movieId, type } = this.props.match.params;
    await requestCredits(movieId, type)
      .then(resp => {
        this.setState({ casts: resp.cast });
      })
      .catch(error => {
        if (error) {
          toast.error(`Что-то пошло не так, попробуйте позже`);
          this.props.history.push(paths.HOME);
          return;
        }
      });
  }

  render() {
    const { casts } = this.state;
    console.log(casts);
    return (
      <div className={s.wrapper}>
        <ul className={s.castList}>
          {casts.length > 0 ? (
            casts.map(cast => <Actor key={cast.id} actor={cast} />)
          ) : (
            <h1>У нас нет информации об актёрском составе...</h1>
            // toast.warning(`У нас нет информации об актёрском составе...`)
          )}
        </ul>
      </div>
    );
  }
}
