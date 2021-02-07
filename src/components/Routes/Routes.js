import Loader from 'components/Loader/Loader';
import React, { Component, lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import paths from './paths';

const HomePage = lazy(() =>
  import('../../pages/HomePage/HomePage' /* webpackChunkName: "HomePage" */),
);
const MoviesPage = lazy(() =>
  import(
    '../../pages/MoviesPage/MoviesPage' /*webpackChunkName: "MoviesPage" */
  ),
);
const Serials = lazy(() =>
  import('../../pages/Serials/Serials' /*webpackChunkName: "Serials" */),
);
const FindeMovie = lazy(() =>
  import(
    '../../pages/FindeMovie/FindeMovie' /*webpackChunkName: "FindeMovie" */
  ),
);
const MovieDetailsPage = lazy(() =>
  import(
    '../../pages/MovieDetailsPage/MovieDetailsPage' /*webpackChunkName: "MovieDetailsPage" */
  ),
);

export default class Routes extends Component {
  state = {
    type: null,
  };

  handleGetType = type => {
    this.setState({ type });
  };

  render() {
    return (
      <>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route
              path={paths.HOME}
              exact
              render={props => (
                <HomePage {...props} getType={this.handleGetType} />
              )}
            />

            <Route
              path={paths.MOVIES_ID(':movieId')}
              render={props => (
                <MovieDetailsPage {...props} type={this.state.type} />
              )}
            />

            <Route
              path={paths.MOVIES}
              render={props => (
                <FindeMovie {...props} getType={this.handleGetType} />
              )}
            />

            <Route
              path={paths.FILMS}
              render={props => (
                <MoviesPage {...props} getType={this.handleGetType} />
              )}
            />

            <Route
              path={paths.TV}
              render={props => (
                <Serials {...props} getType={this.handleGetType} />
              )}
            />
            <Redirect to={paths.HOME} />
          </Switch>
        </Suspense>
      </>
    );
  }
}
