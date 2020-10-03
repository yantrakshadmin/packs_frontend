import React from 'react';
import { Typography } from 'antd';
import { AreaChart, Area } from 'recharts';

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

export const LineGraph2 = ({ tagName, count }) => {
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
        <AreaChart width={200} height={120} data={graphdata}>
          <defs>
            <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
            </linearGradient>
            <linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
            </linearGradient>
          </defs>

          <Area type='monotone' dataKey='uv' stroke='#8884d8' fillOpacity={1} fill='url(#colorUv)' />
          <Area type='monotone' dataKey='uv' stroke='#82ca9d' fillOpacity={1} fill='url(#colorPv)' />
        </AreaChart>
      </div>
    </div>
  );
};
