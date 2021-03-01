import React, {useEffect} from 'react';
import {Table, Row, Col, Spin} from 'antd';
import {useAPI} from 'common/hooks/api';

const cols = [
  {
    title: 'Product',
    key: 'product',
    dataIndex: 'product',
  },
  {
    title: 'Quantity Available',
    key: 'quantity',
    dataIndex: 'quantity',
  },
  {
    title: 'New Qty. in hand',
    key: 'new_quantity',
    dataIndex: 'new_quantity',
  },
  {
    title: 'Quantity Adjusted',
    key: 'quantity_adjusted',
    dataIndex: 'quantity_adjusted',
  },
  {
    title: 'Reason',
    key: 'reason',
    dataIndex: 'reason',
  },
];

const ExpandTable = (props) => {
  return (
    <Row align="center" style={{margin: '3vh'}}>
      <Col span={24}>
        {props.loading ? (
          <Spin spinning={props.loading} />
        ) : (
          <Table dataSource={props.items || []} columns={cols} size="small" pagination={false} />
        )}
      </Col>
    </Row>
  );
};

export default ExpandTable;
