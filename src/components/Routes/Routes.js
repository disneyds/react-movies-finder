import { Route, Switch } from 'react-router-dom';

import paths from './paths';

import HomePage from '../../pages/HomePage/HomePage';
import MoviesPage from '../../pages/MoviesPage/MoviesPage';
import Serials from '../../pages/Serials/Serials';
import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage';
import FindeMovie from '../../pages/FindePage/FindeMovie';

import React, { Component } from 'react';

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
        </Switch>
      </>
    );
  }
}
