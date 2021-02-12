import React, {useState, useEffect} from 'react';
import {Table, Row, Col, Spin} from 'antd';
import {useAPI} from 'common/hooks/api';

const cols = [
  {
    title: 'Kit',
    key: 'kit_name',
    render: (text, record) => {
      return record.kit.kit_name;
    },
  },
  {
    title: 'Kit Info',
    key: 'kit_info',
    render: (text, record) => {
      return record.kit.kit_info;
    },
  },
  {
    title: 'Quantity',
    key: 'quantity',
    dataIndex: 'quantity',
  },
];

const ExpandTable = (props) => {
  const {data, loading} = useAPI(`return-table-exp/?id=${props.id}`);

  useEffect(() => {
    if (!loading) {
      console.log(data);
    }
  }, [loading]);

  return (
    <Row align="center" style={{margin: '3vh'}}>
      <Col span={24}>
        {loading ? (
          <Spin spinning={loading} />
        ) : (
          <Table dataSource={data[0].kits} columns={cols} size="small" pagination={false} />
        )}
      </Col>
    </Row>
  );
};

export default ExpandTable;
