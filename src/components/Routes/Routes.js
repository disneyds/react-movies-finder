import { Route, Switch } from 'react-router-dom';
import React from 'react';
import paths from './paths';

import HomePage from '../../pages/HomePage/HomePage';
import MoviesPage from '../../pages/MoviesPage/MoviesPage';
import Serials from '../../pages/Serials/Serials';
import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage';

export default function Routes() {
  return (
    <>
      <Switch>
        <Route path={paths.HOME} exact component={HomePage} />

        <Route
          path={paths.MOVIES_ID(':movieId')}
          render={props => <MovieDetailsPage {...props} />}
        />

        <Route path={paths.MOVIES} component="" />

        <Route path={paths.FILMS} component={MoviesPage} />

        <Route path={paths.TV} component={Serials} />
      </Switch>
    </>
  );
}
