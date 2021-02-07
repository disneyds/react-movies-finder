import React, { Component } from 'react';
import { requestSearch } from 'services/API';
import s from './FindeMovie.module.css';
import MoviesList from '../../components/MoviesList/MoviesList';
import Loader from 'components/Loader/Loader';
import { toast } from 'react-toastify';
import LoadMoreButton from 'components/LoadMoreButton/LoadMoreButton';
import SearchForm from 'components/SearchForm/SearchForm';

export default class FindeMovie extends Component {
  state = {
    query: '',
    page: null,
    movies: [],
    loading: false,
  };

  async componentDidUpdate() {
    const { query, page } = this.state;
    if (this.state.loading)
      await requestSearch(query, page)
        .then(resp => {
          if (resp.results.length === 0) {
            toast.error(`По запросу ${this.state.query} ничего не найдено`);
            this.setState({
              loading: false,
              query: '',
            });
          } else {
            this.setState(prevState => ({
              movies: [...prevState.movies, ...resp.results],
            }));
          }
        })
        .catch(error => {
          if (error) {
            return toast.error(`Что-то пошло не так, попробуйте позже`);
          }
        })
        .finally(this.setState({ loading: false }));
  }

  onSubmitForm = query => {
    if (query === this.state.query || query === '')
      return toast.warning('Введите запрос');
    this.setState({ loading: true, query, page: 1, movies: [] });
    requestSearch(query)
      .then(resp => {
        if (resp.results.length === 0) {
          toast.error(`По запросу ${this.state.query} ничего не найдено`);
          this.setState({
            loading: false,
            query: '',
          });
        } else {
          this.setState({ movies: resp.results });
        }
      })
      .finally(this.setState({ loading: false }));
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loading: true,
    }));
  };

  render() {
    const { movies, loading } = this.state;
    return (
      <div className={s.wrapper}>
        <SearchForm onSubmit={this.onSubmitForm} />

        {movies.length > 0 && (
          <>
            <MoviesList movies={movies} getType={this.props.getType} />
            <LoadMoreButton loadMore={this.handleLoadMore} />
          </>
        )}
        {loading && <Loader />}
      </div>
    );
  }
}
