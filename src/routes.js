
import React from'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

var DefaultRoute = Router.DefaultRoute;

var NotFoundRoute = Router.NotFoundRoute;

var Redirect = Router.Redirect;


var routes = (
  <Route name="app" path="/" handler={require('./App')}>
    <DefaultRoute handler={require('./components/about/aboutPage')} />
    <Route name="about" handler={require('./components/about/aboutPage')} />
    <Route name="login" handle={require('./components/account/loginPage')} />
    <Route name="users" handle={require('./components/account/profilePage')} />
  </Route>
);

export default routes;