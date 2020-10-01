import React, { Component } from "react";

import { PieChart, Pie, Tooltip, Sector } from "recharts";

const renderActiveShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  value
}) => {
  const RADIAN = Math.PI / 180;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill='none'
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill='#000'
      >
        {`Value ${value}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill='#20a8d4'
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default class PieChartTwoLevel extends Component {
  constructor(props) {
    super(props);
    this.state={
      activeIndex:0,
    }
  }

  onPieEnter = (data, index) => {
    this.setState({ activeIndex: index });
  };

  render() {
    const { activeIndex } = this.state;
    const { data,title } = this.props;
    return (
      <PieChart width={700} height={400}>
        <text
          x={305}
          y={205}
          fill='#000'
          textAnchor='middle'
          dominantBaseline='middle'
        >
          {title}
        </text>
        <Pie
          dataKey='value'
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx={300}
          cy={200}
          innerRadius={70}
          outerRadius={100}
          fill='#20a8d4'
          onMouseEnter={this.onPieEnter}
          />
        <Tooltip />
      </PieChart>
    );
  }
}
