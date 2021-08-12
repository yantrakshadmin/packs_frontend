import React from 'react';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import {navigate} from '@reach/router';

import { signOutUser } from 'common/actions/signIn';
import './404.styles.scss';

export const SuspendedAccount = () => {
  const dispatch = useDispatch();
  return(
    <div className='container'>
      <div
        className='image'
        style={{
          backgroundImage:
          'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
          height: '400px',
          backgroundPosition: 'center',
        }} />
      <div className='content'>
        <h1>Your Account is Suspended</h1>
        <h2>Please Contact Your Sales Manager!</h2>
        <Button onClick={async () => {dispatch(signOutUser());await navigate('/');}}>Logout</Button>
      </div>
    </div>
  );}

export default SuspendedAccount;
