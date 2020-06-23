import React from 'react';
import {Typography, Button} from 'antd';

import './404.styles.scss';
import {navigate} from '@reach/router';

const {Text, Title} = Typography;

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
      {/* <Title level={2}>404</Title> */}
      <h1>404</h1>
      {/* <Title level={4}>Page Not Found</Title> */}
      <h2>Page Not Found</h2>
      <Button onClick={() => navigate('/')}>Return To Home</Button>
    </div>
  </div>
);

export default NotFound404Screen;
