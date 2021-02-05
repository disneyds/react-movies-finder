import React, { Component } from 'react';
import { requestReviews } from 'services/API';
import s from './Reviews.module.css';

export default class Reviews extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    await requestReviews(movieId).then(resp => {
      console.log(resp);
      this.setState({ reviews: resp.results });
    });
  }

  render() {
    const { reviews } = this.state;
    return (
      <div className={s.wrapper}>
        <ul className={s.reviewsList}>
          {reviews &&
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
            })}
        </ul>
      </div>
    );
  }
}

// id: 732450
// page: 1
// results: Array(1)
// 0:
// author: "JPV852"
// author_details: {name: "", username: "JPV852", avatar_path: "/xNLOqXXVJf9m7WngUMLIMFsjKgh.jpg", rating: 7}
// content: "Has its moments I guess and liked the 1970s-like styling though another animated movie where Batman is merely there to help sell rather than a major factor in the story. Gets a bit repetitive towards the end to the point I was kind of dosing off but didn't mind the animation and the voice acting was okay. **3.25/5**"
// created_at: "2021-01-21T21:25:23.820Z"
// id: "6009f143391b9c0042d24e07"
// updated_at: "2021-01-28T17:23:17.133Z"
// url: "https://www.themoviedb.org/review/6009f143391b9c0042d24e07"
// __proto__: Object
// length: 1
// __proto__: Array(0)
// total_pages: 1
// total_results: 1
// __proto__: Object
