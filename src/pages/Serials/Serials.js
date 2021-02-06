import Loader from 'components/Loader/Loader.js';
import MoviesList from 'components/MoviesList/MoviesList.js';
import React, { Component } from 'react';
import { requestTV } from '../../services/API.js';
import s from './Serials.module.css';
export default class Serials extends Component {
  state = {
    movies: [],
    loading: true,
    page: 1,
    type: 'tv',
  };
  async componentDidMount() {
    await requestTV(this.state.page).then(resp => {
      console.log(resp.results);
      this.setState({ movies: resp.results, loading: false });
    });
  }

  async componentDidUpdate() {
    if (this.state.loading)
      await requestTV(this.state.page).then(resp => {
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
    const { movies, loading, type } = this.state;
    return (
      <>
        {movies.length > 0 && (
          <div className={s.wrapper}>
            <h1>Сериалы:</h1>
            <MoviesList
              movies={movies}
              getType={this.props.getType}
              type={type}
            />
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
