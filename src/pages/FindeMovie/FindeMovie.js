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
    page: 1,
    movies: [],
    loading: false,
  };

  componentDidMount() {
    const params = this.getSearchQuery(this.props.location.search, 'query');
    if (params) {
      this.setState({ loading: true });
      this.searchMovies(params);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const params = this.getSearchQuery(this.props.location.search, 'query');
    const prevParams = this.getSearchQuery(prevProps.location.search, 'query');
    const { page } = this.state;
    if (params !== prevParams || prevState.page !== page)
      this.searchMovies(params, page);
  }

  async searchMovies(query, page) {
    await requestSearch(query, page)
      .then(resp => {
        if (resp.results.length === 0) {
          toast.error(`По запросу ${query} ничего не найдено`);
          this.setState({
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

  getSearchQuery(searchString, query) {
    return new URLSearchParams(searchString).get(query);
  }

  onSubmitForm = query => {
    const params = this.getSearchQuery(this.props.location.search, 'query');
    const { pathname } = this.props.location;
    if (params !== query && params !== '') {
      this.props.history.push({
        pathname,
        search: `query=${query}`,
      });
      this.setState({ movies: [], loading: true });
    }
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
            <MoviesList movies={movies} />
            <LoadMoreButton loadMore={this.handleLoadMore} />
          </>
        )}
        {loading && <Loader />}
      </div>
    );
  }
}
