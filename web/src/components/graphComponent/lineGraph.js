import React from 'react';
import { Typography } from 'antd';
import { LineChart, Line } from 'recharts';

const { Text } = Typography;

const graphdata = [
  { name: 'Page A', uv: 300, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 450, pv: 2400, amt: 2400 },
  { name: 'Page C', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 300, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 325, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 350, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 350, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 450, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 500, pv: 2400, amt: 2400 },
];

export const LineGraph = ({ tagName, count,width,height }) => {
  return (
    <div className='chart-container bg-chart1'>
      <div className='chart-content'>
        <Text style={{ color: '#fff', fontSize: 20 }}>
          {tagName}
          {'       '}
          {count}
        </Text>
      </div>
      <div className='chart-position'>
        <LineChart width={width || 200} height={height || 80} data={graphdata}>
          <Line type='monotone' dataKey='uv' stroke='#a8ddec' strokeWidth={4} />
        </LineChart>
      </div>
    </div>
  );
};
