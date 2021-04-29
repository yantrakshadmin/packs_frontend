import React from 'react';
import t00 from 'common/assets/TruckImages/t00-removebg-preview.png';
import t10 from 'common/assets/TruckImages/t10-removebg-preview.png';
import t20 from 'common/assets/TruckImages/t20-removebg-preview.png';
import t30 from 'common/assets/TruckImages/t30-removebg-preview.png';
import t40 from 'common/assets/TruckImages/t40-removebg-preview.png';
import t50 from 'common/assets/TruckImages/t50-removebg-preview.png';
import t60 from 'common/assets/TruckImages/t60-removebg-preview.png';
import t70 from 'common/assets/TruckImages/t70-removebg-preview.png';
import t80 from 'common/assets/TruckImages/t80-removebg-preview.png';
import t90 from 'common/assets/TruckImages/t90-removebg-preview.png';
import t100 from 'common/assets/TruckImages/t100-removebg-preview.png';
import _ from 'lodash';

const dict = {
  0: t00,
  10: t10,
  20: t20,
  30: t30,
  40: t40,
  50: t50,
  60: t60,
  70: t70,
  80: t80,
  90: t90,
  100: t100,
};

const TruckLoading = ({style, percentage}) => {
  return (
    <>
      <img style={style} alt="Truck Img" src={dict[_.round(percentage, -1)]} />
      <span style={{padding: '10px'}}>{percentage}% Filled</span>
    </>
  );
};

export default TruckLoading;
