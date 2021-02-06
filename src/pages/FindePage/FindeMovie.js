import React, { Component } from 'react';
import { requestSearch } from 'services/API';
import s from './FindeMovie.module.css';
import MoviesList from '../../components/MoviesList/MoviesList';
import Loader from 'components/Loader/Loader';
import { toast } from 'react-toastify';

export default class FindeMovie extends Component {
  state = {
    query: '',
    page: 1,
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

  handleChange = e => {
    const { value } = e.target;
    this.setState({
      query: value,
    });
  };

  onSubmitForm = e => {
    e.preventDefault();
    const { query } = this.state;
    this.setState({ loading: true });
    requestSearch(query)
      .then(resp => {
        if (resp.results.length === 0) {
          toast.error(`По запросу ${this.state.query} ничего не найдено`);
          this.setState({
            loading: false,
            query: '',
          });
        } else {
          console.log(resp);
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
        <form
          className={s.searchForm}
          id="search-form"
          onSubmit={this.onSubmitForm}
        >
          <input
            className={`${s.formInput} form-control`}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Найти кино..."
            onChange={this.handleChange}
            value={this.state.query}
          />

          <button className={s.btnSub} type="submit">
            Найти
          </button>
        </form>

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
        {loading && <Loader />}
      </div>
    );
  }
}
