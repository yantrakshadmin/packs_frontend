import './App.css';
import 'antd/dist/antd.css';

import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import 'web/src/helpers/shared';

import { store, persistor } from 'common/reducers';

import { Loading } from 'web/src/components/Loading';
import RootRouter from 'web/src/components/RootRouter';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Suspense fallback={<Loading />}>
          <RootRouter />
        </Suspense>
      </PersistGate>
    </Provider>
  );
}

export default App;
