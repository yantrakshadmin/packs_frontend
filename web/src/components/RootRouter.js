import React from 'react';
import {Router} from '@reach/router';
import {connect} from 'react-redux';
import {publicRoutes, employeeRoutes, clientRoutes} from 'web/src/constants/routes';

import {PrivateRoutes} from 'components/PrivateRoutes';
import {NotFound404Screen} from 'screens/404.screen';

/**
 * @return {*[]}
 */
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

      // case null:
      //   return <PrivateRoutes routes={shipperRoutes} extraRoutes={extraRoutesShipper} />;

      case 'employee':
        return <PrivateRoutes routes={employeeRoutes} />;
      case 'client':
        return <PrivateRoutes routes={clientRoutes} />;

      default:
        return null;
    }
  }
};

const mapStateToProps = (state) => {
  return {user: state.user.userMeta};
};

export default connect(mapStateToProps)(RootRouter);
