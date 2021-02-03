import React from 'react';
import {Table, Input} from 'antd';
import _ from 'lodash';

const dMTableColumns = [
  {
    title: 'Flow',
    key: 'flow',
    dataIndex: 'flow',
    render: (text, record) => (record.flow.flow_name ? record.flow.flow_name : '-'),
  },
  {
    title: 'Product Name',
    key: 'kit',
    dataIndex: 'kit',
    render: (text, record) => (record.kit.part_name ? record.kit.part_name : '-'),
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
    render: (text, record) =>
      record.flow.flow_days ? _.ceil((record.flow.flow_days / 30) * record.monthly_quantity) : '-',
  },
  {
    title: 'Deployed pool',
    key: 'deployed_pool',
    dataIndex: 'deployed_pool',
    render: (text, record) => {
      return <Input size="middle" placeholder="Deployed Pool" />;
    },
  },
  //   {
  //     title: 'Alloted',
  //     key: 'alloted',
  //     dataIndex: 'alloted',
  //     render: (text, record) => (record.alloted ? record.alloted : '-'),
  //   },
  //   {
  //     title: 'Balance',
  //     key: 'balance',
  //     dataIndex: 'balance',
  //     render: (text, record) => (record.balance ? record.balance : '-'),
  //   },
];

const DemandFlowsTable = ({dataSource}) => {
  return (
    <Table size="middle" dataSource={dataSource} columns={dMTableColumns} pagination={false} />
  );
};

export default DemandFlowsTable;
