import { Route, Switch } from 'react-router-dom';
import React from 'react';
import paths from './paths';

import HomePage from '../../pages/HomePage/HomePage';
import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage';

export default function Routes() {
  return (
    <>
      <Switch>
        <Route path={paths.HOME} exact component={HomePage} />
        <Route
          path={paths.MOVIES_ID(':movieId')}
          component={MovieDetailsPage}
        />
        <Route path={paths.MOVIES} component="" />

        {/* <Route path='/movies/:movieId/cast' component='' />
                <Route path='/movies/:movieId/reviews' component=''/> */}
      </Switch>
    </>
  );
}
