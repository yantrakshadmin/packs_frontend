/* eslint-disable react/no-multi-comp */
import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

// let data = [
//   {
//     name: 'Page A', Returns: 4000, Allotments: 2400,
//   },
//   {
//     name: 'Page B', Return: 3000, Allotments: 1398,
//   },
//   {
//     name: 'Page C', Return: 2000, Allotments: 9800,
//   },
//   {
//     name: 'Page D', Return: 2780, Allotments: 3908,
//   },
//   {
//     name: 'Page E', Return: 1890, Allotments: 4800,
//   },
//   {
//     name: 'Page F', Return: 2390, Allotments: 3800,
//   },
//   {
//     name: 'Page G', Return: 3490, Allotments: 4300,
//   },
// ];

class CustomizedLabel extends PureComponent {
  render() {
    const {
      x, y, stroke, value,
    } = this.props;

    return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>;
  }
}

class CustomizedAxisTick extends PureComponent {
  render() {
    const {
      x, y, stroke, payload,
    } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
      </g>
    );
  }
}

export default class TwoLevelBarCharts extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/5br7g9d6/';

  render() {
    const { data,title } = this.props;
console.log(data)
    return (
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Allotments" stroke="#8884d8" label={<CustomizedLabel />} />
        <Line type="monotone" dataKey="Return" stroke="#82ca9d" />
      </LineChart>
    );
  }
}
