import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Button } from 'antd';
import { Link } from '@reach/router';
import SignIn from '../SignIn/sign-in.component';

import './sign-in-master.styles.scss';

const SignInMaster = () => (
  <div className='signInMaster'>
    <div className='logo'>
      <img src='home-logo.png' alt='logoimg' style={{ zIndex: '5' }} />
    </div>
    <img
      src='back3.jpg'
      alt='img'
      style={{
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    />
    <br />
    <br />
    <Row>
      <Col md={10} sm={24}>
        <SignIn />
      </Col>
      <Col md={14}>
        <Button
          type='primary'
          style={{
            position: 'absolute',
            right: '190px',
            top: '160px',
            width: '10px',
            height: '90px',
            opacity: '0',
          }}>
          <Link to='/sign-up/client' />
        </Button>
        <Button
          type='primary'
          style={{
            position: 'absolute',
            right: '150px',
            top: '160px',
            width: '10px',
            height: '90px',
            opacity: '0',
          }}>
          <Link to='/sign-up/employee' />
        </Button>
      </Col>
    </Row>
  </div>
);

export default SignInMaster;
