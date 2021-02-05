import MovieDetails from '../../components/MovieDetails/MovieDetails';
import Cast from '../../components/Cast/Cast';
import Reviews from '../../components/Reviews/Reviews';
import React, { Component } from 'react';
import { requestDetails } from '../../services/API.js';
import { Route, Switch } from 'react-router-dom';

export default class MovieDetailsPage extends Component {
  state = {
    movie: [],
    loading: false,
  };
  async componentDidMount() {
    const { movieId } = this.props.match.params;
    await requestDetails(movieId).then(resp => {
      console.log(resp);

      this.setState({ movie: resp });
    });
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loading: true,
    }));
  };

  render() {
    const { movie } = this.state;
    const { match } = this.props;
    console.log(this.props);
    return (
      <>
        {this.state.movie && <MovieDetails movie={movie} url={match.url} />}
        <Switch>
          <Route path={`${match.path}/casts`} component={Cast} />
          <Route path={`${match.path}/reviews`} component={Reviews} />
        </Switch>
      </>
    );
  }
}
