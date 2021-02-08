import MovieDetails from '../../components/MovieDetails/MovieDetails';
import Cast from '../../components/Cast/Cast';
import Reviews from '../../components/Reviews/Reviews';
import React, { Component } from 'react';
import { requestDetails } from '../../services/API.js';
import { Route, Switch } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import { toast } from 'react-toastify';
import paths from 'components/Routes/paths';

export default class MovieDetailsPage extends Component {
  state = {
    movie: null,
    loading: true,
  };
  async componentDidMount() {
    const { movieId, type } = this.props.match.params;

    await requestDetails(movieId, type)
      .then(resp => {
        this.setState({ movie: resp });
      })
      .catch(error => {
        if (error) {
          toast.error(`Что-то пошло не так, попробуйте позже`);
          this.props.history.push(paths.HOME);
          return;
        }
      })
      .finally(
        this.setState({
          loading: false,
        }),
      );
  }

  render() {
    const { movie, loading } = this.state;
    const { match } = this.props;
    return (
      <>
        {movie && <MovieDetails movie={movie} />}
        {loading && <Loader />}
        <Switch>
          <Route
            path={`${match.path}/casts`}
            render={props => <Cast {...props} />}
          />
          <Route
            path={`${match.path}/reviews`}
            render={props => <Reviews {...props} />}
          />
        </Switch>
      </>
    );
  }
}
