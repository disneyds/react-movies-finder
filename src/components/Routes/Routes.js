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
          <Route path={paths.HOME} exact component={HomePage} />

          <Route
            path={paths.MOVIES_ID(':movieId', ':type')}
            component={MovieDetailsPage}
          />

          <Route path={paths.MOVIES} component={FindeMovie} />

          <Route path={paths.FILMS} component={MoviesPage} />

          <Route path={paths.TV} component={Serials} />
          <Redirect to={paths.HOME} />
        </Switch>
      </Suspense>
    </>
  );
}
