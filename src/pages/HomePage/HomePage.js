import Loader from 'components/Loader/Loader.js';
import MoviesList from 'components/MoviesList/MoviesList.js';
import React, { Component } from 'react';
import { requestTrendingMovies } from '../../services/API.js';
import s from './HomePage.module.css';
export default class HomePage extends Component {
  state = {
    movies: [],
    loading: true,
    page: 1,
  };
  async componentDidMount() {
    await requestTrendingMovies(this.state.page).then(resp => {
      console.log(resp.results);
      this.setState({ movies: resp.results, loading: false });
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
    const { movies, loading } = this.state;
    return (
      <>
        {movies.length > 0 && (
          <div className={s.wrapper}>
            <h1>Популярно:</h1>
            <MoviesList movies={movies} getType={this.props.getType} />
            {movies.length > 0 && (
              <button
                type="button"
                className={s.loadMore}
                onClick={this.handleLoadMore}
              >
                Еще...
              </button>
            )}
          </div>
        )}
        {loading && <Loader />}
      </>
    );
  }
}
