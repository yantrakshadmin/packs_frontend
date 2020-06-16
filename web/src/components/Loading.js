import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

export const Loading = () => {
  return (
    <div className='column h-100 w-100 align-center justify-center'>
      <div className='m-2'>
        <LoadingOutlined style={{ fontSize: 30 }} />
      </div>
      <p>Loading...</p>
    </div>
  );
};
