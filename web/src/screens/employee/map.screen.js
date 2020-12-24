import React from 'react';
import Iframe from 'react-iframe';
import { DEFAULT_BASE_URL } from 'common/constants/enviroment';

export const Map = () => {
  return (
    <div style={{ width: '100%' }}>
      <Iframe
        src={`${DEFAULT_BASE_URL}/map`}
        width='100%'
        height='500px'
        id='myId'
        styles={{ height: '100%', width: '100%', zoom: '2' }}
        url=''
      />
    </div>
  );
};
export default Map;
