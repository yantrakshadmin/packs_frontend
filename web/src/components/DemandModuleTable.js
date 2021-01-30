import React, {useState, useEffect} from 'react';
import {Table, Row, Col, Spin} from 'antd';

import _ from 'lodash';

const dMTableColumns = [
  {
    title: 'Flow',
    key: 'flow',
    dataIndex: 'flow',
  },
  {
    title: 'Product Name',
    key: 'kit',
    dataIndex: 'kit',
  },
  {
    title: 'Required Kit/Month',
    key: 'monthly_quantity',
    dataIndex: 'monthly_quantity',
  },
  {
    title: 'Required Pool',
    key: 'required_pool',
    dataIndex: 'required_pool',
  },
  {
    title: 'Deployed pool',
    key: 'deployed_pool',
    dataIndex: 'deployed_pool',
  },
  {
    title: 'Alloted',
    key: 'alloted',
    dataIndex: 'alloted',
  },
  {
    title: 'Balance',
    key: 'balance',
    dataIndex: 'balance',
  },
];

const DemandModuleTable = ({loading, demand_flows}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let temp = [];
    temp = demand_flows.map((record) => ({
      monthly_quantity: record.monthly_quantity,
      flow: record.flow.flow_name,
      kit: record.kit.kit_name,
      required_pool: _.ceil((record.flow.flow_days / 30) * record.monthly_quantity),
      deployed_pool: record.deployed_pool ? record.deployed_pool : '-',
      alloted: record.alloted ? record.alloted : '-',
      balance: record.balance ? record.balance : '-',
    }));
    setData(temp);
  }, [demand_flows]);

  return (
    <Spin spinning={loading}>
      <Row align="center" style={{margin: '3vh'}}>
        <Col span={24}>
          <Table dataSource={data} columns={dMTableColumns} size="small" pagination={false} />
        </Col>
      </Row>
    </Spin>
  );
};

export default DemandModuleTable;
