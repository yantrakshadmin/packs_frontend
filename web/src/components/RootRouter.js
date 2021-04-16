import React from 'react';
import {Router} from '@reach/router';
import {connect} from 'react-redux';
import {
  publicRoutes,
  employeeRoutes,
  clientRoutes,
  extraRoutesEmployee,
  extraRoutesClient,
  outerRoutesEmployee,
  outerRoutesClient,
} from 'web/src/constants/routes';

import {ADMIN_USERNAME_ARRAY} from 'web/src/constants/adminUsernames';

import {PrivateRoutes} from 'components/PrivateRoutes';
import {NotFound404Screen} from 'screens/404.screen';

const RootRouter = ({user}) => {
  if (user) {
    switch (user.type) {
      case 'public':
        return (
          <Router>
            {publicRoutes.map((Route, index) => {
              return <Route.Component path={Route.path} key={index.toString()} />;
            })}
            <NotFound404Screen default />
          </Router>
        );

      case 'employee':
        return (
          <PrivateRoutes
            routes={
              ADMIN_USERNAME_ARRAY.includes(user.username)
                ? employeeRoutes
                : employeeRoutes.slice(0, -1)
            }
            extraRoutes={extraRoutesEmployee}
            outerRoutes={outerRoutesEmployee}
            user={user}
          />
        );
      case 'client':
        return (
          <PrivateRoutes
            routes={clientRoutes}
            extraRoutes={extraRoutesClient}
            outerRoutes={outerRoutesClient}
            user={user}
          />
        );

      default:
        return null;
    }
  }
};

const mapStateToProps = (state) => {
  return {user: state.user.userMeta};
};

export default connect(mapStateToProps)(RootRouter);
