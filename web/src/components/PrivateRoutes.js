import React from 'react';
import { Router } from '@reach/router';

import ScreenWrapper from 'components/ScreenWrapper';
import Redirect from 'components/Redirect';
import { NotFound404Screen } from 'screens/404.screen';

export const PrivateRoutes = ({ routes, extraRoutes, user, outerRoutes }) => {
  return (
    <Router>
      <Redirect path='/' user={user} />

      {outerRoutes
        ? outerRoutes.map((Route, index) => {
          return (
            <Route.Component
              path={`/${user.type}${Route.path}`}
              key={index.toString()}
              {...Route.props} />
          );
        })
        : null}
      <ScreenWrapper path={`/${user.type}/`} routes={routes}>
        {routes.map((Route, index) => {
          return <Route.Component path={`${Route.path}`} key={index.toString()} {...Route.props} />;
        })}
        {routes.map((Route) => {
          return Route.subMenu
            ? Route.subMenu.map((ChildRoute, index) => (
              <ChildRoute.Component
                path={`${ChildRoute.path}`}
                key={index.toString()}
                {...ChildRoute.props} />
            ))
            : null;
        })}
        {extraRoutes
          ? extraRoutes.map((Route, index) => {
            return (
              <Route.Component
                path={`${Route.path}`}
                key={index.toString()}
                {...Route.props} />
            );
          })
          : null}
        <NotFound404Screen default />
      </ScreenWrapper>
    </Router>
  );
};
