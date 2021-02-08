import paths from 'components/Routes/paths';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { requestReviews } from 'services/API';
import s from './Reviews.module.css';
import ReviewsItem from './ReviewsItem';

export default class Reviews extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    const { movieId, type } = this.props.match.params;
    await requestReviews(movieId, type)
      .then(resp => {
        this.setState({ reviews: resp.results });
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
    const { reviews } = this.state;

    return (
      <div className={s.wrapper}>
        <ul className={s.reviewsList}>
          {reviews.length > 0 ? (
            reviews.map(review => (
              <ReviewsItem key={review.id} review={review} />
            ))
          ) : (
            <h1>Тут пока нет отзывов...</h1>
            // toast.warning(`Тут пока ничего нет!`)
          )}
        </ul>
      </div>
    );
  }
}
