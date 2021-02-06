import React, { Component } from 'react';
import { requestReviews } from 'services/API';
import s from './Reviews.module.css';

export default class Reviews extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const { type } = this.props;
    await requestReviews(movieId, type).then(resp => {
      console.log(resp);
      this.setState({ reviews: resp.results });
    });
  }

  render() {
    const { reviews } = this.state;
    return (
      <div className={s.wrapper}>
        <ul className={s.reviewsList}>
          {reviews.length > 0 ? (
            reviews.map(review => {
              return (
                <li className={s.review} key={review.id}>
                  <div className={s.authorBox}>
                    <h3 className={s.author}>Автор:</h3>
                    <p className={s.authorName}>{review.author}</p>
                  </div>
                  <p className={s.content}>{review.content}</p>
                </li>
              );
            })
          ) : (
            <h1>Тут пока нет отзывов...</h1>
          )}
        </ul>
      </div>
    );
  }
}
