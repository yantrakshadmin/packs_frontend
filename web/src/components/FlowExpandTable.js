import React, {useState, useEffect} from 'react';
import {Table, Row, Col, Spin} from 'antd';
import {useAPI} from 'common/hooks/api';

const cols = [
  {
    title: 'Kit Name',
    key: 'kit_name',
    render: (text, record) => {
      return record.kit.kit_name;
    },
  },
  {
    title: 'Quantity',
    key: 'quantity',
    render: (text, record) => {
      return record.quantity;
    },
  },
  {
    title: 'Component PM',
    key: 'component_pm',
    render: (text, record) => {
      return record.component_pm;
    },
  },
  {
    title: 'Trip Cost',
    key: 'trip_cost',
    render: (text, record) => {
      return record.trip_cost;
    },
  },
];

const ExpandTable = (props) => {
  //   const [loading, setLoading] = useState(true);
  const {data, loading} = useAPI(`client-flows-exp/?id=${props.id}`);

  return (
    <Row align="center" style={{margin: '3vh'}}>
      <Col span={24}>
        {loading ? (
          <Spin spinning={loading} />
        ) : (
          <Table
            dataSource={data[0] ? data[0].kits || [] : []}
            columns={cols}
            size="small"
            pagination={false}
          />
        )}
      </Col>
    </Row>
  );
};

export default ExpandTable;
