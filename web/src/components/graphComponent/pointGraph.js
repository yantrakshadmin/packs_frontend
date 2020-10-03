import React, { PureComponent } from 'react';
import { ComposedChart, Area, Bar } from 'recharts';
import { Typography } from 'antd';

const data = [
  {
    name: 'Page A',
    uv: 590,
    pv: 800,
    amt: 1400,
  },
  {
    name: 'Page B',
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: 'Page C',
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: 'Page D',
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: 'Page E',
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: 'Page F',
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
];

const jsfiddleUrl = 'https://jsfiddle.net/alidingling/q5atk5jr/';
const { Text } = Typography;
export const PointGraph = ({ tagName, count }) => {
  return (
    <div className='bg-chart1 chart-container'>
      <div className='chart-content'>
        <Text style={{ color: '#fff', fontSize: 20 }}>
          {tagName}
          {'       '}
          {count}
        </Text>
      </div>
      <div className='chart-position'>
        <ComposedChart
          width={280}
          height={120}
          data={data}
          margin={{
            top: 10,
            right: 80,
            bottom: 10,
          }}>
          <Area type='monotone' dataKey='amt' fill='#fff' stroke='#8884d8' />
          {/* <Bar dataKey='pv' barSize={20} fill='#fff' /> */}
        </ComposedChart>
      </div>
    </div>
  );
};
