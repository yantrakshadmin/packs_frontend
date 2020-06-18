import React from 'react';
import {Router} from '@reach/router';

import ScreenWrapper from 'components/ScreenWrapper';
import {NotFound404Screen} from 'screens/404.screen';

export const PrivateRoutes = ({routes, extraRoutes}) => {
  return (
    <Router>
      <ScreenWrapper path="/" routes={routes}>
        <>
          {routes.map((Route, index) => {
            return <Route.Component path={Route.path} key={index.toString()} />;
          })}
          {routes.map((Route) => {
            return Route.subMenu
              ? Route.subMenu.map((ChildRoute, ind) => (
                  <ChildRoute.Component path={ChildRoute.path} key={ind.toString()} />
                ))
              : null;
          })}
          {extraRoutes
            ? extraRoutes.map((Route, index) => {
                return <Route.Component path={Route.path} key={index.toString()} />;
              })
            : null}
          <NotFound404Screen default />
        </>
      </ScreenWrapper>
    </Router>
  );
};
