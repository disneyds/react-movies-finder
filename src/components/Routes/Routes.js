import Loader from 'components/Loader/Loader';
import React, { lazy, Suspense } from 'react';
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

export default function Routes() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route
            path={paths.HOME}
            exact
            render={props => <HomePage {...props} />}
          />

          <Route
            path={paths.MOVIES_ID(':movieId', ':type')}
            render={props => <MovieDetailsPage {...props} />}
          />

          <Route
            path={paths.MOVIES}
            render={props => <FindeMovie {...props} />}
          />

          <Route
            path={paths.FILMS}
            render={props => <MoviesPage {...props} />}
          />

          <Route path={paths.TV} render={props => <Serials {...props} />} />
          <Redirect to={paths.HOME} />
        </Switch>
      </Suspense>
    </>
  );
}
