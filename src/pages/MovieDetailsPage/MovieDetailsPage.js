import MovieDetails from '../../components/MovieDetails/MovieDetails';
import Cast from '../../components/Cast/Cast';
import Reviews from '../../components/Reviews/Reviews';
import React, { Component } from 'react';
import { requestDetails } from '../../services/API.js';
import { Route, Switch } from 'react-router-dom';
import Loader from 'components/Loader/Loader';

export default class MovieDetailsPage extends Component {
  state = {
    movie: null,
    loading: true,
  };
  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const { type } = this.props;
    await requestDetails(movieId, type).then(resp => {
      console.log(resp);

      this.setState({ movie: resp, loading: false });
    });
  }

  render() {
    const { movie, loading } = this.state;
    const { match } = this.props;
    console.log(this.props);
    return (
      <>
        {movie && <MovieDetails movie={movie} />}
        {loading && <Loader />}
        <Switch>
          <Route
            path={`${match.path}/casts`}
            render={props => <Cast {...props} type={this.props.type} />}
          />
          <Route
            path={`${match.path}/reviews`}
            render={props => <Reviews {...props} type={this.props.type} />}
          />
        </Switch>
      </>
    );
  }
}
