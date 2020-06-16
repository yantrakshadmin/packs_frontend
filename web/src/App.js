import './App.css';
import 'antd/dist/antd.css';


import React, { Suspense } from 'react';
import { Provider } from 'react-redux';

import 'web/src/helpers/shared';

import { store } from 'common/reducers';

import { Loading } from 'web/src/components/Loding';
import { RootRouter } from 'web/src/components/RootRouter';


function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <RootRouter />
      </Suspense>
    </Provider>
  );
}

export default App;
