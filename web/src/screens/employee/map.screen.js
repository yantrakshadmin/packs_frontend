import React from 'react';
import Iframe from 'react-iframe';
import {DEFAULT_BASE_URL} from 'common/constants/enviroment';

export const Map = () => {
  return (
    <div style={{width: '100%'}}>
      <Iframe
        //src={`${DEFAULT_BASE_URL}/map`}
        src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15245251.940897282!2d78.80658824790035!3d21.11315074687327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1616134678845!5m2!1sen!2sin`}
        width="100%"
        height="500px"
        id="myId"
        styles={{height: '100%', width: '100%', zoom: '2'}}
        url=""
      />
    </div>
  );
};
export default Map;
