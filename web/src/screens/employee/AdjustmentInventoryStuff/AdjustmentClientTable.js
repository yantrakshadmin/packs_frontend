import React, {useState, useEffect} from 'react';
import {Table, Row, Col, Spin} from 'antd';
import {useAPI} from 'common/hooks/api';

const cols = [
  {
    title: 'Client',
    key: 'client',
    dataIndex: 'client',
  },
  {
    title: 'Kit',
    key: 'kit',
    dataIndex: 'kit',
  },
  {
    title: 'Quantity',
    key: 'quantity',
    dataIndex: 'quantity',
  },
];

const ExpandTable = ({data, loading}) => {
  return (
    <Row align="center" style={{margin: '3vh'}}>
      <Col span={24}>
        {loading ? (
          <Spin spinning={loading} />
        ) : (
          <Table dataSource={data} columns={cols} size="small" pagination={false} />
        )}
      </Col>
    </Row>
  );
};

export default ExpandTable;
