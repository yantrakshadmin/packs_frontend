import React, {useState, useEffect} from 'react';
import {Table, Row, Col, Spin} from 'antd';
import {useAPI} from 'common/hooks/api';

const cols = [
  {
    title: 'Name',
    key: 'name',
    render: (text, record) => {
      return record.product.name;
    },
  },
  {
    title: 'Quantity',
    key: 'quantity',
    dataIndex: 'quantity',
  },
  {
    title: 'Short Code',
    key: 'short_code',
    render: (text, record) => {
      return record.product.short_code;
    },
  },

  {
    title: 'Category',
    key: 'category',
    render: (text, record) => {
      return record.product.category;
    },
  },
  {
    title: 'Price Per Unit',
    key: 'priceperunit',
    render: (text, record) => {
      return record.product.priceperunit;
    },
  },
];

const ExpandTable = (props) => {
  //   const [loading, setLoading] = useState(true);
  const {data, loading} = useAPI(`client-kits-exp/?id=${props.id}`);

  return (
    <Row align="center" style={{margin: '3vh'}}>
      <Col span={24}>
        {loading ? (
          <Spin spinning={loading} />
        ) : (
          <Table
            dataSource={data[0] ? data[0].products || [] : []}
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
