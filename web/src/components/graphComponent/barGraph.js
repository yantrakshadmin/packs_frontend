import React, { PureComponent } from 'react';
import { BarChart, Bar } from 'recharts';
import { Typography } from 'antd';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 5400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 8800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 9300,
    amt: 2100,
  },
];
const { Text } = Typography;

const jsfiddleUrl = 'https://jsfiddle.net/alidingling/9hjfkp73/';

export const BarGraph = ({ tagName, count }) => {
  return (
    <div className='bg-chart2 chart-container'>
      <div className='chart-content'>
        <Text style={{ color: '#fff', fontSize: 20 }}>
          {tagName}
          {'       '}
          {count}
        </Text>
      </div>
      <div className='chart-position'>

        <BarChart
          width={200}
          height={120}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 10,
          }}>
          <Bar dataKey='pv' stackId='a' fill='#a8ddec' />
          <Bar dataKey='amt' stackId='a' fill='#82ca9d' />
        </BarChart>
      </div>
    </div>
  );
};
