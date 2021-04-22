import React, {useEffect} from 'react';
import {Table, Row, Col, Spin} from 'antd';
import {useAPI} from 'common/hooks/api';

const cols = [
  {
    title: 'Flow Name',
    key: 'flow',
    dataIndex: 'flow',
  },
  {
    title: 'Kit Name',
    key: 'kit',
    render: (text, record) => {
      return `${record.kit.kit_name} - ${record.kit.part_name}`;
    },
  },
  {
    title: 'Quantity',
    key: 'quantity',
    dataIndex: 'quantity',
  },
];

const ExpandTable = (props) => {
  const {data, loading} = useAPI(`mr-table-exp/?id=${props.id}`);

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
          <Table dataSource={data[0].flows} columns={cols} size="small" pagination={false} />
        )}
      </Col>
    </Row>
  );
};

export default ExpandTable;
