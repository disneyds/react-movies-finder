import Loader from 'components/Loader/Loader.js';
import LoadMoreButton from 'components/LoadMoreButton/LoadMoreButton.js';
import MoviesList from 'components/MoviesList/MoviesList.js';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { requestLatestMovies } from '../../services/API.js';
import s from './MoviesPage.module.css';
export default class MoviesPage extends Component {
  state = {
    movies: [],
    loading: true,
    page: 1,
    type: 'movie',
  };
  async componentDidMount() {
    await requestLatestMovies(this.state.page).then(resp => {
      this.setState({ movies: resp.results, loading: false });
    });
  }

  async componentDidUpdate() {
    if (this.state.loading)
      await requestLatestMovies(this.state.page)
        .then(resp => {
          if (resp.results.length === 0) {
            return toast.error(`Тут больше ничего нет!`);
          }
          this.setState(prevState => ({
            movies: [...prevState.movies, ...resp.results],
          }));
        })
        .catch(error => {
          if (error) {
            return toast.error(`Что-то пошло не так, попробуйте позже`);
          }
        })
        .finally(
          this.setState({
            loading: false,
          }),
        );
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loading: true,
    }));
  };

  render() {
    const { movies, loading, type } = this.state;
    return (
      <>
        {movies.length > 0 && (
          <div className={s.wrapper}>
            <h1>Фильмы:</h1>
            <MoviesList
              movies={movies}
              getType={this.props.getType}
              type={type}
            />
            {movies.length > 0 && (
              <LoadMoreButton loadMore={this.handleLoadMore} />
            )}
          </div>
        )}
        {loading && <Loader />}
      </>
    );
  }
}
