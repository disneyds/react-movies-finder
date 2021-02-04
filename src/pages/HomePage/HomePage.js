import MoviesList from 'components/MoviesList/MoviesList.js';
import React, { Component } from 'react';
import { requestTrendingMovies } from '../../services/API.js';
import s from './HomePage.module.css';
export default class HomePage extends Component {
  state = {
    movies: [],
    loading: false,
    page: 1,
  };
  async componentDidMount() {
    await requestTrendingMovies(this.state.page).then(resp => {
      console.log(resp.results);
      this.setState({ movies: resp.results });
    });
  }

  async componentDidUpdate() {
    if (this.state.loading)
      await requestTrendingMovies(this.state.page).then(resp => {
        console.log(resp.results);
        this.setState(prevState => ({
          movies: [...prevState.movies, ...resp.results],
          loading: false,
        }));
      });
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loading: true,
    }));
  };

  render() {
    return (
      this.state.movies && (
        <div className={s.wrapper}>
          <h1>Популярные фильмы:</h1>
          <MoviesList movies={this.state.movies} />
          {this.state.movies.length > 0 && (
            <button
              type="button"
              className={s.loadMore}
              onClick={this.handleLoadMore}
            >
              Еще...
            </button>
          )}
        </div>
      )
    );
  }
}