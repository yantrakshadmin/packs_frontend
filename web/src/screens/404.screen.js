import React from 'react';
import {Button} from 'antd';

import './404.styles.scss';
import {navigate} from '@reach/router';

export const NotFound404Screen = () => (
  <div className="container">
    <div
      className="image"
      style={{
        backgroundImage:
          'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
        height: '400px',
        backgroundPosition: 'center',
      }}></div>
    <div className="content">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <Button onClick={() => navigate('/')}>Return To Home</Button>
    </div>
  </div>
);

export default NotFound404Screen;
