import { Route, Switch } from 'react-router-dom';
import React from 'react';

import HomePage from '../../pages/HomePage/HomePage';

export default function Routes() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/movies" component="" />
        <Route path="/movies/:movieId" component="" />
        {/* <Route path='/movies/:movieId/cast' component='' />
                <Route path='/movies/:movieId/reviews' component=''/> */}
      </Switch>
    </>
  );
}
