import React, { useState } from 'react';
import { Row, Col, Select, Typography } from 'antd';
import TwoLevelPieCharts from 'components/TwoLevelPieCharts';
import { useFilterPieChartData } from 'hooks/filterPieChart';
import { LineChart, Line, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';
import { LineGraph } from '../../components/graphComponent/lineGraph';
import { LineGraph2 } from '../../components/graphComponent/lineGraph2';
import { BarGraph } from '../../components/graphComponent/barGraph';
import { PointGraph } from '../../components/graphComponent/pointGraph';

const { Option } = Select;

const graphdata2 = [
  { name: 'Page A', uv: 300, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 450, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 350, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 450, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 300, pv: 2400, amt: 2400 },
  { name: 'Page C', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 300, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 325, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 450, pv: 2400, amt: 2400 },
];
const graphdata3 = [
  { name: 'Page A', uv: 300, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 450, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 300, pv: 2400, amt: 2400 },
  { name: 'Page C', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 300, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 350, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 450, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 325, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 500, pv: 2400, amt: 2400 },
];

const dummy = {
  FSS001: 1936,
  FIN1196A: 1,
  FIN1196B: 1,
  FIN1196C: 1,
  FIN1196D: 1,
  FIN1151A: 518,
  FIN1151B: 90,
  FIN1182A: 113,
  FIN1182B: 87,
  FIN1182C: 14,
  FIN1187: 111,
  PB1162: 12,
  FIN1184A: 1,
  FIN1162A1: 133,
  FIN1162A2: 67,
  FIN1162B1: 124,
  FIN1162B2: 42,
  FIN1198A: 151,
  CIN1198A: 67,
  CIN1198B: 97,
  CIN1198C: 163,
  CIN1199A: 35,
  FIN1199A: 36,
  CSS001: 501,
  PB1198: 213,
  FIN1199B: 30,
  FIN1162E: 40,
  CIN1199B: 1,
  CIN1199C: 1,
  CIN1198D: 1,
  CIN1216A: 1,
  PL001: 220,
  PS001: 80,
  PS002: 140,
  PP001: 220,
};

export const DashboardScreen = () => {
  const [filterKey, setFilterKey] = useState(null);
  const { data, filteredData } = useFilterPieChartData(dummy, filterKey);
  const tagName = 'Total Order';
  const count = '12';
  return (
    <div>
      <Row>
        <Col span={12}>
          <TwoLevelPieCharts data={data} />
        </Col>
        <Col span={12}>
          <div className='row justify-end'>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder='Select'
              optionFilterProp='Select'
              onChange={(value) => {
                console.log(value);
                setFilterKey(value);
              }}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
              {Object.keys(dummy).map((key) => (
                <Option value={key}>{key}</Option>
              ))}
            </Select>
          </div>
          <TwoLevelPieCharts data={filteredData} />
        </Col>
      </Row>
      <Row className='mr-auto ml-auto'>
        <Col>
          <LineGraph {...{ tagName, count }} />
        </Col>
        <Col>
          <LineGraph2 {...{ tagName, count }} />
        </Col>
        <Col>
          <BarGraph {...{ tagName, count }} />
        </Col>
        <Col>
          <PointGraph {...{ tagName, count }} />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardScreen;
