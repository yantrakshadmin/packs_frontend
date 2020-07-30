import React, {useState, useEffect} from 'react';
import {Table, Row, Col, Spin} from 'antd';
import smallProductsColumns from 'common/columns/smallProduct.column';

export const AllotProdsTable = ({loading, products, alloted_quantity}) => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: 'Product Name',
      key: 'product',
      dataIndex: 'product',
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
    },
  ];

  useEffect(() => {
    let temp = [];
    temp = products.map((p) => ({...p, ['quantity']: p['quantity'] * alloted_quantity}));
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
