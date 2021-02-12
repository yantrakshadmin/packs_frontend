import React, {useState, useEffect} from 'react';
import {Table, Row, Col, Spin} from 'antd';
import {useAPI} from 'common/hooks/api';

const cols = [
  {
    title: 'Kit',
    key: 'kit',
    dataIndex: 'kit',
  },
  {
    title: 'Flow',
    key: 'flow',
    dataIndex: 'flow',
  },
  {
    title: 'Asked Qty',
    key: 'asked_quantity',
    dataIndex: 'asked_quantity',
  },
  {
    title: 'Alloted Qty',
    key: 'alloted_quantity',
    dataIndex: 'alloted_quantity',
  },
];

const ExpandTable = (props) => {
  //   const [loading, setLoading] = useState(true);
  const {data, loading} = useAPI(`allotments-table-exp/?id=${props.id}`);

  return (
    <Row align="center" style={{margin: '3vh'}}>
      <Col span={24}>
        {loading ? (
          <Spin spinning={loading} />
        ) : (
          <Table dataSource={data[0].flows} columns={cols} size="small" pagination={false} />
        )}
      </Col>
    </Row>
  );
};

export default ExpandTable;
