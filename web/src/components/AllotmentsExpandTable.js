import React, {useState, useEffect} from 'react';
import {Table, Row, Col, Spin} from 'antd';
import {useAPI} from 'common/hooks/api';

const cols = [
  {
    title: 'Kit Name',
    key: 'kit_name',
    render: (text, record) => {
      return `${record.kit.kit_name} - ${record.kit.kit_info}`;
    },
  },
  {
    title: 'Asked Quantity',
    key: 'asked_quantity',
    dataIndex: 'asked_quantity',
  },
  {
    title: 'Alloted Quantity',
    key: 'alloted_quantity',
    dataIndex: 'alloted_quantity',
  },
  {
    title: 'Flow Name',
    key: 'flow_name',
    render: (text, record) => {
      return record.flow;
    },
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
          <Table
            dataSource={data[0] ? data[0].flows || [] : []}
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
