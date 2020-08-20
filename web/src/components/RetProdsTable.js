import React, {useState, useEffect} from 'react';
import {Table, Row, Col, Spin} from 'antd';
import smallProductsColumns from 'common/columns/smallProduct.column';

export const RetProdsTable = ({loading, products}) => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: 'Product Name',
      key: 'short_code',
      dataIndex: 'short_code',
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
    },
  ];

  useEffect(() => {
    let temp = [];
    temp = products.map((p) => ({...p.product, ['quantity']: p['quantity']}));
    setData(temp);
  }, [products]);

  return (
    <Spin spinning={loading}>
      <Row align="center" style={{margin: '3vh'}}>
        <Col span={24}>
          <Table dataSource={data} columns={columns} size="small" pagination={false} />
        </Col>
      </Row>
    </Spin>
  );
};
